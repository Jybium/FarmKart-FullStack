// pages/api/payment.js
import { loadStripe } from "@stripe/stripe-js";

const stripe = loadStripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req, res) {
  if (req.method === "POST") {
    try {
      // Use the Stripe API to process payments on the server
      // ...

      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
