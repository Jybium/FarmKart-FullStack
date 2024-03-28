export const calculateTotalPrice = (items) => {
  let totalPrice = 0;

  // Iterate over each item in the array
  items?.forEach((item) => {
    // Calculate the subtotal for each item (quantity * price)
    const subtotal = +item.Quantity * +item.product.price;

    // Add the subtotal to the total price
    totalPrice += subtotal;
  });

  return +totalPrice;
};



