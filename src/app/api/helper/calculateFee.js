// Function to calculate fee based on distance
function calculateFee(distance) {
  let fee = 0;

  // Example logic for calculating fee based on distance
  if (distance <= 5) {
    fee = 5000; // Example: $5 for distance less than or equal to 5 kilometers
  } else {
    fee = (distance) * 2000; // Example: $1.5 per kilometer for distance greater than 5 kilometers
  }

  return fee;
}

export default calculateFee