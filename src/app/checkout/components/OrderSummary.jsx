import { PrimaryButton } from "@/app/components/Buttons";
import React from "react";

const OrderSummary = () => {
  return (
    <main className="sm:w-[45%] w-full">
      <p className="font-black text-sm my-5">ORDER SUMMARY</p>
      <section>
        <section className="rounded border-[1px] border-black text-sm font-bold">
          <p className="px-4 py-2 font-black ">YOUR ORDER (1 item)</p>
          <div className="my-2 border-t-[1px] border-black py-2 px-4">
            <img src="" alt="" />
            <div className="grid gap-2">
              <p>Matured Goats</p>
              <p>#600, 000</p>
              <p className="text-xs">Quantity: 1</p>
            </div>
          </div>
          <div className="flex justify-between border-y-[1px] border-black my-2 px-4 py-2">
            <div className="grid gap-2">
              <p>Subtotal</p>
              <p>Delivery Fee</p>
            </div>
            <div className="grid gap-2">
              <p>#600, 000</p>
              <p>#2, 000</p>
            </div>
          </div>
          <div className="flex justify-between my-2 px-4 py-2 text-red-700">
            <p>Total</p>
            <p>#602, 000</p>
          </div>
        </section>
        <div className="my-5 mb-7">
          <PrimaryButton
            title="CONFIRM ORDER"
            type="button"
            className="w-full"
          />
        </div>
        <div>
          <p className="text-sm font-black">NEED HELP?</p>
          <p className="text-xs mt-2">
            Let our support team guide you.{" "}
            <span className="font-bold text-[#003800]">Contact Us</span>
          </p>
        </div>
      </section>
    </main>
  );
};

export default OrderSummary;
