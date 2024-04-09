import { verifyAccessJWT } from "@/app/helpers/jwt";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request, { params }) {
    const { orderId } = await request.json();
  const { id } = params;

  const transaction_ref = id;
     



  if (request.method === "POST") {
    const authorization = request.cookies.get("token");

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

    const { id: userId } = decodedToken;

    try {
      const user = await prisma.user.findUnique({
        where: { Id: userId },
        include: { order: { select: { totalAmount: true, Id: true } } },
      });

      const verify = await fetch(
        `https://sandbox-api-d.squadco.com/transaction/verify/${transaction_ref}`,
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${process.env.SQUADCO_KEY}`,
          },
        }
      );

      const response = await verify.json();

    //   console.log(response, orderId)

      if (verify.status === 200) {
        await prisma.order.update({
          where: {
            userId: user.Id,
            Id: orderId,
          },
          data: {
            status:
              response.data.transaction_status === "success"
                ? "COMPLETED"
                : response.data.transaction_status.toUpperCase(),
            paymentMethod: response.data.transaction_type,
          },
        });

        return NextResponse.json(
          { response: "Payment successful" },
          { status: 200 }
        );
      }
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Payment verification failed" },
        { status: 403 }
      );
    }
  } else {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }
}
