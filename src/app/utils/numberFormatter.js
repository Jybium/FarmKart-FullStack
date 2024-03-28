export const reverseFormatNumber = (number, delivery) => {
  try {
    // Convert number to number
    const num = Number(number);

    // Check if delivery is provided and convert to number, or default to 0
    const del = delivery ? Number(delivery) : 0;

    // Check if either num or del is NaN
    if (isNaN(num) || isNaN(del)) {
      throw new Error("Invalid input: number or delivery is not a number");
    }

    // Calculate the total sum
    const total = num + del;

    // Format the total with commas for thousands separators
    const formattedTotal = total.toLocaleString();


    return formattedTotal;
  } catch (error) {
    console.error("Error:", error);
    return null; // or handle the error as needed
  }
};
