import React from "react";
import Link from "next/link"
import Header from "../../components/Header";
import { PrimaryButton } from "../../components/Buttons";
import Select from "./components/Select";
import { Categories } from "@prisma/client";
import {Category} from "../../lib/enums"
import AddingImage from "./components/AddingImage";




const page = () => {
  
  return (
    <main className="w-full">
      <Header className="bg-white" />
      <main className="w-5/6 m-auto py-10 relative overflow-scroll top-[80px] h-[calc(100%-80px)] Hide pb-28">
        <h1 className="font-black text-lg text-center">Sell Your Products</h1>
        <form className="w-full">
          <div className="w-full flex sm:flex-row flex-col justify-between my-5 mt-8 sm:gap-10 gap-3">
            <Select title="LiveStock" name="Category" data={Category}/>
            <Select title="Select Location" name="Location" />
          </div>
          <AddingImage />
          <Link href="/sell-2" className="text-center mt-20">
            <PrimaryButton
              title="Next"
              type="button"
              className=" sm:w-1/3 w-1/2 mx-auto"
            />
          </Link>
        </form>
      </main>
    </main>
  );
};

export default page;
