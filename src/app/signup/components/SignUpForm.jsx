"use client";

import React, { useState, useEffect } from "react";
import { Text } from "@/app/components/Input";
import { Password } from "@/app/components/Input";
import Select from "@/app/components/Select";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { PrimaryButton } from "@/app/components/Buttons";

const SignUpForm = () => {
  // STATE FOR THE MODAL
  const [modal, setModal] = useState(false);
  const showModal = () => {
    setModal((prev) => !modal);
  };
  return (
    <section className="w-full relative">
      {modal ? (
        <div className=" absolute w-screen top-0 left-0 h-screen z-10 bg-green-50">
          <div className="h-1/2 grid items-center content-center w-1/2 mx-auto rounded bg-green-100">
            <div>
              <div>
                <p>Why Choose a Location?</p>
                <div>
                  <p>
                    This will tell ue where you are selling and shopping from.
                  </p>
                  <p>It also means that we can:</p>
                </div>
                <div>
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
      <form>
        <div className="w-full gap-5 grid">
          <div className="grid sm:flex gap-3 w-full">
            <Text title="First Name" placeholder="James" />
            <Text title="Last Name" placeholder="Abel" />
          </div>
          <div className="grid sm:flex gap-3 w-full">
            <Text
              title="Email Address"
              type="email"
              placeholder="jamesabel@outlook.com"
            />
            <Text
              title="Phone Number (+234)"
              type="tel"
              placeholder="0805 234 0098"
            />
          </div>
          <div className="grid sm:flex gap-3 w-full">
            <label htmlFor="location" className="grid text-sm font-bold w-full">
              Location
              {/* <input
                    type="text"
                    name="emailorphonenumber"
                    id="emailorphonenumber"
                    className="mt-1 rounded bg-[#E6EEE6] placeholder:text-sm placeholder:font-regular font-regular text-slate-600 w-full "
                    placeholder="jamesabel@outlook.com"
                  /> */}
              <select
                name="location"
                id="location"
                className="mt-1 rounded bg-[#E6EEE6] placeholder:text-sm placeholder:font-regular font-regular text-slate-600 w-full text-sm"
              >
                <option value="default" className="text-sm">
                  Select Location
                </option>
              </select>
              <p
                className="text-blue-500 mt-1 font-bold text-sm"
                onClick={showModal}
              >
                Why Choose Location?
              </p>
            </label>
            <Password title="Password" placeholder="***********" />
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
      </form>
      <PrimaryButton type="submit" title="Register" className="w-full" />
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
