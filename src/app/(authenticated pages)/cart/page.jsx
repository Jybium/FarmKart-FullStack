"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { PrimaryButton } from "../../components/Buttons";
import CartImage from "@/Asset/FARMKART IMAGES/images/cart/Artwork.png";
import Link from "next/link";
import { GrSubtract } from "react-icons/gr";
import { GrAdd } from "react-icons/gr";
import { useRouter } from "next/navigation";
import { useFetchWithInterceptors } from "@/app/lib/fetch";
import { Spinner } from "flowbite-react";
import notifyError from "@/app/utils/notifyError";
import { reverseFormatNumber } from "../../utils/numberFormatter";
import {
  decreaseCartItem,
  fetchDeliveryFee,
  increaseCartItem,
  removeCartItem,
} from "../../services/cart";
import { calculateTotalPrice } from "../../utils/cartPriceAggregator";

const imageUrl =
  "https://neainqsqckknglhdwqdv.supabase.co/storage/v1/object/public/";

export const dynamic = "force-dynamic";

const Cart = async () => {
  const router = useRouter();
  const [deliveryFee, setDeliveryFee] = useState(null);

  const { data, loading, error } = await useFetchWithInterceptors("/api/cart", {
    method: "GET",
    cache: "no-store",
    next: { revaidate: "300" },
  });

  const cartData = data?.response?.data;

  if (error) {
    notifyError("An error has occured!");
    return (
      <div className="text-[#E6EEE6] text-center">
        <p>An error has occured! </p>
      </div>
    );
  }

  const totalPrice = await calculateTotalPrice(cartData);

  const delivery = loading ? " " : deliveryFee;

  // Use useEffect to fetch the delivery fee on the client side
  useEffect(() => {
    const fetchFee = async () => {
      try {
        const fee = await fetchDeliveryFee();
        setDeliveryFee(fee);
      } catch (error) {
        console.error("Error fetching delivery fee:", error);
       
      }
    };

    fetchFee(); 

   
  }, []);

  return (
    <main>
      <Header className="bg-white" />
      {data?.length === 0 ? (
        <div className="justify-center text-center mb-24 Hide top-[80px] m-auto py-10 h-[calc(100%-80px)] relative ">
          <Spinner color="success" size="xl" />
        </div>
      ) : (
        <div className=" overflow-scroll  Hide">
          {data?.response?.data?.length === 0 ? (
            <main className="text-center w-ful Hide sm:w-2/5 w-5/6 top-[80px] m-auto py-10 h-[calc(100%-80px)] relative">
              <main className=" ">
                <div className="relative">
                  <Image
                    src={CartImage}
                    alt="cart image"
                    className="text-center m-auto rounded-lg w-1/2 sm:w-1/2 mb-2 relative"
                  />
                  <p className="absolute grid place-items-center place-content-center text-center m-auto sm:h-16 h-10 w-10 sm:w-16 bottom-3 right-20  sm:bottom-4 sm:right-[20%] text-white bg-green-950 rounded-full text-2xl font-mono">
                    0
                  </p>
                </div>
                <div className="grid gap-3">
                  <h1 className="font-black capitalize">
                    your cart looks empty
                  </h1>
                  <p className="text-sm">
                    {" "}
                    Looks like you haven’t added anything to your cart yet
                  </p>
                </div>
                <Link href="/products">
                  <PrimaryButton
                    title="Back To Homepage"
                    type="button"
                    className="sm:w-full w-5/6 mx-auto my-5 text-sm tracking-wider"
                  />
                </Link>
              </main>
            </main>
          ) : (
            // IF THE CART IS NOT EMPTY
            <main className="w-[90%] mx-auto mt-8 mb-20 relative top-[80px] overflow-scroll h-[calc(100%-80px)] pb-20 Hide">
              <h1 className="capitalize font-black">
                shopping cart: {data?.response.data.length}{" "}
                {data?.response?.data.length > 1 ? "items" : "item"}
              </h1>
              <section className="sm:flex w-full gap-6 justify-between items-start mt-5 mb-10">
                <div className="bg-[#E6EEE6] rounded shadow w-full sm:w-9/12">
                  <div className="flex items-center justify-between py-2 px-4 uppercase font-black text-sm border-b border-black">
                    <p className="sm:w-[46%] w-[47%]">item details</p>
                    <p className="sm:w-[20%] w-[21%] text-right sm:text-right">
                      item price
                    </p>
                    <p className="w-[30%] text-right">Quantity</p>
                  </div>
                  {cartData?.map((data) => (
                    <section className="py-3 px-4  backdrop-blur">
                      <div className="flex justify-between  w-full">
                        <div className="sm:flex gap-5 sm:w-[46%] w-[42%]">
                          <Image
                            src={`${imageUrl}/${data?.product?.image[0].Image[0]}`}
                            alt="product image"
                            className="max-w-full h-[150px] block object-cover"
                            width={150}
                            height={150}
                            priority
                          />
                          <p className="flex flex-col items-start sm:gap-2 gap-1 pt-2">
                            <span>{data?.product?.productName}</span>
                            <span className="text-sm">
                              {data?.user?.location}
                            </span>
                          </p>
                        </div>
                        <p className="flex flex-col sm:w-[20%] text-center sm:gap-2 gap-1 w-[23%]">
                          # {reverseFormatNumber(data?.product?.price)}
                          <span className="sm:text-sm text-[12px] text-slate-500">
                            # {reverseFormatNumber(data?.product?.price)} x{" "}
                            {data?.Quantity}
                          </span>
                        </p>
                        <div className="text-right w-[20%]">
                          <p className="flex items-center justify-end sm:gap-3 gap-1">
                            <span
                              className="p-2 border-black sm:border"
                              onClick={() => {
                                decreaseCartItem(data?.Id);
                                router.replace("/cart");
                              }}
                            >
                              <GrSubtract />
                            </span>{" "}
                            {data?.Quantity}{" "}
                            <span
                              className="p-2 border-black sm:border"
                              onClick={() => {
                                increaseCartItem(data?.Id);
                                router.replace("/cart");
                              }}
                            >
                              <GrAdd />
                            </span>
                          </p>
                        </div>
                      </div>
                      <p className="font-bold text-sm flex justify-end mt-2 text-right gap-9 text-[#003800]">
                        <span
                          onClick={() => {
                            removeCartItem(data?.Id);
                            router.replace("/cart");
                          }}
                        >
                          Remove
                        </span>
                        {/* <span>Save for later</span> */}
                      </p>
                    </section>
                  ))}
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
                      <span>
                        {data?.length !== 0 ? "#" : ""}
                        {data?.length !== 0
                          ? reverseFormatNumber(totalPrice)
                          : ""}
                      </span>
                      <span>
                        {data?.length !== 0 ? "#" : ""}
                        {data?.length !== 0
                          ? reverseFormatNumber(delivery)
                          : ""}
                      </span>
                    </p>
                  </div>
                  <p className="flex justify-between py-3 px-4">
                    <span>Total</span>
                    <span className="font-black">
                      {data?.length !== 0 ? "#" : " "}
                      {data?.length !== 0
                        ? reverseFormatNumber(totalPrice, delivery)
                        : " "}
                    </span>
                  </p>
                  <div className="text-center mx-auto w-auto mt-5">
                    <Link href="/checkout">
                      <PrimaryButton
                        title="CHECKOUT"
                        type="submit"
                        className="w-10/12 mx-auto text-center"
                      />
                    </Link>
                  </div>
                </div>
              </section>
              <Link href="/products" className="font-bold text-[#003800]">
                continue shopping
              </Link>
            </main>
          )}
        </div>
      )}
    </main>
  );
};

export default Cart;
