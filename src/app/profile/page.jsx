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
              <Input title="Phone Number (+234)" placeholder="0806 234 9900" />
              <Input title="Location" placeholder="Lagos" />
            </div>
          </form>
          <div className="text-center mt-28">
            <PrimaryButton title="Edit Profile" className="w-1/3 mx-auto" />
          </div>
        </section>
      </main>
    </main>
  );
};

export default page;
