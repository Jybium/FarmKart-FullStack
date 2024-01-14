
import {NextResponse} from "next/server"
import { signInAccessToken } from "../../../helpers/jwt";
import cookie, { serialize } from "cookie"
import * as bcrypt from "bcrypt"
import prisma from '@/app/lib/prisma'

import rateLimitMiddleware from "@/app/helpers/rateLimitMiddleware"

export async function POST(req, res) {

    await rateLimitMiddleware(req, res)

  try {
    const { password, emailAddress } = await req.json();

    if (!password || !emailAddress)
      return NextResponse.json(
        { message: "Both Fields are required" },
        { status: 400 }
      );

    const user = await prisma.user.findUnique({
      where: { emailAddress: emailAddress.toLowerCase() },
    });
    if (!user)
      return NextResponse.json({ message: "User not found" }, { status: 401 });

    // Check if the account is locked
    if (
      user.loginAttempts >= 5 &&
      Date.now() - user.lastLoginAttempt < 15 * 60 * 1000
    ) {
      return NextResponse.json(
        {
          message:
            "Account locked due to too many failed attempts. Try again later.",
        },
        { status: 401 }
      );
    }


    

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);

    if (!isPasswordCorrect)
      return NextResponse.json(
        { message: "Password Incorrect" },
        { status: 400 }
      );

      if (!isPasswordCorrect) {
        // Update login attempts
        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            loginAttempts: user.loginAttempts + 1,
            lastLoginAttempt: new Date(),
          },
        });

        return NextResponse.json(
          { message: "Invalid email address or password" },
          { status: 401 }
        );
      }


    if (isPasswordCorrect && user) {
      const token = await signInAccessToken(user);
      const serialized = serialize("token", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        path: "/",
      });

      // Reset login attempts on successful login
      await prisma.user.update({
        where: {
          id: user.Id,
        },
        data: {
          loginAttempts: 0,
          lastLoginAttempt: null,
        },
      });

      const requestHeaders = new Headers(req.headers);
      requestHeaders.set("set-cookie", serialized);

      return NextResponse.json(
        { message: "User Signed in successfully", data: { user, token } },
        { status: 200, headers: { "set-cookie": serialized } }
      );


    } else {

      return NextResponse.json(
        { message: "Error trying to sign you in, wrong password" },
        { status: 400 }
      );
    }
  } catch (error) {

    console.log(error);
       if(error.code === "P2002") return NextResponse.json({message:"User Already Exist"}, {status: 401})

    if(error.name === "PrismaClientInitializationError") return NextResponse.json({message:"Network Error. trying resetting your connection"}, {status: 404})
    
    return NextResponse.json(
      { message: "Error was encountered while tryign to register you" },
      { status: 500 }
    );
  
  }
}
