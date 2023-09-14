"use client";

import Image from "next/image";
import React from "react";
import Logo from "@/Asset/FARMKART IMAGES/images/landing-page/logo.png";
import Login from "@/Asset/FARMKART IMAGES/images/sign-in/amico.png";
import { PrimaryButton } from "../components/Buttons";
import Link from "next/link";
import { PasswordLogin, Text } from "../components/Input";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

const page = () => {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(register);
  };

  return (
    <main>
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
        <form onSubmit={handleSubmit(onSubmit)} className="sm:w-1/2 w-full">
          <div className="grid gap-3 w-full">
            <Text
              title="Email or Phone Number"
              type="email"
              placeholder="jamesabel@outlook.com"
              register={register}
              name="emailAddress"
              error={errors}
              required
            />
            <PasswordLogin
              title="Password"
              placeholder="*************"
              register={register}
              name="password"
              error={errors}
            />
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
          className="w-[450px] sm:block hidden"
        />
      </div>
    </main>
  );
};

export default page;
