import { verifyAccessJWT } from "@/app/helpers/jwt";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import stripe from "stripe";

const prisma = new PrismaClient();

export async function POST(request) {
  if (request.method === "POST") {
    const { productId, quantity, multiple } = await request.json();
    const product_Id = +productId;

    const authorization = request.cookies.get("token");

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
      let totalAmount;
      let orderItems;
      let order;

      if (multiple) {
        // Handle the case where the user adds products to the cart
        // Fetch cart items from user's cart
        const cartItems = await prisma.cart.findMany({
          where: { userId: id },
          include: {
            product: true,
          },
        });

        if (!cartItems.length) {
          return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
        }

        // Calculate total amount from cart items
        totalAmount = calculateTotal(cartItems);

        // Check if the user has an existing order
        const existingOrder = await prisma.order.findFirst({
          where: { userId: id, status: "PENDING" },
        });

        if (existingOrder) {
          // Update the existing order with new product details
          order = await prisma.order.update({
            where: { Id: existingOrder.Id },
            data: {
              totalAmount: existingOrder.totalAmount + totalAmount,
              // Add other necessary fields
            },
          });
        } else {
          // Create a new order
          order = await prisma.order.create({
            data: {
              userId: id,
              totalAmount,
              status: "PENDING",
              // Add other necessary fields
            },
          });
        }

        // Create order items
        orderItems = await Promise.all(
          cartItems.map(async (item) => {
            const orderItem = await prisma.orderItem.create({
              data: {
                orderId: order.id,
                productId: item.productId,
                quantity: item.Quantity,
                unitPrice: item.product.price,
                subTotal: item.product.price * item.Quantity,
              },
            });
            return orderItem;
          })
        );

        // Clear cart
        await prisma.cart.deleteMany({
          where: { userId: id },
        });
      } else {
        // Handle the case of a single product purchase
        // Fetch product details
        const product = await prisma.product.findUnique({
          where: { Id: product_Id },
        });

        if (!product) {
          return NextResponse.json(
            { error: "Product not found" },
            { status: 404 }
          );
        }

        // Calculate total amount for single product purchase
        totalAmount = product.price * quantity;

        // Check if the user has an existing order
        const existingOrder = await prisma.order.findFirst({
          where: { userId: id, status: "PENDING" },
        });

        if (existingOrder) {
          // Update the existing order with new product details
          order = await prisma.order.update({
            where: { Id: existingOrder.Id },
            data: {
              totalAmount: existingOrder.totalAmount + totalAmount,
              // Add other necessary fields
            },
          });
        } else {
          // Create a new order
          order = await prisma.order.create({
            data: {
              userId: id,
              totalAmount,
              status: "PENDING",
              // Add other necessary fields
            },
          });
        }

        // Create order item for single product
        const orderItem = await prisma.orderItem.create({
          data: {
            orderId: order.Id,
            productId,
            quantity,
            unitPrice: product.price,
            subTotal: product.price * quantity,
          },
        });

        orderItems = [orderItem];
      }

      return NextResponse.json(
        { message: "Order created successfully", orderItems },
        { status: 201 }
      );
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Failed to create order" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      { message: "Unfortunately, An error has occured" },
      { status: 405 }
    );
  }
}
