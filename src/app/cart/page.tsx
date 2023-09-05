import Image from "next/image";
import React from "react";
import Header from "../components/Header";
import { PrimaryButton } from "../components/Buttons";
import Cart from "@/Asset/FARMKART IMAGES/images/cart/Artwork.png";

const Custom404 = () => {
  return (
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
  );
};

export default Custom404;
