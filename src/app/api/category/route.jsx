import {NextResponse} from "next/server"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET (req, res) {
  
  try {
    const enumValues = await prisma.$queryRaw`
      SELECT
        enum_range(NULL::"Categories") AS categories; -- Replace 'user_role' with your enum name
    `;

    const categories = enumValues[0].categories;
    
return NextResponse.json({"msg": categories}, {status: 200})
  } catch (error) {
    console.error("Error fetching enum values:", error);
    return NextResponse.json({ error: "Internal Server Error" }, {status: 500});
  }
};
