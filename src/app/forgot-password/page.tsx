import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "@/Asset/FARMKART IMAGES/images/landing-page/logo.png";
import Forgot from "@/Asset/FARMKART IMAGES/images/forgot-password/cuate.png";
import { PrimaryButton } from "../components/Buttons";

const page = () => {
  return (
    <main>
      <header>
        <Image
          src={Logo}
          objectFit="contain"
          objectPosition="center"
          alt="company logo"
          className="text-center m-auto my-2"
        />
      </header>
      <main className="w-5/6 mx-auto flex items-center justify-between my-5">
        <section className="w-1/2 text-center">
          <div className="capitalize text-center mb-8 grid gap-3">
            <h1 className="font-black text-lg ">forgot password?</h1>
            <p className="text-sm">
              Input Your registered email address to receive a verification
              code.
            </p>
          </div>
          <form action="">
            <label
              htmlFor="emailorphonenumber"
              className="grid text-sm font-bold w-full text-left"
            >
              Email or Phone Number
              <input
                type="text"
                name="emailorphonenumber"
                id="emailorphonenumber"
                className="mt-1 rounded bg-[#E6EEE6] placeholder:text-sm placeholder:font-regular font-regular text-slate-600 w-full mb-3"
                placeholder="jamesabel@outlook.com"
              />
            </label>
            <PrimaryButton
              title="Send Code"
              type="submit"
              className="w-full mt-3 mb-1"
            />
          </form>
          <Link
            href="/login"
            className="text-green-800 font-bold text-sm text-center"
          >
            Back to Sign In
          </Link>
        </section>
        <Image
          src={Forgot}
          objectFit="contain"
          objectPosition="center"
          alt="company logo"
          className="w-1/3"
        />
      </main>
    </main>
  );
};

export default page;
