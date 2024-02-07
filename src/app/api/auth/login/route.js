
import {NextResponse} from "next/server"
import { signInAccessToken, signInRefreshToken } from "../../../helpers/jwt";

import  { serialize } from "cookie"
import {setCookie} from "cookies-next"
import * as bcrypt from "bcrypt"
import prisma from '../../../lib/prisma'

// import rateLimitMiddleware from "../../../helpers/rateLimitMiddleware"

export async function POST(req, res) {

    // await rateLimitMiddleware(req, res, async () =>{
      
    // })

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
    // if (
    //   user.loginAttempts >= 5 &&
    //   Date.now() - user.lastLoginAttempts < 15 * 60 * 1000
    // ) {
    //   return NextResponse.json(
    //     {
    //       message:
    //         "Account locked due to too many failed attempts. Try again later.",
    //     },
    //     { status: 401 }
    //   );
    // }

    // Check if the password is correct

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);

    if (!isPasswordCorrect)
      return NextResponse.json(
        { message: "Password Incorrect" },
        { status: 400 }
      );

        // if password is not correct, update the log in attempt     

      if (!isPasswordCorrect) {

        // Update login attempts
        // await prisma.user.update({
        //   where: {
        //     id: user.Id,
        //   },
        //   data: {
        //     loginAttempts: user.loginAttempts + 1,
        //     lastLoginAttempt: new Date(),
        //   },
        // });

        return NextResponse.json(
          { message: "Invalid email address or password" },
          { status: 401 }
        );
      }


      // if password is correct


    if (isPasswordCorrect && user) {

      // Generate an access token

      const token = await signInAccessToken({
        id: user.Id,
        email: user.emailAddress,
        firstName: user.firstName,
        lastName: user.lastName,
      });
      
      const serialized = serialize("token", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        path: "/",
      });

      const refreshToken = await signInRefreshToken({id:user.Id})
      // console.log(typeof refreshToken)
        // Reset login attempts on successful login
        if(refreshToken){
        
        await prisma.user.update({
          where: {
            Id: user.Id,
          },
          data: {
            // loginAttempts: 0,
            // lastLoginAttempt: null,
            refreshToken: refreshToken.toString()
          },
        });} else return

      const requestHeaders = new Headers(req.headers);
      requestHeaders.set("set-cookie", serialized);
     
      setCookie("token", token, serialized)

      return NextResponse.json(
        { message: "User Signed in successfully", data: { user: [user,lastName, user.lastName, user.phoneNumber, user.emailAddress, user.image], refreshToken, token } },
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
