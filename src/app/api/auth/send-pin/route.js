import {NextResponse} from "next/server"
import prisma from "../../../lib/prisma"
import nodemailer from "nodemailer";



export async function POST(req, res) {
  if (req.method === "POST") {
    const { emailAddress } = req.json();

    try {
      const user = await prisma.user.findUnique({
        where: { emailAddress },
      });

      if (!user) {
        return NextResponse.json({ message: "User not found" }, {status: 400});
      }

      // Generate a random 6-digit PIN
      const pin = Math.floor(100000 + Math.random() * 900000);

      // Save the PIN to the user record
      await prisma.user.update({
        where: { id: user.Id },
        data: { pin: pin.toString() },
      });

      // Send the PIN via email
      sendPinEmail(emailAddress, pin);

      NextResponse.json({ message: "PIN sent successfully" }, {status : 200});
    } catch (error) {
      console.error(error);
    NextResponse.json({ message: "Internal server error" }, {status : 500});
    }
  } else {
    NextResponse.json({ message: "Method not allowed" }, {status : 405});
  }
}

async function sendPinEmail(email, pin) {
  // Use Nodemailer to send an email with the PIN
  // Set up your email transport (e.g., SMTP, sendgrid, etc.)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "your-email@gmail.com",
      pass: "your-email-password",
    },
  });

  const mailOptions = {
    from: "your-email@gmail.com",
    to: email,
    subject: "PIN Verification",
    text: `Your PIN for verification is: ${pin}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}
