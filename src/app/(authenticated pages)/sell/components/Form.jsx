"use client"

import React from 'react'
import Select from './Select';
import { Categories } from '@prisma/client';
import { useForm } from 'react-hook-form';
import AddingImage from './AddingImage';
import { PrimaryButton } from '@/app/components/Buttons';
import {  statesNigeria } from "../../../lib/enums";
// import {fetchUserRoles} from "../../../lib/category"

import { useRouter } from 'next/navigation';

const { LIVESTOCK, CROPS, FARM_SUPPLEMENT, OTHER_CATEGORIES } = Categories;


const Form = () => {

    const {register, handleSubmit, watch, formState:{errors}} = useForm();

    const route = useRouter()

  const enumValues = [LIVESTOCK, CROPS, FARM_SUPPLEMENT, OTHER_CATEGORIES]


  const submit = (data) =>{

    localStorage.setItem("category", JSON.stringify(data.Category))
    localStorage.setItem("location", JSON.stringify(data.Location))

    route.push("/sell-2")

  }

  return (
    <form className="w-full" onSubmit={handleSubmit(submit)}>
      <div className="w-full flex sm:flex-row flex-col justify-between my-5 mt-8 sm:gap-10 gap-3">
        <Select
          register={register}
          error={errors}
          title="LiveStock"
          name="Category"
          categories={enumValues}
        />
        <Select
          register={register}
          error={errors}
          title="Select Location"
          name="Location"
          categories={statesNigeria}
        />
      </div>
      <AddingImage />
     
        <PrimaryButton
          title="Next"
          type="submit"
          className=" sm:w-1/3 w-1/2 mx-auto text-center mt-20"
        />
      
    </form>
  );
}

export default Form