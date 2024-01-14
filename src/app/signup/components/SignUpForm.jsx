"use client";

import React, { useState } from "react";
import notifySuccess from "@/app/utils/notifySuccess"
import { useRouter } from "next/navigation";
import axios from "axios"
import notifyError from "@/app/utils/notifyError"
import { Text } from "@/app/components/Input";
import { Password, Select } from "@/app/components/Input";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { PrimaryButton } from "@/app/components/Buttons";

const SignUpForm = ({ showModal }) => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false)

  // const onsubmit = async (data) => {
  //   // notifySuccess("Button clicked")
  //    try {
  //      axios
  //        .post("/api/auth/register", {...data})
  //        .then((res) => res.data)
  //        .then((result) => {console.log(result)
  //       notifySuccess(result.message)});
  //    } catch (error) {
  //     console.log(error)
  //     notifyError(error)
  //      if (error.response) {
  //        // The request was made and the server responded with a status code
  //        // that falls out of the range of 2xx
  //        const errors = error.response.data;
  //        console.log(errors);
  //        notifySuccess(errors.message);

  //        if (error.response.status === 401) {
  //          notifyError("User already exists");
  //        }
  //      } else if (error.request) {
  //        // The request was made but no response was received
  //        console.log(error.request);
  //        notifyError("No response received from the server");
  //      } else {
  //        // Something happened in setting up the request that triggered an Error
  //        console.log("Error", error.message);
  //        notifyError("Error in setting up the request");
  //      }
  //    }
  // };

  const onsubmit = async (data) => {
    setLoading(true)
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        notifyError(errorData.message);

        // if (response.status === 401) {
        //   notifyError("User already exists");
        // }

        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setLoading(false)
      console.log(result);
      notifySuccess(result.message);
      router.push('/login')
    } catch (error) {
      setLoading(false)
      console.error(error);
      notifyError("An unexpected error occurred");
    } finally {setLoading(false)}
  };

  
  return (
    <section className="w-full relative">
      <form onSubmit={handleSubmit(onsubmit)}>
        <div className="w-full gap-5 grid">
          <div className="grid sm:flex gap-3 w-full">
            <Text
              title="First Name"
              placeholder="James"
              register={register}
              required
              name="firstName"
              error={errors}
            />
            <Text
              title="Last Name"
              placeholder="Abel"
              register={register}
              name="lastName"
              required
              error={errors}
            />
          </div>
          <div className="grid sm:flex gap-3 w-full">
            <Text
              title="Email Address"
              type="email"
              placeholder="jamesabel@outlook.com"
              register={register}
              name="emailAddress"
              required
              error={errors}
            />
            <Text
              title="Phone Number (+234)"
              type="number"
              placeholder="0805 234 0098"
              register={register}
              name="phoneNumber"
              required
              error={errors}
            />
          </div>
          <div className="grid sm:flex gap-3 w-full">
            <Select
              title="Location"
              onclick={showModal}
              register={register}
              error={errors}
              required
              name="location"
            >
              Why Choose Location?
            </Select>
            <Password
              title="Password"
              placeholder="***********"
              register={register}
              required
              name="password"
              error={errors}
            />
          </div>
        </div>
        <p className="text-sm my-5">
          By Signing up, You Agree To Our
          <Link
            href="/term-of-use"
            className="text-[#005400] font-bold text-sm"
          >
            {" "}
            Term of Use
          </Link>
        </p>
        <PrimaryButton type="submit" title="Register" className="w-full" loading={loading}/>
      </form>
      <p className="text-sm text-center mt-2">
        {" "}
        Already Have An Account On FarmKart?
        <Link href="/login" className="text-[#005400] font-bold text-sm">
          {" "}
          Sign In
        </Link>
      </p>
    </section>
  );
};

export default SignUpForm;
