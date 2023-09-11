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
      <Header />
      <main className="w-5/6 mx-auto my-10">
        <h1 className="font-black text-lg my-4">My Profile</h1>
        <section className="flex justify-between my-5">
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
            className="text-[#003800] font-black tracking-wide"
          >
            Back To HomePage
          </Link>
        </section>
        <section>
          <form action="" className="w-full grid gap-7 my-5">
            <div className="flex justify-between gap-5">
              <Input title="First Name" placeholder="James" />
              <Input title="Last Name" placeholder="Abel" />
            </div>
            <div className="flex justify-between gap-5">
              <Input
                title="Email Address"
                placeholder="Jamesabel@outlook.com"
              />
              <Input title="Phone Number (+234)" placeholder="0806 234 9900" />
            </div>
            <div className="w-1/2">
              <Select title="Location" name="Location" />
            </div>
          </form>
        </section>
        <section className="my-5">
          <p className="font-black text-lg my-5 mt-10">Change Password</p>
          <div className="grid gap-5 w-1/2 my-10">
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
          <div className="flex gap-1 text-center w-3/6 mx-auto">
            <PrimaryButton title="Save Changes" className="w-full" />
            <SecondaryButton title="Cancel" className="w-full" />
          </div>
        </section>
      </main>
    </main>
  );
};

export default page;
