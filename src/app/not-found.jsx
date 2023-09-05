import Image from "next/image";
import React from "react";
import Header from "./components/Header";
import { PrimaryButton } from "./components/Buttons";
import Error from "../Asset/FARMKART IMAGES/images/Error-404/error.png";

const Custom404 = () => {
  return (
    <main className="text-center">
      <Header />
      <main className="w-1/2 mx-auto my-14">
        <Image src={Error} objectFit="contain" objectPosition="center" />
      </main>
      <PrimaryButton
        title="Back To HomePage"
        type="button"
        className="w-1/2 mx-auto my-5"
      />
    </main>
  );
};

export default Custom404;
