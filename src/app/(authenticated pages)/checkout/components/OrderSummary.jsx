import { PrimaryButton } from "@/app/components/Buttons";
import { fetchDeliveryFee } from "@/app/services/cart";
import { calculateTotalPrice } from "@/app/utils/cartPriceAggregator";
import Link from "next/link";
import React from "react";

const OrderSummary = async ({data}) => {


    const cart = data?.response?.data;

      const totalPrice = await calculateTotalPrice(cart);

  const delivery =  await fetchDeliveryFee();


  return (
    <main className="sm:w-[45%] w-full">
      <p className="font-black text-sm my-5">ORDER SUMMARY</p>
      <section>
        <section className="rounded border-[1px] border-black text-sm font-bold">
          <p className="px-4 py-2 font-black ">
            YOUR ORDER ({cart?.length} item)
          </p>
          <div className="my-2 border-t-[1px] border-black py-2 px-4">
            <img src="" alt="" />
            {cart.map((data) => (
              <div className="grid gap-2">
                <p>{data?.product?.productName}</p>
                <p>{data?.product?.price}</p>
                <p className="text-xs">
                  Quantity: {data?.product?.Quantity}
                </p>
              </div>
            ))}
          </div>
          <div className="flex justify-between border-y-[1px] border-black my-2 px-4 py-2">
            <div className="grid gap-2">
              <p>Subtotal</p>
              <p>Delivery Fee</p>
            </div>
            <div className="grid gap-2">
              <p># {totalPrice}</p>
              <p># {delivery? delivery : "  "}</p>
            </div>
          </div>
          <div className="flex justify-between my-2 px-4 py-2 text-red-700">
            <p>Total</p>
            <p># {delivery
} + {totalPrice}</p>
          </div>
        </section>
        <div className="my-5 mb-7">
          <Link href="/payment-successful">
            <PrimaryButton
              title="CONFIRM ORDER"
              type="button"
              className="w-full"
            />
          </Link>
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
