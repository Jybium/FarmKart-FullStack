import React from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/Asset/FARMKART IMAGES/images/landing-page/logo.png";
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
          className="text-center m-auto"
        />
      </header>
      <main className="text-center w-1/2 mx-auto mb-12">
        <div className="grid gap-3 my-5">
          <h1 className="capitalize font-black text-lg">new password</h1>
          <p>Enter a new password to complete the process</p>
        </div>
        <form action="">
          <div className="grid gap-4 my-3">
            <label
              htmlFor="password"
              className="grid text-sm font-bold text-left"
            >
              Password
              <input
                type="password"
                name="password"
                id="password"
                className="mt-1 rounded bg-[#E6EEE6] placeholder:text-sm placeholder:font-regular font-regular text-slate-600 mb-1 w-full"
                placeholder="*************"
              />
              <p className="text-slate-300 font-bold text-sm text-left">
                Minimum of 8 characters
              </p>
            </label>
            <label
              htmlFor="confirmpassword"
              className="grid text-sm font-bold text-left"
            >
              Confirm Password
              <input
                type="password"
                name="confirmpassword"
                id="confirmpassword"
                className="mt-1 rounded bg-[#E6EEE6] placeholder:text-sm placeholder:font-regular font-regular text-slate-600 mb-3 w-full"
                placeholder="*************"
              />
            </label>
          </div>
          <PrimaryButton
            title="Reset Password"
            type="submit"
            className="w-full mb-2"
          />
        </form>
        <Link
          href="/login"
          className="text-green-800 font-bold text-sm text-center"
        >
          Back to Sign In
        </Link>
      </main>
    </main>
  );
};

export default page;
