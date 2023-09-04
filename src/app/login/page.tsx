import Image from "next/image";
import React from "react";
import Logo from "@/Asset/FARMKART IMAGES/images/landing-page/logo.png";
import Login from "@/Asset/FARMKART IMAGES/images/sign-in/amico.png";
import { PrimaryButton } from "../components/Buttons";
import Link from "next/link";

const page = () => {
  return (
    <main className="w-ful">
      <header className="text-center">
        <Image
          src={Logo}
          objectFit="contain"
          objectPosition="center"
          alt="company logo"
          className="text-center m-auto"
        />

        <div className="">
          <h2>Hello, Welcome Back</h2>
          <p>Input Your Details And Sign in To Enjoy FarmKart</p>
        </div>
      </header>
      <div className="flex items-center content-center justify-between w-5/6 mx-auto my-10">
        <form action="" className="w-1/2">
          <div className="grid gap-3 w-full">
            <label
              htmlFor="emailorphonenumber"
              className="grid text-sm font-bold w-full"
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
            <label htmlFor="password" className="grid text-sm font-bold">
              Password
              <input
                type="password"
                name="password"
                id="password"
                className="mt-1 rounded bg-[#E6EEE6] placeholder:text-sm placeholder:font-regular font-regular text-slate-600 mb-3 w-full"
                placeholder="*************"
              />
              <p className="text-[#005400] font-bold text-sm text-right">
                Forgot Password?
              </p>
            </label>
          </div>
          <div className="my-3">
            <PrimaryButton title="Sign In" type="submit" className="w-full" />
          </div>
          <p className="text-sm text-center">
            New To FarmKart?{" "}
            <Link href="/signup">
              <span className="text-[#005400] font-bold">Regsiter.</span>
            </Link>
          </p>
        </form>
        <Image
          src={Login}
          alt="signin image"
          objectFit="contain"
          objectPosition="center"
          className="w-[450px]"
        />
      </div>
    </main>
  );
};

export default page;
