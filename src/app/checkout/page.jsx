import React from "react";
import Header from "../components/Header";
import { GrShieldSecurity } from "react-icons/gr";
import Checkout from "@/app/checkout/components/Checkout";
import OrderSummary from "@/app/checkout/components/OrderSummary";

const page = () => {
  return (
    <main>
      <Header />
      <main className=" w-5/6 m-auto my-10">
        <p className="text-right flex justify-end text-sm items-center gap-1">
          <GrShieldSecurity /> Secured Payment
        </p>
        <section
          className="flex justify-between
        my-10 gap-5"
        >
          <Checkout />
          <OrderSummary />
        </section>
      </main>
    </main>
  );
};

export default page;
