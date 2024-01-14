// File: routes/accountVerification.js
const express = require("express");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const router = express.Router();

router.post("/request", async (req, res) => {
  const { emailAddress } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { emailAddress },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.emailVerified) {
      return res
        .status(400)
        .json({ message: "Email address is already verified" });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const tokenExpiration = new Date(Date.now() + 24 * 60 * 60 * 1000); // Token expires in 24 hours

    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerificationToken: token,
        emailVerificationTokenExpiration: tokenExpiration,
      },
    });

    const verificationLink = `http://your-app.com/verify-account/${token}`;
    sendVerificationEmail(emailAddress, verificationLink);

    res.status(200).json({ message: "Verification email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/verify", async (req, res) => {
  const { token } = req.body;

  try {
    const user = await prisma.user.findFirst({
      where: {
        emailVerificationToken: token,
        emailVerificationTokenExpiration: {
          gte: new Date(),
        },
      },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: true,
        emailVerificationToken: null,
        emailVerificationTokenExpiration: null,
      },
    });

    res.status(200).json({ message: "Account verification successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

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

module.exports = router;
