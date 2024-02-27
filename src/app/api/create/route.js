import prisma from "../../lib/prisma";
import { verifyAccessJWT } from "../../helpers/jwt";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Create Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_API_KEY
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
    const images = [image];

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

    let imageUrls = [];
    console.log(images)
    const Upload = async (images) => {
      
      // Map each image upload operation to a promise
      const uploadPromises = images.map(async (image, i) => {
        // Create a buffer from the base64 encoded data
        const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
        const buffer = Buffer.from(base64Data, "base64");
        
        const filename = `image_${i}.jpg`;
        const filePath = `Product-image/${product.Id}/${filename}`;
        
        // Split the base64 string to get the data prefix
        const prefix = image.split(",")[0];

        // Extract the image format from the prefix
        const imageFormat = prefix.split(";")[0].split("/")[1];

        const { data, error } = await supabase.storage
          .from("Product-image")
          .upload(filePath, buffer, { contentType: `image/${imageFormat}` });
        if (error) {
          console.error("Error uploading image to Supabase:", error);
          // Rollback product creation
          await prisma.product.delete({ where: { Id: product.Id } });
          throw new Error(error.message);
        }
        return data.fullPath; // Return the URL of the uploaded image
      });

      // Wait for all upload promises to resolve
      const uploadedImageUrls = await Promise.all(uploadPromises);
      
      // Concatenate all uploaded image URLs
      imageUrls = imageUrls.concat(uploadedImageUrls);
    };


    await Upload(images);
    console.log(imageUrls)

    const createImageResult = await prisma.image.createMany({
      data: {
        Image: imageUrls.map((urls) => urls),
        productid: product.Id,
      },
    });

    if (createImageResult.count !== images.length) {
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
