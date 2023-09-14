import React from "react";
import Header from "../../components/Header";
import Image from "next/image";
import Input from "../../sell-2/components/Input";
import { PrimaryButton, SecondaryButton } from "../../components/Buttons";
import Profile from "@/Asset/FARMKART IMAGES/images/profile-image.jpg";
import Link from "next/link";
import Select from "@/app/sell/components/Select";

const page = () => {
  return (
    <main>
      <Header className="bg-white" />
      <main className="w-5/6 mx-auto py-10 relative top-[80px] h-[calc(100%-80px)] overflow-scroll pb-20 Hide">
        <h1 className="font-black text-lg my-4">My Profile</h1>
        <section className="flex items-center justify-between my-5">
          <div className="flex items-center gap-4">
            <Image
              src={Profile}
              objectFit="contain"
              objectPosition="center"
              className="rounded-full w-16 h-16"
            />
            <p className="font-black">James Abel</p>
          </div>
          <Link
            href="/products"
            className="text-[#003800] font-black sm:tracking-wide sm:text-base text-sm"
          >
            Back To HomePage
          </Link>
        </section>
        <section className="w-full">
          <form className="w-full grid sm:gap-7 gap-4 my-5">
            <div className="flex flex-col sm:flew-row justify-between sm:gap-5 gap-3">
              <Input title="First Name" placeholder="James" />
              <Input title="Last Name" placeholder="Abel" />
            </div>
            <div className=" flex flex-col sm:flex-row justify-between sm:gap-5 gap-3">
              <Input
                title="Email Address"
                placeholder="Jamesabel@outlook.com"
              />
              <Input title="Phone Number (+234)" placeholder="0806 234 9900" />
            </div>
            <div className="sm:w-1/2 w-full">
              <Select title="Location" name="Location" />
            </div>
          </form>
        </section>
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
      </main>
    </main>
  );
};

export default page;
