

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/Asset/FARMKART IMAGES/images/landing-page/logo.png";
import { PrimaryButton } from "../../components/Buttons";
import Form from "./components/Form"
import Resend from "./components/Resend"

const page = () => {



  return (
    <main>
      <header>
        <Image
          src={Logo}
          objectFit="contain"
          objectPosition="center"
          alt="company logo"
          className="text-center m-auto"
        />
      </header>
      <main className="mb-10 w-[40%] mx-auto text-center">
        <div className="grid gap-3 mt-9">
          <h1 className="capitalize text-lg font-black">Verify your email</h1>
          <p className="text-sm">
            Enter the 6-digits code sent to{" "}
            <span className="text-blue-400 font-bold">
              jamesabel@outlook.com
            </span>
          </p>
        </div>
        <form className="">
         <Form/>
          <PrimaryButton
            type="submit"
            className="w-8/12 m-auto mb-2 text-sm "
            title="Verify"
          />
        </form>
        <p className="text-sm grid grid-flow-col justify-center gap-2">
          Didn't receive a code?{" "}
          <Resend/>
        </p>
      </main>
    </main>
  );
};

export default page;






