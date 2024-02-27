"use client";

import Image from "next/image";
import React, { useState, Suspense } from "react";
import Logo from "@/Asset/FARMKART IMAGES/images/landing-page/logo.png";
import Login from "@/Asset/FARMKART IMAGES/images/sign-in/amico.png";
import { PrimaryButton } from "../../components/Buttons";
import Link from "next/link";
import { PasswordLogin, Text } from "../../components/Input";
import { useForm } from "react-hook-form";

import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

import notifySuccess from "../../utils/notifySuccess";
import notifyError from "../../utils/notifyError";
import { Spinner } from "flowbite-react";
import { useAuth } from "@/app/Context/AuthContext";


const page = () => {
  const router = useRouter();
  const {setUser} = useAuth()
  const searchParams = useSearchParams()
  
  const redirect = searchParams.get('redirect')
  const [loading, setLoading] = useState(false)
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm();

   const onSubmit = async (data) => {
     setLoading(true);
     try {
       const response = await fetch("/api/auth/login", {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify(data),
       });

       if (!response.ok) {
         const errorData = await response.json();
         console.log(errorData);
         if(errorData.message === "User not found" ) {
          router.push("/signup")
         }
         notifyError(errorData.message);

        //  if (response.status === 401) {
        //    notifyError("User not found");
        //  }

         throw new Error(`HTTP error! Status: ${response.status}`);
       }

       const result = await response.json();
       setLoading(false);
      //  console.log(result);
       notifySuccess(result.message);
       setUser(result.data.user)
       router.replace(redirect || "/products");
     } catch (error) {
       setLoading(false);
       console.error(error);
       notifyError("An unexpected error occurred");
     } finally {
       setLoading(false);
     }
   };

  return (
    <Suspense fallback={<Spinner />}>
      <main>
        <header className="text-center">
          <Image
            src={Logo}
             
             
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
              <PrimaryButton
                title="Sign In"
                type="submit"
                className="w-full"
                loading={loading}
              />
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
             
             
            className="w-[450px] sm:block hidden"
          />
        </div>
      </main>
    </Suspense>
  );
};

export default page;
