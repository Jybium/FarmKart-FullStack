import { verifyToken } from "../../../helpers/jwt";
import { PrismaClient } from "@prisma/client";
import { getCookie } from "cookies-next";
import {cookies} from "next/headers"
import {NextResponse} from "next/server"

const secretKey = process.env.JWT_SECRET_KEY


export async function GET (request){

    // const authorization  = getCookie({res, req})
    const authorization = request.cookies.get("token");
    //  console.log(authorization);
    // console.log(req.headers)

    if (!authorization || authorization.length <= 0) {
      return NextResponse.json({ message: "Unauthorised" }, { status: 401 });
    }

    const token = authorization.value
    let decodedToken
    try {
        decodedToken = verifyToken(token, secretKey )
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"Invalid token"}, {status: 401})
    }

    const {id, firstName, lastName, image, phoneNumber, emailAddress, location} = decodedToken
    // console.log(decodedToken)
    

    return NextResponse.json({data : decodedToken}, {status:"200"})
}
