// for verifying email address and account

import {NextResponse} from "next/server"
const nodemailer = require("nodemailer");
import prisma from "../../../lib/prisma"



export async function POST(req, res) {
  const { emailAddress } = req.json();

  try {
    const user = await prisma.user.findUnique({
      where: { emailAddress: emailAddress.toLowerCase()},
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, {status: 404});
    }

    if (user.emailVerify) {
      return NextResponse.json({ message: "Email address is already verified" }, {status: 400});
    }

    const token = crypto.randomBytes(32).toString("hex");
    const tokenExpiration = new Date(Date.now() + 24 * 60 * 60 * 1000); // Token expires in 24 hours

    await prisma.user.update({
      where: { id: user.Id },
      data: {
        emailVerificationToken: token,
        emailVerificationTokenExpiration: tokenExpiration,
      },
    });

    const verificationLink = `http://your-app.com/verify-account/${token}`;
    sendVerificationEmail(emailAddress, verificationLink);

    NextResponse.json({ message: "Verification email sent successfully" }, {status : 200});
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" }, {status : 500});
  }
}

// export async function POST (req, res) {
//   const { token } = req.json();

//   try {
//     const user = await prisma.user.findFirst({
//       where: {
//         emailVerificationToken: token,
//         emailVerificationTokenExpiration: {
//           gte: new Date(),
//         },
//       },
//     });

//     if (!user) {
//       return res.status(401).json({ message: "Invalid or expired token" });
//     }

//     await prisma.user.update({
//       where: { id: user.Id },
//       data: {
//         emailVerified: true,
//         emailVerificationToken: null,
//         emailVerificationTokenExpiration: null,
//       },
//     });

//     res.status(200).json({ message: "Account verification successful" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// }

async function sendVerificationEmail(email, verificationLink) {
  // Use Nodemailer to send an email with the account verification link
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
    subject: "Account Verification",
    text: `Click the following link to verify your account: ${verificationLink}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}


