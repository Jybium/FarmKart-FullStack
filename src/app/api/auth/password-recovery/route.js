// pages/api/password-recovery/request.js
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/app/lib/prisma";
import nodemailer from "nodemailer";

export default async function handler(
  req,
  res
) {
  const { emailAddress } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { emailAddress },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = generateToken();
    const tokenExpiration = new Date(Date.now() + 15 * 60 * 1000); // Token expires in 15 minutes

    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordResetToken: token,
        passwordResetTokenExpiration: tokenExpiration,
      },
    });

    const resetLink = `http://your-app.com/reset-password/${token}`;
    sendPasswordResetEmail(emailAddress, resetLink);

    res.status(200).json({ message: "Password reset email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

function generateToken() {
  // Implement a secure method to generate random tokens
  // This can be achieved using a library like crypto or a secure random number generator
  // For simplicity, you can use a simple string or UUID
  return "your-secure-token";
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
