import prisma from "../../lib/prisma";
import { verifyToken } from "../../helpers/jwt";
import { NextResponse, NextRequest } from "next/server";

export async function POST(res, req) {

  
    try {
        
        const product = await prisma.product.findMany();
        if (!product)
          return NextResponse.json(
            { message: "No product found!" },
            { status: 200 }
          );
        return NextResponse.json(
          { message: "Successful!", data: product },
          { status: 200 }
        );
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "Internal Server Error! Please try again"}, {status: 500})
    }
  
}
