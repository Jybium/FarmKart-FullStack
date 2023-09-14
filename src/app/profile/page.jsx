import React from "react";
import Header from "../components/Header";
import Image from "next/image";
import Input from "../sell-2/components/Input";
import { PrimaryButton } from "../components/Buttons";
import Profile from "@/Asset/FARMKART IMAGES/images/profile-image.jpg";
import Link from "next/link";

const page = () => {
  return (
    <main>
      <Header className="bg-white" />
      <main className="w-5/6 mx-auto py-10 relative h-[calc(100%-80px)] overflow-scroll Hide">
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
            href="products"
            className="text-[#003800] font-black sm:tracking-wide text-sm sm:text-base"
          >
            Back To HomePage
          </Link>
        </section>

        <form className="w-full grid sm:gap-7 gap-4 my-5">
          <div className="flex sm:flex-row flex-col justify-between gap-5 w-full">
            <Input title="First Name" placeholder="James" />
            <Input title="Last Name" placeholder="Abel" />
          </div>
          <div className="flex sm:flex-row flex-col w-full justify-between gap-5 ">
            <Input title="Phone Number (+234)" placeholder="0806 234 9900" />
            <Input title="Location" placeholder="Lagos" />
          </div>
        </form>
        <div className="text-center sm:mt-28 mt-8">
          <PrimaryButton
            title="Edit Profile"
            className="sm:w-1/3 w-1/2 mx-auto"
          />
        </div>
      </main>
    </main>
  );
};

export default page;
