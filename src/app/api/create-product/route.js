import prisma from "../../lib/prisma";
import { verifyToken } from "../../helpers/jwt";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
  try {
    const token = req.headers.Authorization;
    const {
      productName,
      Quantity,
      weight,
      slug,
      color,
      price,
      bulkPrice,
      description,
      negotiable,
      category,
      image,
    } = req.json();

    if (
      productName ||
      Quantity ||
      weight ||
      slug ||
      color ||
      price ||
      bulkPrice ||
      description ||
      negotiable ||
      category ||
      image
    )
      return NextResponse.json(
        { message: "All fields are required!" },
        { status: 404 }
      );
    if (!token)
      return NextResponse.json(
        { message: "Unauthorised. Make sure you are signed in!" },
        { status: "404" }
      );

    const verified = verifyToken(token);
    if (!verified)
      return NextResponse.json({ message: "Bad request" }, { status: 404 });

    const user = await prisma.user.findFirst({
      where: { emailAddress: verified.emailAdress },
    });

    if (!user)
      return NextResponse.json(
        { message: "Unauthorised Action! Make sure you are signed in" },
        { status: 404 }
      );

    if (user && verified) {
      const createProduct = await prisma.product.create({
        data: {
          productName,
          Quantity,
          weight,
          slug: productName.replace(" ", "-").toLowerCase(),
          negotiable,
          color,
          price,
          bulkPrice,
          category,
          image,
          description,
          views: 0,
        },
      });
      console.log(createProduct);

      return NextResponse.json(
        { message: "Product created Successfully!" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log(error);
    if (error.code === "P2002")
      return NextResponse.json(
        { message: "User Already Exist" },
        { status: 401 }
      );
    if (error.name === "PrismaClientInitializationError")
      return NextResponse.json(
        { message: "Network Error. trying resetting your connection" },
        { status: 404 }
      );
    return NextResponse.json(
      { message: "Error was encountered while tryign to register you" },
      { status: 500 }
    );
  }
}
