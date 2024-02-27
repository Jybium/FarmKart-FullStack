"use client";

import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import React from "react";
import Logo from "@/Asset/FARMKART IMAGES/images/landing-page/logo.png";
import Forgot from "@/Asset/FARMKART IMAGES/images/forgot-password/cuate.png";
import { PrimaryButton } from "../../components/Buttons";
import { Text } from "../../components/Input";

const page = () => {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <main>
      <header>
        <Image
          src={Logo}
           
           
          alt="company logo"
          className="text-center m-auto my-2"
        />
      </header>
      <main className="w-5/6 mx-auto flex items-center justify-between my-5">
        <section className="sm:w-1/2 w-full text-center">
          <div className="capitalize text-center mb-8 grid gap-3">
            <h1 className="font-black text-lg ">forgot password?</h1>
            <p className="text-sm">
              Input Your registered email address to receive a verification
              code.
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Text
              title="Email or Phone Number"
              placeholder="jamesabel@outlook.com"
              type="email"
              register={register}
              error={errors}
              name="emailAddress"
            />
            <Link href="/reset-password">
            <PrimaryButton
              title="Send Code"
              type="submit"
              className="w-full mt-3 mb-1"
              />
              </Link>
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
           
           
          alt="company logo"
          className="w-1/3 hidden sm:block"
        />
      </main>
    </main>
  );
};

export default page;
