import cookie from "cookie"
import { setCookie } from "cookies-next"
import {NextResponse} from "next/server"

export default async function (req, res){

    if(req.method === 'POST'){

        
        res.setHeader(
            'Set-Cookie', cookie.serialize("token", " ", {
                httpOnly: true, 
                secure: process.env.NODE_ENV !== 'development',
                expires: new Date(0),
                sameSite: 'strict',
                path:"/"
            })
            )
           await setCookie("token", " ", {
                expires: new Date.now()
            })
            res.status(200).json({message:'Logged out successfully!'})
        }else {
            NextResponse.json({message:`${req.method} method not allowed`}, {status: 403})
            
        }
}