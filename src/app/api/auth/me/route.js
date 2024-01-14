import { verifyToken } from "../../../helpers/jwt";
import { PrismaClient } from "@prisma/client";
import {NextResponse} from "next/server"
const secretKey = process.env.JWT_SECRET_KEY


export async function POST  (res, req){

    const {authorization } = req.headers

    if(!authorization | !authorization.startsWith('Bearer')){
        return NextResponse.json({message: "Unauthorised"}, {status: 401})
    }

    const token = authorization.substring(7)
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
