import prisma from "../../lib/prisma";
import { verifyAccessJWT } from "../../helpers/jwt";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Create Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export async function POST(request) {
  try {
    // Retrieve data from request body
    const formData = await request.formData();

    // Extract form values
    const {
      productName,
      Quantity,
      description,
      category,
      price,
      bulkPrice,
      weight,
      color,
      negotiable,
      slug,
      image,
    } = Object.fromEntries(formData.entries());

    // Parse the image data into an array
    const images = image.split("|").filter(Boolean);

    // Validate if images array is not empty
    if (images.length === 0) {
      return NextResponse.json(
        { message: "At least one image is required!" },
        { status: 400 }
      );
    }

    // Validate required fields
    if (!productName || !Quantity || !description || !category || !price) {
      return NextResponse.json(
        { message: "All fields are required!" },
        { status: 400 }
      );
    }

    // Validate user authentication
    const token = request.cookies.get("token");
    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized. Make sure you are signed in!" },
        { status: 401 }
      );
    }

    const verified = verifyAccessJWT(token.value);
    if (!verified) {
      return NextResponse.json({ message: "Bad request" }, { status: 400 });
    }

    const user = await prisma.user.findFirst({
      where: { emailAddress: verified.emailAddress },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized. Make sure you are signed in!" },
        { status: 401 }
      );
    }

    const product = await prisma.product.create({
      data: {
        productName,
        Quantity: +Quantity,
        description,
        category,
        views: 0,
        price: +price,
        bulkPrice: +bulkPrice,
        weight: +weight,
        color,
        negotiable: !!negotiable,
        slug,
        userId: user.Id,
      },
    });

    if (!product) {
      return NextResponse.json(
        { success: false, error: "Failed to create product" },
        { status: 500 }
      );
    }

    // Delete existing images associated with the product
    await prisma.image.deleteMany({
      where: { productid: product.Id },
    });

    const Upload = async (images, product) => {
      try {
        let imageUrls = []; // Declare or initialize imageUrls array

        // Loop through each image data URI
        for (let i = 0; i < images.length; i++) {
          const image = images[i];
          // Create a buffer from the base64 encoded data
          const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
          const buffer = Buffer.from(base64Data, "base64");

          // Generate a unique filename for each image
          const filename = `photo_${i}.jpg`;

          const filePath = `Product-image/${product.Id}/${filename}`;

          // Split the base64 string to get the data prefix
          const prefix = image.split(",")[0];

          // Extract the image format from the prefix
          const imageFormat = prefix.split(";")[0].split("/")[1];

          // Upload the image to Supabase storage
          const { data, error } = await supabase.storage
            .from("Product-image")
            .upload(filePath, buffer, { contentType: `image/${imageFormat}` });

          if (error) {
            console.error("Error uploading image to Supabase:", error);
            // Rollback product creation
            await prisma.product.delete({ where: { Id: product.Id } });
            throw new Error(error.message);
          }

          // Add the URL of the uploaded image to the imageUrls array
          imageUrls.push(data.fullPath);
         
        }

        return imageUrls; // Return the URLs of all uploaded images
      } catch (error) {
        console.error("Error uploading images:", error);
        // Handle error (e.g., notify user)
        throw error; // Rethrow the error for further handling
      }
    };

    const imageUrls = await Upload(images, product);


    const createImageResult = await prisma.image.createMany({
      data: {
        Image: imageUrls,
        productid: product.Id
      },
    });




   if (!createImageResult.count) {
     // Delete all images associated with the product
     await prisma.image.deleteMany({
       where: { productid: product.Id },
     });

     // Rollback product creation
     await prisma.product.delete({ where: { Id: product.Id } });

     return NextResponse.json(
       { success: false, error: "Failed to create product images" },
       { status: 500 }
     );
   }


    return NextResponse.json(
      { message: "Product created successfully!", product: product },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error encountered while creating the product:", error);
    if (error.code === "P2002") {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }
    if (error.name === "PrismaClientInitializationError") {
      return NextResponse.json(
        { message: "Network error. Try resetting your connection" },
        { status: 500 }
      );
    }
    return NextResponse.json(
      {
        message: "Error encountered while trying to create the product",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
