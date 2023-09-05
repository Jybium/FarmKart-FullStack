import Image from "next/image";
import React from "react";
import Header from "../components/Header";
import contact from "@/Asset/FARMKART IMAGES/images/contact-us/amico.svg";
import { PrimaryButton } from "../components/Buttons";

const page = () => {
  return (
    <main>
      <Header />
      <section className="mt-5">
        <div className="text-center">
          <h1 className="capitalize">Get in touch with us</h1>
          <div className="grid grid-flow-col w-2/5 mx-auto mt-5 text-center">
            <p>
              Direct Call:{" "}
              <span className="text-[#005400] font-bold">
                (+234- 085 -234 - 6655)
              </span>
            </p>
            <p>
              Email:{" "}
              <span className="text-[#005400] font-bold">
                info@farmkart.com
              </span>
            </p>
          </div>
        </div>
      </section>
      <p className="font-bold text-center my-5">OR</p>
      <section className="flex items-center justify-between w-[85%] mx-auto my-10">
        <div>
          <h1 className="my-5 font-black">
            Fill out this form for swift response
          </h1>
          <form action="" className="w-full">
            <div className="grid gap-6 mb-3">
              <label htmlFor="fullName" className="grid text-sm font-bold">
                Full Name
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  className="mt-1 rounded bg-[#E6EEE6] placeholder:text-sm placeholder:font-regular font-regular text-slate-600"
                  placeholder="Enter Your Full Name"
                />
              </label>
              <label htmlFor="emailAddress" className="grid text-sm font-bold">
                Email Address
                <input
                  type="email"
                  name="emailAddress"
                  id="emailAddress"
                  className="mt-1 rounded bg-[#E6EEE6] placeholder:text-sm text-slate-600"
                  placeholder="Enter Your Email Address"
                />
              </label>
              <label htmlFor="subject" className="grid text-sm font-bold">
                Subject
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  className="mt-1 rounded bg-[#E6EEE6] placeholder:text-sm text-slate-600"
                  placeholder="Enter Your Message Subject"
                />
              </label>
              <label htmlFor="message" className="grid text-sm font-bold">
                Message
                <textarea
                  name="message"
                  id="message"
                  cols="50"
                  rows="4"
                  className="mt-1 rounded bg-[#E6EEE6] placeholder:text-sm text-slate-600"
                  placeholder="Enter Your Message"
                ></textarea>
              </label>
            </div>
            <div className="w-full">
              <PrimaryButton
                title="Send Message"
                type="submit"
                className="w-full"
              />
            </div>
          </form>
        </div>
        <div>
          <Image
            src={contact}
            objectFit="contain"
            objectPosition="center"
            alt="contact us image"
          />
        </div>
      </section>
    </main>
  );
};

export default page;
