"use client";

import React from "react";
import Header from "../components/Header";
import { PrimaryButton } from "../components/Buttons";
import Input from "@/app/sell-2/components/Input";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Text } from "../components/Input";
import { BsArrowLeft } from "react-icons/bs";

const page = () => {
  const {
    handleSubmit,
    reset,
    register,
    watch,
    formState: { errors },
  } = useForm();

  return (
    <main className="w-full">
      <Header className="bg-white" />
      <main className="w-5/6 mx-auto py-10 relative overflow-scroll top-[80px] h-[calc(100%-80px)] pb-20 Hide">
        <div className="sm:flex justify-between mx-5">
          <Link href="/sell" className="text-left">
            <p className="flex gap-3 items-center font-black text-[#003800]">
              <span>
                <BsArrowLeft size="26" />
              </span>
              Back
            </p>
          </Link>
          <p className="font-black text-lg text-center mt-3 sm:mt-0">
            Post Product
          </p>
          <p className="hidden sm:block"></p>
        </div>
        <form className="w-full my-10">
          <div className="w-full sm:gap-7 gap-3 grid">
            <div className="flex sm:flex-row flex-col sm:gap-8  gap-3 justify-between w-full">
              <Text
                title="Full Name"
                register={register}
                error={errors}
                name="fullName"
                type="text"
                placeholder="James Abel"
              />
              <Text
                title="Phone Number"
                register={register}
                error={errors}
                name="phoneNumber"
                type="tel"
                placeholder="0806 256 9900"
              />
            </div>
            <div className="flex sm:flex-row flex-col sm:gap-8  gap-3  justify-between">
              <Text
                title="Name Of Product"
                register={register}
                error={errors}
                name="productName"
                type="text"
                placeholder="Mature Goats"
              />
              <Text
                title="Quantity"
                register={register}
                error={errors}
                name="quantity"
                type="number"
                placeholder="80"
              />
            </div>
            <div className="sm:flex-row flex-col flex sm:gap-8 gap-3  justify-between w-full">
              <Text
                title="Color"
                register={register}
                error={errors}
                name="color"
                type="text"
                placeholder="Brown, Black"
              />
              <Text
                title="Weight (Optional)"
                register={register}
                error={errors}
                name="weight"
                type="number"
                placeholder="Weight (Kg)"
              />
            </div>
            <div className="sm:flex-row flex-col flex sm:gap-8 gap-3  justify-between">
              <Text
                title="Price"
                register={register}
                error={errors}
                name="price"
                type="number"
                placeholder="#2, 400.00"
              />
              <Text
                title="Bulk Price"
                register={register}
                error={errors}
                name="bulkPrice"
                type="number"
                placeholder="5 Above"
              />
            </div>
            <span className="flex items-center gap-2 font-black text-sm -mt-2">
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
                {...register("description", { required: true })}
                placeholder="Provide Detailed Description of the Product"
                className="w-full text-sm rounded bg-[#E6EEE6] mt-1"
                rows="8"
                value=""
              ></textarea>
              {errors.description && errors.description.type === "required" && (
                <p>Description is required.</p>
              )}
            </div>
          </div>

          <div className="text-center sm:mt-20 mt-10">
            <PrimaryButton
              title="Submit Product"
              type="button"
              className=" sm:w-1/3 w-3/4 mx-auto text-[15px]"
            />
          </div>
        </form>
        <p className="text-sm sm:mt-4 mt-2 text-center pb-10">
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
