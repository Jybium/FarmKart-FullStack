import { verifyAccessJWT } from "@/app/helpers/jwt";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
const SQUADCO_KEY = process.env.SQUADCO_KEY;

export async function POST(request) {
    const { orderId } = await request.json();

  if (request.method === "POST") {
    try {
      const authorization = request.cookies.get("token");
      if (!authorization || authorization.length <= 0) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }

      const token = authorization.value;
      const decodedToken = await verifyAccessJWT(token);
      const { id } = decodedToken;

      const user = await prisma.user.findUnique({
        where: { Id: id },
        include: { order: { select: { totalAmount: true } } },
      });

      if (!user) {
        return NextResponse.json({ error: "User not found!" }, { status: 404 });
      }

      
      const requestBody = {
        amount: user.order[0].totalAmount * 100,
        email: user.emailAddress,
        customer_name: `${user.firstName} ${user.lastName}`,
        currency: "NGN",
        initiate_type: "inline",
      };

      const paymentResponse = await fetch(
        "https://sandbox-api-d.squadco.com/transaction/initiate",
        {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${SQUADCO_KEY}`,
          },
        }
      );

      
      const paymentData = await paymentResponse.json();
      
      

      if (paymentData.message !== "Success") {
        throw new Error("Payment initialization failed");
      }

      await prisma.order.updateMany({
        where: { userId: id, Id: orderId },
        data: {
          status: "IN_PROGRESS",
          transactionId: paymentData.data.transaction_ref,
        },
      });

      return NextResponse.json(
        {
          response: {
            transaction_ref: paymentData.data.transaction_ref,
            checkout_url: paymentData.data.checkout_url,
          },
        },
        { status: 200 }
      );
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Payment initialization failed" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }
}
