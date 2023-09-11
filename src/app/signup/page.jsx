import Image from "next/image";
import React from "react";
import SignUpForm from "@/app/signup/components/SignUpForm";
import Logo from "@/Asset/FARMKART IMAGES/images/landing-page/logo.png";
import Signup from "@/Asset/FARMKART IMAGES/images/sign-up/Sign-up.png";

const page = () => {
  return (
    <main className="w-full relative">
      <header className="text-center">
        <Image
          src={Logo}
          objectFit="contain"
          objectPosition="center"
          alt="company logo"
          className="text-center m-auto"
        />

        <div className="">
          <h2 className="font-bold tracking-wider">
            Get Started With FarmKart!
          </h2>
          <p className="text-sm">Registration is free and swift!</p>
        </div>
      </header>
      <main className="flex items-center content-center w-5/6 mx-auto justify-between my-10 gap-4">
        <SignUpForm />
        <Image
          src={Signup}
          objectFit="contain"
          objectPosition="center"
          alt="signup image"
          className="w-1/3 hidden sm:block"
        />
      </main>
    </main>
  );
};

export default page;
