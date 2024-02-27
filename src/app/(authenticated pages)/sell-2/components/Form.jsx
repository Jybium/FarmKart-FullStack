"use client"

import React, { useEffect, useLayoutEffect, useState } from 'react'
import { PrimaryButton } from '@/app/components/Buttons';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Text } from '@/app/components/Input';
import notifyError from '@/app/utils/notifyError';
import notifySuccess from '@/app/utils/notifySuccess';
import { useFetchWithInterceptors } from '@/app/lib/fetch';

const Form = () => {
  const route = useRouter();

  const [images, setImages] = useState([]);
  useLayoutEffect(()=>{
    const imageURL = localStorage.getItem("images");
     const URL = JSON.parse(imageURL)
    setImages(URL)
  }, [])


  //  useEffect(() => {
  //    const retrieveImagesFromLocalStorage = () => {
  //      const images = [];

  //      // Iterate over localStorage keys
  //      for (let i = 0; i < localStorage.length; i++) {
  //        const key = localStorage.key(i);

  //        // Check if the key starts with "image_"
  //        if (key.startsWith("image_")) {
  //          // Extract the image URL from localStorage
  //          const imageURL = localStorage.getItem(key);
  //          const URL = JSON.parse(URL)

  //          images.push(URL);
  //        }
  //      }

  //      // Join images with commas
  //      const commaSeparatedImages = images.join("-");
  //      return commaSeparatedImages;
  //    };

  //    // Retrieve comma-separated images from localStorage
  //    const retrievedImages = retrieveImagesFromLocalStorage();

  //    // Set the retrieved images to state
  //    setImages(retrievedImages);
  //  }, []);

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

  // const result = useFetchWithInterceptors("/api/create-product", {
  //   method: "POST",
  //   body: JSON.stringify(data),
  // });

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
     images.forEach((imageBlob) => {
       formData.append("image", imageBlob);
     });
     

      console.log(images)

      const response = await fetch("http://localhost:3000/api/create", {
        method: "POST",
        body: formData,
        "content-type": "multipart/form-data",
      });


      if (response.ok) {
        const result = await response.json();
        console.log(result);
        notifySuccess(result.message);
        deleteImagesFromLocalStorage();
        if (
          result.message === "Bad request" ||
          "Unauthorized. Make sure you are signed in!"
        )
          route.push("/login");
      } else {
        notifyError("An unexpected error occurred");
      }
    } catch (error) {
      console.log(error);
      notifyError("An unexpected error occurred");
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
            {...register("negotiable", { required: true })}
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
          title="Submit Product"
          type="submit"
          className=" sm:w-1/3 w-3/4 mx-auto text-[15px]"
        />
      </div>
    </form>
  );
}

export default Form