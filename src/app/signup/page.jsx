"use client";

import Image from "next/image";
import React, { useState } from "react";
import SignUpForm from "@/app/signup/components/SignUpForm";
import Logo from "@/Asset/FARMKART IMAGES/images/landing-page/logo.png";
import { PrimaryButton } from "../components/Buttons";
import Signup from "@/Asset/FARMKART IMAGES/images/sign-up/Sign-up.png";

const page = () => {
  const [modal, setModal] = useState(false);

  const showModal = () => {
    setModal((prev) => !modal);
  };

  return (
    <main className="w-full relative h-full">
      {modal ? (
        <div
          className="fixed w-full top-0 left-0 h-full z-10 bg-slate-transparent backdrop-blur-sm bg-blend-overlay"
          onClick={showModal}
        >
          <div className="h-max flex items-center justify-center content-center sm:w-1/3 w-2/3 m-auto rounded bg-green-100 absolute translate-y-1/4 sm:translate-x-1/4 sm:translate-y-3/4 translate-x-1/4 top-0 left-0 z-20 blur-none shadow-md sm:left-1/4">
            <div className="px-4 py-2 text-sm grid gap-4">
              <div>
                <p className="text-center font-black text-base mb-3">
                  Why Choose a Location?
                </p>
                <div>
                  <p>
                    This will tell ue where you are selling and shopping from.
                  </p>
                  <p>It also means that we can:</p>
                </div>
                <div className="my-2">
                  <p>
                    1. provide more suitable services based on your location.
                  </p>
                  <p>
                    2. Effectively provide data security according to the laws
                    of Nigeria.
                  </p>
                </div>
                <p>
                  Make sure you choose the right state as you proceed with your
                  registration.
                </p>
              </div>
              <div onClick={showModal}>
                <PrimaryButton
                  title="OK"
                  className="rounded-md w-full"
                  type="button"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
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
        <SignUpForm modal={modal} setModal={setModal} showModal={showModal} />
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
