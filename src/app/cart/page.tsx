import Image from "next/image";
import React from "react";
import Header from "../components/Header";
import { PrimaryButton } from "../components/Buttons";
import Cart from "@/Asset/FARMKART IMAGES/images/cart/Artwork.png";
import Link from "next/link";
import { GrSubtract } from "react-icons/gr";
import { GrAdd } from "react-icons/gr";
import Photo from "@/Asset/FARMKART IMAGES/images/profile-image.jpg";

const Custom404 = () => {
  return (
    <>
      <main className="text-center w-full">
        <Header />
        <main className="m-auto my-10 text-center relative w-1/5 ">
          <Image
            src={Cart}
            objectFit="contain"
            objectPosition="center"
            alt="cart image"
            className="text-center m-auto rounded-lg"
          />
          <p className="absolute grid place-items-center place-content-center text-center m-auto h-16 w-16 bottom-4 -right-[20px] text-white bg-green-950 rounded-full text-2xl font-mono">
            0
          </p>
        </main>
        <div className="grid gap-3">
          <h1 className="font-black capitalize">your cart looks empty</h1>
          <p className="text-sm">
            {" "}
            Looks like you haven’t added anything to your cart yet
          </p>
        </div>
        <PrimaryButton
          title="Back To Homepage"
          type="button"
          className="w-1/2 mx-auto my-5 text-sm tracking-wider"
        />
      </main>

      {/* IF THE CART IS NOT EMPTY */}

      <main className="w-[90%] m-auto mt-8 mb-20">
        <h1 className="capitalize font-black">shopping cart: 1 item</h1>
        <section className="flex gap-6 justify-between mt-5 mb-10">
          <div className="bg-[#E6EEE6] rounded shadow w-9/12">
            <div className="flex justify-between py-2 px-4 uppercase font-black text-sm border-b border-black">
              <p className="w-[46%]">item details</p>
              <p className="w-[20%] text-right">item price</p>
              <p className="w-[30%] text-right">Quantity</p>
            </div>
            <section className="py-3 px-4">
              <div className="flex justify-between  w-full">
                <div className="flex gap-5 w-[46%]">
                  <Image
                    src={Photo}
                    objectFit="contain"
                    objectPosition="center"
                    alt="product image"
                    className="w-[150px] h-max"
                  />
                  <p className="flex flex-col items-start gap-2">
                    <span>Matured Goats</span>
                    <span className="text-sm">Color: Brown</span>
                  </p>
                </div>
                <p className="flex flex-col w-[20%] text-center gap-2">
                  #30, 000{" "}
                  <span className="text-sm text-slate-500">#30, 000 x 1</span>
                </p>
                <div className="text-right w-[20%]">
                  <p className="flex items-center justify-end gap-3">
                    <span className="p-2 border-black border">
                      <GrSubtract />
                    </span>{" "}
                    1{" "}
                    <span className="p-2 border-black border">
                      <GrAdd />
                    </span>
                  </p>
                </div>
              </div>
              <p className="font-bold text-sm flex justify-end mt-2 text-right gap-9 text-[#003800]">
                <span>Remove</span>
                <span>Save for later</span>
              </p>
            </section>
          </div>

          {/* CHECKOUT PAGE */}

          <div className="bg-[#E6EEE6] py-2 text-sm rounded shadow w-3/12">
            <h1 className="uppercase text-sm pb-2 pl-4 font-black">
              order summary
            </h1>
            <div className="border-y border-black flex justify-between py-4 px-4 ">
              <p className="grid gap-3">
                <span>Subtotal</span>
                <span>Delivery Fee</span>
              </p>
              <p className="grid font-black gap-3">
                <span>#30, 000</span>
                <span>#2, 000</span>
              </p>
            </div>
            <p className="flex justify-between py-3 px-4">
              <span>Total</span>
              <span className="font-black">#32, 000</span>
            </p>
            <div className="text-center mx-auto w-auto mt-5">
              <PrimaryButton
                title="CHECKOUT"
                type="submit"
                className="w-10/12 mx-auto text-center"
              />
            </div>
          </div>
        </section>
        <Link href="/products" className="font-bold text-[#003800]">
          continue shopping
        </Link>
      </main>
    </>
  );
};

export default Custom404;
