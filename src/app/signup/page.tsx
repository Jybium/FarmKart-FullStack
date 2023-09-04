import Image from "next/image";
import React from "react";
import Logo from "@/Asset/FARMKART IMAGES/images/landing-page/logo.png";
import Signup from "@/Asset/FARMKART IMAGES/images/sign-up/Sign-up.png";
import Link from "next/link";
import { PrimaryButton } from "../components/Buttons";

const page = () => {
  return (
    <main className="w-full">
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
        <section className="w-full">
          <form action="">
            <div className="w-full gap-5 grid">
              <div className="flex gap-3 w-full">
                <label
                  htmlFor="firstName"
                  className="grid text-sm font-bold w-full"
                >
                  First Name
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    className="mt-1 rounded bg-[#E6EEE6] placeholder:text-sm placeholder:font-regular font-regular text-slate-600 w-full "
                    placeholder="James"
                  />
                </label>
                <label
                  htmlFor="lastName"
                  className="grid text-sm font-bold w-full"
                >
                  Last Name
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    className="mt-1 rounded bg-[#E6EEE6] placeholder:text-sm placeholder:font-regular font-regular text-slate-600 w-full"
                    placeholder="Abel"
                  />
                </label>
              </div>
              <div className="flex gap-3 w-full">
                <label
                  htmlFor="emailAddress"
                  className="grid text-sm font-bold w-full"
                >
                  Email Address
                  <input
                    type="email"
                    name="emailAddress"
                    id="emailAddress"
                    className="mt-1 rounded bg-[#E6EEE6] placeholder:text-sm placeholder:font-regular font-regular text-slate-600 w-full "
                    placeholder="jamesabel@outlook.com"
                  />
                </label>
                <label
                  htmlFor="phoneNumber"
                  className="grid text-sm font-bold w-full"
                >
                  Phone Number (+234)
                  <input
                    type="tel"
                    name="phoneNumber"
                    id="phoneNumber"
                    className="mt-1 rounded bg-[#E6EEE6] placeholder:text-sm placeholder:font-normal font-regular text-slate-600 w-full"
                    placeholder="0805 234 0098"
                  />
                </label>
              </div>
              <div className="flex gap-3 w-full">
                <label
                  htmlFor="location"
                  className="grid text-sm font-bold w-full"
                >
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
                  <p className="text-blue-500 mt-1 font-bold text-sm">
                    Why Choose Location?
                  </p>
                </label>
                <label
                  htmlFor="password"
                  className="grid text-sm font-bold w-full"
                >
                  Password
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="mt-1 rounded bg-[#E6EEE6] placeholder:text-sm placeholder:font-regular font-regular text-slate-600 w-full"
                    placeholder="*************"
                  />
                  <p className="text-gray-400 font-bold text-sm mt-1">
                    Minimum of 8 characters.
                  </p>
                </label>
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
        <Image
          src={Signup}
          objectFit="contain"
          objectPosition="center"
          alt="signup image"
          className="w-1/3"
        />
      </main>
    </main>
  );
};

export default page;
