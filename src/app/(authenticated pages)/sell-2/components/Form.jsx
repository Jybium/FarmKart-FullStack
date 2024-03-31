"use client";

import React, { useEffect, useLayoutEffect, useState } from "react";
import { PrimaryButton } from "@/app/components/Buttons";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Text } from "@/app/components/Input";
import notifyError from "@/app/utils/notifyError";
import notifySuccess from "@/app/utils/notifySuccess";
import { useFetchWithInterceptors } from "@/app/lib/fetch";

const Form = () => {
  const route = useRouter();

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  useLayoutEffect(() => {
    const imageURL = localStorage.getItem("images");
    const URL = JSON.parse(imageURL);
    setImages(URL);
  }, []);

  const deleteImagesFromLocalStorage = () => {
    localStorage.removeItem("images");
    localStorage.removeItem("location");
    localStorage.removeItem("category");
  };

  const returned_location =
    typeof window !== "undefined" ? localStorage.getItem("location") : null;
  const location = returned_location ? JSON.parse(returned_location) : null;

  const returned_category =
    typeof window !== "undefined" ? localStorage.getItem("category") : null;
  const category = returned_category ? JSON.parse(returned_category) : null;

  const {
    handleSubmit,
    reset,
    register,
    watch,
    formState: { errors },
  } = useForm();

  const submit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("fullName", data.fullName);
      formData.append("phoneNumber", data.phoneNumber);
      formData.append("productName", data.productName);
      formData.append("Quantity", +data.quantity);
      formData.append("color", data.color);
      formData.append("weight", +data.weight);
      formData.append("price", +data.price);
      formData.append("bulkPrice", +data.bulkPrice);
      formData.append("negotiable", data.negotiable);
      formData.append("description", data.description);
      formData.append("category", category);
      formData.append("location", location);
      formData.append("slug", data.productName.replace(" ", "-"));

      let concatenatedValues = "";

      images.forEach((imageBlob, index) => {
     
        concatenatedValues += `${imageBlob}|`;
      });

      formData.append("image", concatenatedValues);

      setLoading(true);

      const response = await fetch("/api/create-product", {
        method: "POST",
        body: formData,
        "content-type": "multipart/form-data",
      });
      if (response.ok) {
        const result = await response.json();

        notifySuccess(result.message);
        deleteImagesFromLocalStorage();
        setLoading(false);
        route.push("/products")
      } else {
        notifyError("An unexpected error occurred");
        setLoading(false);
      }
    } catch (error) {
      notifyError("An unexpected error occurred", error);
    }finally{
      setLoading(false);
     
    }
  };

  return (
    <form
      className="w-full my-10"
      onSubmit={handleSubmit(submit)}
      encType="multitype/form-data"
    >
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
          <input
            type="checkbox"
            {...register("negotiable")}
            name="negotiable"
            id="negotiable"
            className="rounded"
          />{" "}
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
            // value={}
          ></textarea>
          {errors.description && errors.description.type === "required" && (
            <p>Description is required.</p>
          )}
        </div>
      </div>

      <div className="text-center sm:mt-20 mt-10">
        <PrimaryButton
        loading={loading}
          title="Submit Product"
          type="submit"
          className=" sm:w-1/3 w-3/4 mx-auto text-[15px]"
        />
      </div>
    </form>
  );
};

export default Form;
