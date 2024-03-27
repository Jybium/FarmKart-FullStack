import prisma from "../../../lib/prisma"
import {NextResponse} from "next/server"



export async function GET(req, {params}) {
  const cartId = +params.id;

  if (req.method === 'GET') {
    try {
      const cart = await prisma.cart.findUnique({
        where: {
          id: Number(cartId),
        },
        include: {
          user: true,
          product: true,
        },
      });
      NextResponse.json({ data: cart }, { status: 200 });
    } catch (error) {
      console.error(error);
       NextResponse.json({ message: "Unable to get cart details" }, { status: 500 });
    }
  } 
  else {
     NextResponse.json({ "error": "Method not allowed" }, { status: 405 });
  }
}





export async function PUT(req, {params}) {
  const cartId = +params.id;

  if (req.method === 'PUT') {
    const { quantity } = req.body;

    try {
      const updatedCart = await prisma.cart.update({
        where: {
          id: cartId,
        },
        data: {
          quantity,
        },
      });
       NextResponse.json([{ "data": updatedCart }, {"message" : "Cart updated successfully!"}], { status: 200 });
    } catch (error) {
      console.error(error);
       NextResponse.json({ "error": "Unable to update cart!" }, { status: 500 });
    }
  }
   else {
    NextResponse.json({ "error": 'Method not allowed' },{status:405});
  }
}





export async function DELETE(req, {params}) {
  const cartId = +params.id;

  if (req.method === 'DELETE') {
    try {
      const deletedCart = await prisma.cart.delete({
        where: {
          id: cartId,
        },
      });
       NextResponse.json([{ "data": deletedCart }, {"message" : "Product removed successfully!"}], { status: 200 });
    } catch (error) {
      console.error(error);
       NextResponse.json({ "error": "Unable to delete cart!" }, { status: 500 });
    }
  } else {
     NextResponse.json({ "error": "Method not allowed" }, { status: 405 });
  }
}
