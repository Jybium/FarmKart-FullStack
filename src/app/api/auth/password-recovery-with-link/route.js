//@ts-ignore

import prisma from "@/app/lib/prisma";
import nodemailer from "nodemailer";

export async function POST(
  req,
  res
) {
  const { emailAddress } = req.json();

  try {
    const user = await prisma.user.findUnique({
      where: { emailAddress: emailAddress.toLowerCase() },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = await SignInAccessToken({id: user.Id, email: user.emailAddress, firstName: user.firstName, lastName: user.lastName})
    const tokenExpiration = new Date(Date.now() + 15 * 60 * 1000); // Token expires in 15 minutes

    await prisma.user.update({
      where: { Id: user.Id },
      data: {
        passwordResetToken: token,
        passwordResetTokenExpiration: tokenExpiration,
      },
    });

    const resetLink = `http://${process.env.NEXTAUTH_URL}/reset-password/${token}`;
    sendPasswordResetEmail(emailAddress, resetLink);

    res.status(200).json({ message: "Password reset email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}



async function sendPasswordResetEmail(email, resetLink) {
  // Use Nodemailer to send an email with the password reset link
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
    subject: "Password Reset",
    text: `Click the following link to reset your password: ${resetLink}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}
