import React from "react";
import Image from "next/image";
import Header from "../components/Header";
import Link from "next/link";
import Payment from "../../Asset/FARMKART IMAGES/images/payment/PAYMENT SUCCESSFUL.gif";
import "@/app/payment-successful/payment.css";

const page = () => {
  return (
    <main>
      <Header />
      <main className="w-5/6 mx-auto my-5">
        <Image
          src={Payment}
          objectFit="contain"
          objectPosition="center"
          className="w-1/4 m-auto text-center"
        />
        <section className="text-center my-6">
          <h1 className="font-black text-lg grid gap-9 capitalize">
            payment successfull!
          </h1>
          <p className="text-sm w-[37%] mx-auto mt-3">
            Your payment has been received. We have sent an email to{" "}
            <span className="font-bold text-blue-500">
              jamesabel@outlook.com
            </span>{" "}
            containing your order details and how to track ypur order.
          </p>
        </section>
        <section className="mb-20">
          <div className="flex justify-between mx-5">
            <p></p>
            <p className="font-black uppercase"> order details</p>
            <Link href="/products" className="font-black text-[#003800]">
              Continue Shopping
            </Link>
          </div>
          <hr className="mb-5 mt-2" />
          <section className="flex m-auto w-1/3 gap-3">
            <div className="text-right gap-2 grid font-black uppercase">
              <p>Product:</p>
              <p>Quantity:</p>
              <p>Amount Paid:</p>
              <p>Payment type:</p>
              <p>Card holder name:</p>
            </div>
            <div className="text-left gap-2 grid capitalize">
              <p>Matured Goats</p>
              <p>20</p>
              <p>#602,000.00</p>
              <p>visa debit card</p>
              <p>james abel</p>
            </div>
          </section>
        </section>
      </main>
    </main>
  );
};

export default page;
