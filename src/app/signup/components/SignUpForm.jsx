"use client";

import React, { useState, useEffect } from "react";
import notifySuccess from "@/app/utils/notifySuccess"
import axios from "axios"
import notifyError from "@/app/utils/notifyError"
import { Text } from "@/app/components/Input";
import { Password, Select } from "@/app/components/Input";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { PrimaryButton } from "@/app/components/Buttons";

const SignUpForm = ({ showModal }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onsubmit = (data) => {
    notifySuccess("Button clicked")
    console.log(data);
     try {
       axios
         .post("/api/auth/register", {...data})
         .then((res) => res.data)
         .then((result) => console.log(result));
     } catch (error) {
       console.log(error);
     }
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
        <PrimaryButton type="submit" title="Register" className="w-full" />
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
