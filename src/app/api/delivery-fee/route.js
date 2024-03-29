import axios from "axios";
import prisma from "../../lib/prisma";
import { NextResponse } from "next/server";
import { verifyAccessJWT } from "../../helpers/jwt";

const OPENROUTESERVICE_API_KEY = process.env.OPENROUTE;

export async function GET(req) {
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
    // Ensure userId is provided in cookies
    if (!id) {
      return NextResponse.json(
        { error: "User ID is missing in cookies" },
        { status: 401 }
      );
    }

    // Fetch the user from the database
    const user = await prisma.user.findUnique({
      where: { Id: id },
    });

    // Check if the user exists
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Fetch all products that need to be considered for distance calculation
    const carts = await prisma.cart.findMany({
      where: { userId: id },
      include: {
        product: { include: true },
        user: { select: { location: true } },
      },
    });

    // Initialize variables to store total distance and fee
    let totalDistance = 0;
    let totalFee = 0;

    // Iterate over unique destinations and their quantities
    for (const cart of carts) {
      // Calculate the destination location
      const destinationLocation = await cart?.user?.location;

      // Calculate the distance between user's location and destination
      const url = `https://api.openrouteservice.org/v2/matrix/driving-car?api_key=${OPENROUTESERVICE_API_KEY}&locations=${user.location}&destinations=${destinationLocation}`;
      const response = await axios.post(url);

      // Check if the API response is successful
      if (response.status === 200) {
        const distance = response.data.durations[0][0]; // Distance in seconds, assuming user.location is the origin

        // Convert distance to kilometers (or any appropriate unit) and calculate fee
        const distanceInKm = distance / 1000;
        const fee = calculateFee(distanceInKm);

        // Update total distance and fee
        totalDistance += distanceInKm;
        totalFee += fee;
      } else {
        // Handle API request failure or invalid response
        console.error(
          "Failed to calculate distance for destination:",
          destinationLocation
        );
      }
    }

    // Return response with total distance and fee
    return NextResponse.json({ totalDistance, totalFee }, { status: 200 });
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
  if (distance <= 5) {
    fee = 5; // Example: $5 for distance less than or equal to 5 kilometers
  } else {
    fee = distance * 1.5; // Example: $1.5 per kilometer for distance greater than 5 kilometers
  }

  return fee;
}
