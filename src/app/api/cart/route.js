import prisma from "../../lib/prisma"
import { NextResponse } from "next/server"



export async function POST(req, res) {
  if (req.method === 'POST') {
    const { userId, productId, quantity } = req.json();

    try {
      const cart = await prisma.cart.create({
        data: {
          userId,
          productId,
          quantity,
        },
      });
      NextResponse.json({data : cart}, {status: 200});
    } catch (error) {
      console.error(error);
      NextResponse.json({ message: "Unable to add product to cart!" }, { status: 500 });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}




export async function GET(req, res) {
  if (req.method === "GET") {
    const { userId } = req.json();

    try {
      const carts = await prisma.cart.findMany({
        where: { userId },
        include: { user: true, product: true },
      });
      NextResponse.json(
        [{ "data": carts }, { "message": "successfull!" }],
        { status: 200 }
      );
    } catch (error) {
      console.error(error);
      NextResponse.json({ "error": "Unable to fetch cart!" }, { status: 500 });
    }
  } else {
    NextResponse.json({ "error": "Method not allowed" }, { status: 405 });
  }
}

