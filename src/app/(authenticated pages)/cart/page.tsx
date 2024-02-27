import Image from "next/image";
import React from "react";
import Header from "../../components/Header";
import { PrimaryButton } from "../../components/Buttons";
import Cart from "@/Asset/FARMKART IMAGES/images/cart/Artwork.png";
import Link from "next/link";
import { GrSubtract } from "react-icons/gr";
import { GrAdd } from "react-icons/gr";
import Photo from "@/Asset/FARMKART IMAGES/images/profile-image.jpg";

const Custom404 = () => {
  return (
    <>
      <main className="text-center w-full">
        <Header className="bg-white" />
        <main className="m-auto py-10 text-center relative sm:w-2/5 w-5/6 top-[80px] overflow-scroll h-[calc(100%-80px)] Hide">
          <div className="relative">
            <Image
              src={Cart}
              alt="cart image"
              className="text-center m-auto rounded-lg w-1/2 sm:w-1/2 mb-2 relative"
            />
            <p className="absolute grid place-items-center place-content-center text-center m-auto sm:h-16 h-10 w-10 sm:w-16 bottom-3 right-20  sm:bottom-4 sm:right-[20%] text-white bg-green-950 rounded-full text-2xl font-mono">
              0
            </p>
          </div>
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
            className="sm:w-full w-4/6 mx-auto my-5 text-sm tracking-wider"
          />
        </main>
      </main>

      {/* IF THE CART IS NOT EMPTY */}

      <main className="w-[90%] mx-auto mt-8 mb-20 relative top-[80px] overflow-scroll h-[calc(100%-80px)] pb-20 Hide">
        <h1 className="capitalize font-black">shopping cart: 1 item</h1>
        <section className="sm:flex w-full gap-6 justify-between items-start mt-5 mb-10">
          <div className="bg-[#E6EEE6] rounded shadow w-full sm:w-9/12">
            <div className="flex items-center justify-between py-2 px-4 uppercase font-black text-sm border-b border-black">
              <p className="sm:w-[46%] w-[47%]">item details</p>
              <p className="sm:w-[20%] w-[21%] text-right sm:text-right">
                item price
              </p>
              <p className="w-[30%] text-right">Quantity</p>
            </div>
            <section className="py-3 px-4">
              <div className="flex justify-between  w-full">
                <div className="sm:flex gap-5 sm:w-[46%] w-[42%]">
                  <Image
                    src={Photo}
                     
                     
                    alt="product image"
                    className="w-[150px] h-max"
                  />
                  <p className="flex flex-col items-start sm:gap-2 gap-1">
                    <span>Matured Goats</span>
                    <span className="text-sm">Color: Brown</span>
                  </p>
                </div>
                <p className="flex flex-col sm:w-[20%] text-center sm:gap-2 gap-1 w-[23%]">
                  #30, 000{" "}
                  <span className="text-sm text-slate-500">#30, 000 x 1</span>
                </p>
                <div className="text-right w-[20%]">
                  <p className="flex items-center justify-end sm:gap-3 gap-1">
                    <span className="p-2 border-black sm:border">
                      <GrSubtract />
                    </span>{" "}
                    1{" "}
                    <span className="p-2 border-black sm:border">
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

          <div className="bg-[#E6EEE6] py-2 text-sm rounded shadow sm:w-3/12 w-full my-5 sm:my-0">
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
