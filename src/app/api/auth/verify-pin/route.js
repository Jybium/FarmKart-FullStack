import prisma from "../../../lib/prisma"
import {NextResponse, NextRequest} from "next/server"
import nodemailer from "nodemailer";


export async function POST(req, res) {
  if (req.method === "POST") {
    const { emailAddress, pin } = req.json();

    try {
      const user = await prisma.user.findUnique({
        where: { emailAddress: emailAddress.toLowerCase() },
      });

      if (!user) {
        return NextResponse.json({ message: "User not found" }, {status : 400});
      }

      if (user.pin !== pin) {
        return NextResponse.json({ message: "Invalid PIN" }, {status : 401});
      }

      // Reset the PIN after successful validation
      await prisma.user.update({
        where: { id: user.Id },
        data: { pin: null },
      });

      

      NextResponse.json({ message: "PIN validation successful" }, {status : 200});
    } catch (error) {
      console.error(error);
      NextResponse.json({ message: "Internal server error" }, {status : 500});
    }
  } else {
    NextResponse.json({ message: "Method not allowed" }, {status : 405});
  }
}
