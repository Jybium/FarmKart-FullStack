import axios from "axios";
import prisma from "../../../lib/prisma";
import { NextResponse } from "next/server";
import { verifyAccessJWT } from "../../../helpers/jwt";

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_API_KEY;

export async function GET(req, { params }) {
  const authorization = req.cookies.get("token");

  if (!authorization || authorization.length <= 0) {
    return NextResponse.json({ message: "Unauthorised" }, { status: 401 });
  }

  const token = authorization.value;
  let decodedToken;
  try {
    decodedToken = await verifyAccessJWT(token);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  const { id } = decodedToken;

  try {
    const productId = params.id;

    // Ensure the request method is GET
    if (req.method !== "GET") {
      return NextResponse.json(
        { error: "Method Not Allowed" },
        { status: 405 }
      );
    }

    // Check if productId is provided
    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    // Fetch the product from the database
    const product = await prisma.product.findUnique({
      where: {
        Id: productId,
      },
      include: {
        user: {
          select: { location: true },
        },
      },
    });

    // Check if the product exists
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Ensure userId is provided in cookies
    if (!id) {
      return NextResponse.json(
        { error: "User ID is missing in cookies" },
        { status: 401 }
      );
    }

    // Fetch the user from the database
    const user = await prisma.user.findUnique({
      where: {
        Id: id,
      },
    });

    // Check if the user exists
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Fetch all products that need to be considered for distance calculation
     const carts = await prisma.cart.findMany({
       where: { userId: id },
       include: {
         product: {
           include: true,
         },
         user: {
           select: { location: true },
         },
       },
     });

    // Initialize a map to store unique destinations and their quantities
    const destinationMap = new Map();

    // Iterate over each product
    for (const cart of carts) {
      // Calculate the destination location
      const productLocation = await cart?.product?.location;

      // Check if the destination already exists in the map
      if (destinationMap.has(productLocation)) {
        // Increment the quantity for the existing destination
        const currentQuantity = destinationMap.get(productLocation);
        destinationMap.set(productLocation, currentQuantity + product.Quantity);
      } else {
        // Add the destination to the map with its quantity
        destinationMap.set(productLocation, product.Quantity);
      }
    }

    // Initialize variables to store total distance and fee
    let totalDistance = 0;
    let totalFee = 0;

    // Iterate over unique destinations and their quantities
    for (const [destination, quantity] of destinationMap.entries()) {
      // Calculate the distance between user's location and destination
      const destinationEncoded = encodeURIComponent(destination + ", Nigeria");
      const userLocationEncoded = encodeURIComponent(
        user.location + ", Nigeria"
      );
      const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${userLocationEncoded}&destinations=${destinationEncoded}&key=${GOOGLE_MAPS_API_KEY}`;
      const response = await axios.get(url);

      // Check if the API response is successful
      if (response.status === 200 && response.data.status === "OK") {
        // Extract distance from the API response
        const distance = response.data.rows[0].elements[0].distance.value; // Distance in meters

        // Calculate fee for the current destination based on its distance and quantity
        const destinationFee = calculateFee(distance) * quantity;

        // Add the destination fee to the total fee
        totalFee += destinationFee;

        // Add the distance to the total distance
        totalDistance += distance;
      } else {
        // Handle API request failure or invalid response
        console.error(
          "Failed to calculate distance for destination:",
          destination
        );
      }
    }

    // Return response with total distance and fee
    return NextResponse.json(
      { totalDistance: totalDistance / 1000, totalFee },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error.message);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Function to calculate fee based on distance
function calculateFee(distance) {
  let fee = 0;

  // Example logic for calculating fee based on distance
  if (distance <= 5000) {
    fee = 5; // Example: $5 for distance less than or equal to 5 kilometers
  } else {
    fee = (distance / 1000) * 1.5; // Example: $1.5 per kilometer for distance greater than 5 kilometers
  }

  return fee;
}
