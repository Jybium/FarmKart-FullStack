//@ts-ignore

import Openrouteservice from "openrouteservice-js";
import { NextResponse } from "next/server";
import getLocationCoordinates from "../../services/calculateCordinates";
import calculateFee from "./calculateFee";


// CONSTANT
const OPENROUTESERVICE_API_KEY = process.env.OPENROUTE;


// Helper function to calculate total distance
const calculateTotalDistance = async (carts, user) => {
  try {
    // Initialize variables
    let totalDistance = 0;
    let totalFee = 0;
    const destinationMap = new Map();

    // Iterate over carts and populate destinationMap
    for (const cart of carts) {
      const productLocation = cart.user.location;
      destinationMap.set(
        productLocation,
        (destinationMap.get(productLocation) || 0) + cart.Quantity
      );
    }

    // Iterate over destinations and calculate distance
    for (const [destination, quantity] of destinationMap.entries()) {
      // Calculate coordinates and prepare locations array
      const destinationEncoded = await getLocationCoordinates(destination);
      const userLocationEncoded = await getLocationCoordinates(user.location);
      const locations = userLocationEncoded
        .concat(destinationEncoded)
        .map(([lat, lng]) => [lng, lat]);

      // Perform Matrix calculation
      const Matrix = new Openrouteservice.Matrix({
        api_key: OPENROUTESERVICE_API_KEY,
      });
      const response = await Matrix.calculate({
        locations,
        profile: "driving-car",
        sources: ["0"],
        destinations: [],
        metrics: ["distance"],
        units: "km",
      });

      // Handle response
      if (!response.distances) {
        return handleError(
          `Failed to calculate distance for destination: ${destination}`
        );
      }

      // Calculate total distance and fee
      const distanceInKm = response.distances[0].reduce(
        (total, item) => total + item,
        0
      );
      const fee = await calculateFee(distanceInKm);

      // Update totals
      totalDistance += distanceInKm;
      totalFee += fee;
    }

    // Return response
    if (totalDistance === 0) {
      return NextResponse.json(
        { totalDistance: "Same state delivery", totalFee },
        { status: 200 }
      );
    }
    return NextResponse.json({ totalDistance, totalFee }, { status: 200 });
  } catch (error) {
    console.error("Error:", error.message);
    return handleError("Internal server error");
  }
};


export default calculateTotalDistance