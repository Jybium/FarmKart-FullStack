import prisma from "../../../lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request, { params }) {
  const id = params.id;

  if (request.method === "GET") {
    try {
      const response = await prisma.product.update({
        where: { Id: +id },
        data: { views: { increment: 1 } },
        include: {
          image: { select: { Image: true } },
          Review: {select: {rating:true, comment: true}},
          // Order: {select: {}},
          user: {
            select: {
              firstName: true,
              lastName: true,
              emailAddress: true,
              phoneNumber: true,
              createdAt: true,
              updatedAt: true,
              location: true,
            },
          },
        },
      });

      if (response) {
        //  ("Product updated:", response);
        return NextResponse.json(
          { message: { data: response, response: "success" } },

          { status: 200 }
        );
      } else {
        

        return NextResponse.json(
          { message: "Product not found" },
          { status: 404 }
        );
      }
    } catch (error) {


      console.error("Error fetching/updating product:", error);


      if (error.code === "P2002") {
        return NextResponse.json(
          { message: "Product already exists" },
          { status: 409 }
        ); 


      } else if (error.name === "PrismaClientInitializationError") {
        return NextResponse.json(
          { message: "Network error. Try resetting your connection" },
          { status: 500 }
        );
      } else {
       
        
        return NextResponse.json(
          { message: "An error occurred", error, id },
          { status: 500 }
        );
      }
    }
  } else {
    return NextResponse.json(
      { message: `${request.method} is not allowed!` },
      { status: 403 }
    );
  }
}
