import prisma from "../../lib/prisma"
import {NextResponse, NextRequest} from "next/server"

export async function GET(req, res){

    const {id} = req.params
    console.log(req.params)

    if(req.method === "GET"){
        try {
            
            const response = await prisma.product.findUnique({
                where: {Id: id}
            })
    
            console.log(response)
            if(response){
                const updateView = await prisma.product.update(
                    {where: {Id: id}},
                    {data: {views: response.views + 1}}
                    
                )
                console.log(updateView)
                return NextResponse.json({message: "Success"}, {data: response}, {status: 200})}

            
        } catch (error) {
            console.log(error)
            if (error.code === "P2002")
              return NextResponse.json(
                { message: "User Already Exist" },
                { status: 401 }
              );
            if (error.name === "PrismaClientInitializationError")
              return NextResponse.json(
                { message: "Network Error. trying resetting your connection" },
                { status: 404 }
              );
            return NextResponse.json(
              { message: "Error was encountered while tryign to register you" },
              { status: 500 }
            );
        }
    } else{
        return NextResponse.json({message:`${req.method} is not allowed!`}, {status: 403})
    }
}