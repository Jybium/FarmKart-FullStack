import {NextResponse} from "next/server"
import { serialize } from "cookie";
import { signInAccessToken, signInRefreshToken, verifyRefreshToken } from "../../../helpers/jwt";
import prisma from "../../../lib/prisma";
import jwt from "jsonwebtoken";

export async function POST(
  req,
  res
) {
  const {refresh:Token}  = req.headers;
  // const actualToken = Token.subString(7)

  try {
    if (!Token) {
      return NextResponse.json({ message: "Bad request: Refresh token is required" }, {status: 400});
    }

    // Verify the refresh token and retrieve the associated user
    const decoded = verifyRefreshToken(Token)
    
    const user = await prisma.user.findUnique({
      where: { Id: decoded.id },
    });

    if (!user || user.refreshToken !== Token) {
      
      return  NextResponse.json({ message: "Unauthorized: Invalid refresh token" }, {status: 401});
    }

    // Generate a new access token and refresh token
    const newAccessToken = signInAccessToken({id: user.Id, firstName: user.firstName, lastName: user.lastName, email: user.emailAddress, image: user.image})

    const newRefreshToken = signInRefreshToken({ id: user.Id });

    // Update the user's refresh token in the database
    await prisma.user.update({
      where: { Id: user.Id },
      data: { refreshToken: newRefreshToken },
    });

    const serialized = serialize("token", newAccessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      path: "/",
    });

       const requestHeaders = new Headers(req.headers);
       requestHeaders.set("set-cookie", serialized);
                  
    NextResponse.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  } catch (error) {
    console.error(error);
    NextResponse.json({ message: "Unauthorized: Invalid refresh token" }, {status : 401});
  }
}

function generateAccessToken(payload) {
  // Implement a secure method to generate access tokens
  // For simplicity, you can use a library like jsonwebtoken
  // Set a short expiration time for access tokens (e.g., 15 minutes)
  return jwt.sign(payload, "your-access-token-secret-key", {
    expiresIn: "15m",
  });
}

function generateRefreshToken(payload) {
  // Implement a secure method to generate refresh tokens
  // For simplicity, you can use a library like jsonwebtoken
  // Set a longer expiration time for refresh tokens (e.g., 30 days)
  return jwt.sign(payload, "your-refresh-token-secret-key", {
    expiresIn: "30d",
  });
}
