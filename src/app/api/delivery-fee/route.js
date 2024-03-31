
import prisma from "../../lib/prisma";
import handleError from "../helper/handleError";
import calculateTotalDistance from "../helper/calculateTotalDistance"
import { verifyAccessJWT } from "../../helpers/jwt";



// Main function to handle GET requests
export async function GET(req) {

  const authorization = req.cookies.get("token");
  if (!authorization || authorization.length <= 0) {
    return handleError("Unauthorized", 401);
  }
  const token = authorization?.value;
  const decodedToken = await verifyAccessJWT(token);
  
  try {
    // Verify access token

    // Check user ID
    const { id } = decodedToken;
    if (!id) {
      return handleError("User ID is missing in cookies", 401);
    }

    // Fetch user and carts
    const user = await prisma.user.findUnique({ where: { Id: id } });
    if (!user) {
      return handleError("User not found", 404);
    }
    const carts = await prisma.cart.findMany({
      where: { userId: id },
      include: {
        product: { include: true },
        user: { select: { location: true } },
      },
    });

    if(carts.length == 0){
      return handleError("Cart is empty")
    }

    // Calculate total distance and fee
    return calculateTotalDistance(carts, user);
  } catch (error) {
    console.error("Error:", error.message);
    return handleError("Internal server error");
  }
}