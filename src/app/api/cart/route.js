import { verifyAccessJWT } from "@/app/helpers/jwt";
import prisma from "../../lib/prisma"
import { NextResponse } from "next/server"
import{revalidatePath} from "next/cache"




export async function POST(req, res) {
  if (req.method === "POST") {

    const {Quantity,  productId} = await req.json()
    const authorization = req.cookies.get("token");

    
    if (!authorization || authorization.length <= 0) {
      return NextResponse.json({ message: "Unauthorised" }, { status: 401 });
    }

    const token = authorization.value;
    let decodedToken;
    try {
      decodedToken = await verifyAccessJWT(token);
    } catch (error) {
      console.log(error);
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    const { id } = decodedToken;

    try {
      
      const user = await prisma.user.findUnique({
        where: { Id: id },
      });

      const product = await prisma.product.findUnique({
        where:{Id:+productId}
      });

      if (!user || !product) {
              return NextResponse.json({ response: "No user or product found!" }, { status: 404 });

      }

      // Create cart entry
      const cart = await prisma.cart.create({
        data: {
          userId : id,
          productId,
          Quantity,
        
        },
      });

      const data = {
        data: cart,
        message: "Product added to cart successfully!",
      };
     revalidatePath("/")
      return NextResponse.json({ response: data }, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Unable to add product to cart!" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }
}





export async function GET(req, res) {
  if (req.method === "GET") {
   const authorization = req.cookies.get("token");

   if (!authorization || authorization.length <= 0) {
     return NextResponse.json({ message: "Unauthorised" }, { status: 401 });
   }

   const token = authorization.value;
   let decodedToken;
   try {
     decodedToken = await verifyAccessJWT(token);
   } catch (error) {
     console.log(error);
     return NextResponse.json({ message: "Invalid token" }, { status: 401 });
   }

   const {
     id,
   } = decodedToken;

    try {
      const carts = await prisma.cart.findMany({
        where: { userId: id },
        include: {
          product: {
            include: {
              image: {select: {Image:true}}, 
            },
          },
        },
      });
      const data = {
        "data" : carts,
        "message" : "successfull!"
      }
      return NextResponse.json(
        { "response" : data},
        { status: 200 }
      );
    } catch (error) {
      console.error(error);
      return NextResponse.json({ "error": "Unable to fetch cart!" }, { status: 500 });
    }
  } else {
    return NextResponse.json({ "error": "Method not allowed" }, { status: 405 });
  }
}

