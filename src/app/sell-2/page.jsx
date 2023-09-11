import React from "react";
import Header from "../components/Header";
import { PrimaryButton } from "../components/Buttons";
import Input from "@/app/sell-2/components/Input";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";

const page = () => {
  return (
    <main className="w-full">
      <Header />
      <main className="w-5/6 mx-auto my-10">
        <div className="flex justify-between mx-5">
          <Link href="/sell">
            <p className="flex gap-3 items-center font-black text-[#003800]">
              <span>
                <BsArrowLeft size="26" />
              </span>
              Back
            </p>
          </Link>
          <p className="font-black text-lg">Post Product</p>
          <p></p>
        </div>
        <form action="" className="w-full my-10">
          <div className="w-full gap-7 grid">
            <div className="flex gap-8 justify-between">
              <Input title="Full Name" placeholder="James Abel" />
              <Input
                title="Phone Number"
                placeholder="0806 234 9900"
                type="tel"
              />
            </div>
            <div className="flex gap-8 justify-between">
              <Input title="Name of Product" placeholder="Matured Goat" />
              <Input title="Quantity" placeholder="40" type="number" />
            </div>
            <div className="flex gap-8 justify-between">
              <Input title="Color" placeholder="brown, black" />
              <Input
                title="Weight (Optional)"
                placeholder="Weight (kg)"
                type="number"
              />
            </div>
            <div className="flex gap-8 justify-between">
              <Input title="Price" placeholder="#24,000" />
              <Input title="Bulk Price" placeholder="5 above" type="number" />
            </div>
            <span className="flex items-center gap-2 font-black text-sm -mt-6">
              <input type="checkbox" name="" id="" className="rounded" />{" "}
              Negotiable
            </span>
            <div>
              <label htmlFor="description" className="text-sm font-black">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                cols="30"
                placeholder="Provide Detailed Description of the Product"
                className="w-full text-sm rounded bg-[#E6EEE6] mt-1"
                rows="8"
                value=""
              ></textarea>
            </div>
          </div>

          <div className="text-center mt-20">
            <PrimaryButton
              title="Submit Product"
              type="button"
              className=" w-1/3 mx-auto text-[15px]"
            />
          </div>
        </form>
        <p className="text-sm mt-4 text-center">
          By Clicking on submit product, you accept the{" "}
          <Link
            href="/term-of-use"
            className="font-bold text-[#003800] text-center"
          >
            Terms of Use
          </Link>
          .
        </p>
      </main>
    </main>
  );
};

export default page;
