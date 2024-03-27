import prisma from "../../../lib/prisma"
import {NextResponse} from "next/server"
import {revalidatePath} from "next/cache"


// function to get the details of a cart item
export async function GET(req, {params}) {
  const cartId = +params.id;

  if (req.method === 'GET') {
    try {
      const cart = await prisma.cart.findUnique({
        where: {
          Id: +cartId,
        },
        include: {
          user: true,
          product: true,
        },
      });
      return NextResponse.json({ data: cart }, { status: 200 });
    } catch (error) {
      console.error(error);
       return NextResponse.json({ message: "Unable to get cart details" }, { status: 500 });
    }
  } 
  else {
     return NextResponse.json({ "error": "Method not allowed" }, { status: 405 });
  }
}




// function to update a cart item
export async function PUT(req, {params}) {
  const cartItemId = +params.id;

  if (req.method === 'PUT') {
    const { quantity } = req.body;

    try {
      const updatedCart = await prisma.cart.update({
        where: {
          Id: cartItemId,
        },
        data: {
          Quantity: +quantity,
        },
      });
     
      return  NextResponse.json([{ "data": updatedCart }, {"message" : "Cart updated successfully!"}], { status: 200 });
    } catch (error) {
      console.error(error);
       return NextResponse.json({ "error": "Unable to update cart!" }, { status: 500 });
    }
  }
   else {
    return NextResponse.json({ "error": 'Method not allowed' },{status:405});
  }
}




// function to delete a cart item
export async function DELETE(req, {params}) {
  const cartId = params.id;

  if (req.method === 'DELETE') {
    try {
      const deletedCart = await prisma.cart.delete({
        where: {
          Id: cartId,
        },
      });

      const response = {
        data: deletedCart,
        message: "Product deleted from cart successfully!",
      };
      revalidatePath("/cart")
      revalidatePath("/")
      return NextResponse.json({"response":response}, { status: 200 });
    } catch (error) {
      console.error(error);
       return NextResponse.json({ "error": "Unable to delete cart!" }, { status: 500 });
    }
  } else {
     return NextResponse.json({ "error": "Method not allowed" }, { status: 405 });
  }
}
