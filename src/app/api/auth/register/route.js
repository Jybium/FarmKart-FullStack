import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import * as bcrypt from "bcrypt";
const prisma = new PrismaClient();

export async function POST(req, res) {
  try {
    const {
      password,
      firstName,
      lastName,
      emailAddress,
      phoneNumber,
      location,
    } = await req.json();

    const PhoneNumber = phoneNumber.toString()

    if (!password || !firstName || !lastName || !emailAddress)
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );

    const existingUser = await prisma.user.findFirst({
      where: {
        emailAddress
      },
    });

    

    if (existingUser)
      return NextResponse.json(
        { message: "Email Address Already Exist" },
        { status: 404 }
      );

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        phoneNumber: PhoneNumber,
        emailAddress: emailAddress.toLowerCase(),
        location,
        role: "USER",
        password: bcrypt.hashSync(password, 10),
        emailVerify: false,
        verificationToken: "",
      },
    });

    const { password: hashedPassword, ...result } = user;

    
    return NextResponse.json(
      { message: "User Created Successfully" , data: { result }},
      { status: 201 }
    );
  } catch (error) {
     (error)

    if(error.code === "P2002") return NextResponse.json({message:"User Already Exist"}, {status: 401})
    if(error.name === "PrismaClientInitializationError") return NextResponse.json({message:"Network Error. trying resetting your connection"}, {status: 404})
    return NextResponse.json(
      { message: "Error was encountered while tryign to register you" },
      { status: 500 }
    );
  }
}

// export {handler as POST}
