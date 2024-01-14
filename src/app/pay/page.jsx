// pages/payment.js
import Stripe from "../components/Stripe";

const PaymentPage = () => {
  return (
    <div>
      <h1>Payment Page</h1>
      <Stripe />
    </div>
  );
};

export default PaymentPage;
