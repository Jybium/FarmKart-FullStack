import Image from "next/image";
import React from "react";
import Header from "./components/Header";
import { PrimaryButton } from "./components/Buttons";
import Error from "../Asset/FARMKART IMAGES/images/Error-404/error.png";

const Custom404 = () => {
  return (
    <main className="text-center">
      <Header className="bg-white" />
      <main className="w-1/2 mx-auto py-14 relative overflow-scroll top-[80px] h-[calc(100%_80px)] pb-20 Hide">
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
