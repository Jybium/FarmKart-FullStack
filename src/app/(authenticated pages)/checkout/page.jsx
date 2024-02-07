import React from "react";
import Header from "../../components/Header";
import { GrShieldSecurity } from "react-icons/gr";
import Checkout from "./components/Checkout";
import OrderSummary from "./components/OrderSummary";

const page = () => {
  return (
    <main>
      <Header className="bg-white" />
      <main className=" w-5/6 m-auto py-10 relative overflow-scroll h-[calc(100%-80px)] top-[80px] pb-20 Hide">
        <p className="text-right flex justify-end text-sm items-center gap-1">
          <GrShieldSecurity /> Secured Payment
        </p>
        <section
          className="sm:flex grid justify-between
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
