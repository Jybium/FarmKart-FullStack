import prisma from "../../../lib/prisma"
import {NextResponse} from "next/server"
import {revalidatePath} from "next/cache"

export const dynamic = 'force-dynamic'
export const revalidate = 0;

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
export async function PUT(req, { params }) {
  const cartItemId = params.id;

  if (req.method === "PUT") {
    const { action } = await req.json();
  

    try {
      let updatedCart;
      if (action === "increment") {
        updatedCart = await prisma.cart.update({
          where: {
            Id: cartItemId,
          },
          data: {
            Quantity: {
              increment: 1,
            },
          },
        });
      } else if (action === "decrement") {
        // Check if quantity is greater than 0 before decrementing
        const existingCart = await prisma.cart.findUnique({
          where: {
            Id: cartItemId,
          },
        });

        if (existingCart && existingCart.Quantity > 0) {
          updatedCart = await prisma.cart.update({
            where: {
              Id: cartItemId,
            },
            data: {
              Quantity: {
                decrement: 1,
              },
            },
          });
        } else {
          throw new Error("Quantity cannot be less than zero");
        }
      } else {
        throw new Error("Invalid action");
      }

         const data = {
           data: updatedCart,
           message: "Cart updated successfully!",
         };

      return NextResponse.json(
        {"response" : data},
        { status: 200 }
      );
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
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
