import { verifyToken } from "../../../helpers/jwt";
import { PrismaClient } from "@prisma/client";
import { getCookie } from "cookies-next";
import {cookies} from "next/headers"
import {NextResponse} from "next/server"

const secretKey = process.env.JWT_SECRET_KEY


export async function GET (res, req){

    // const authorization  = getCookie({res, req})
    const authorization = new cookies.get("token")
     console.log(authorization);
    // console.log(req.headers)

    if (!authorization || authorization.length <= 0) {
      return NextResponse.json({ message: "Unauthorised" }, { status: 401 });
    }

    const token = authorization
    let decodedToken
    try {
        decodedToken = verifyToken(token, secretKey )
    } catch (error) {
        return NextResponse.json({message:"Invalid token"}, {status: 401})
    }

    const {id, firstName, lastName, image, phoneNumber, emailAddress, location} = decodedToken
    console.log(decodedToken)

    return NextResponse.json({data: {id, firstName, lastName, location, phoneNumber, emailAddress, image}}, {status:"200"}, {message: "success"})
}
