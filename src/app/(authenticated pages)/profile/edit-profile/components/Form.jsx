"use client"

import React from 'react'
import { useForm } from 'react-hook-form'
import Input from "../../../sell-2/components/Input";
import { PrimaryButton, SecondaryButton } from "../../../../components/Buttons";
import Link from "next/link";
import Select from "../../../sell/components/Select";

const Form = () => {
    const {handleSubmit, register, watch, formState:{errors}} = useForm()

    const Submit = (data) =>{

    }

  return (
    <form className="w-full grid sm:gap-7 gap-4 my-5" onClick={handleSubmit(Submit)}>
      <div className="flex flex-col sm:flew-row justify-between sm:gap-5 gap-3">
        <Input title="First Name" placeholder="James" />
        <Input title="Last Name" placeholder="Abel" />
      </div>
      <div className=" flex flex-col sm:flex-row justify-between sm:gap-5 gap-3">
        <Input title="Email Address" placeholder="Jamesabel@outlook.com" />
        <Input title="Phone Number (+234)" placeholder="0806 234 9900" />
      </div>
      <div className="sm:w-1/2 w-full">
        <Select title="Location" name="Location" />
      </div>

      <section className="my-5">
        <p className="font-black text-lg my-5 mt-10">Change Password</p>
        <div className="grid sm:gap-5 gap-3 sm:w-1/2 w-full sm:my-10 my-5">
          <Input
            title="Password"
            placeholder="**************"
            type="password"
          />
          <Input
            title="New Password"
            placeholder="************"
            type="password"
          />
          <Input
            title="Confirm Password"
            placeholder="***********"
            type="password"
          />
        </div>
        <div className="flex gap-1 text-center sm:w-3/6 w-full mx-auto">
          <PrimaryButton title="Save Changes" className="w-full" />
          <SecondaryButton title="Cancel" className="w-full" />
        </div>
      </section>
    </form>
  );
}

export default Form