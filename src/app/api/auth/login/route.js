
import {  PrismaClient } from "@prisma/client";
import {NextResponse} from "next/server"
import { signInAccessToken } from "../../../helpers/jwt";
import * as bcrypt from "bcrypt"
const prisma = new PrismaClient()

export async function POST(req, res) {
  try {
    const {
      password,
      emailAddress,
    } = await req.json()
    

    if(!password || !emailAddress) return NextResponse.json({message:"Both Fields are required"}, {status: 400})

    
    const user = await prisma.user.findFirst({where: {emailAddress: emailAddress.toLowerCase()}})
    if (!user) return NextResponse.json({message:"User not found"}, {status:401})
    console.log(user, password)

    const pastWord = bcrypt.compareSync(password, user.password);
    
    if(!pastWord) return NextResponse.json({message:"Password Incorrect"}, {status: 400})
    
    if(pastWord && user){
      const token = signInAccessToken(user)
      return NextResponse.json({message:"User Signed in successfully", data : {user, token}}, {status:200},)
    } else{
      return NextResponse.json({message:"Error trying to sign you in"}, {status: 400})
    }

      

  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Error was encountered while tryign to log you in"},
     {status: 500
    });
  }
}
