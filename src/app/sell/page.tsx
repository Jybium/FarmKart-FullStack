import React from "react";
import Header from "../components/Header";
import { PrimaryButton } from "../components/Buttons";
import Select from "./components/Select";
import AddingImage from "@/app/sell/components/AddingImage";

const page = () => {
  return (
    <main className="w-full">
      <Header />
      <main className="w-5/6 m-auto my-10">
        <h1 className="font-black text-lg text-center">Sell Your Products</h1>
        <form action="">
          <div className="w-full flex justify-between my-5 mt-8 gap-10">
            <Select title="LiveStock" name="Category" />
            <Select title="Select Location" name="Location" />
          </div>
          <AddingImage />
          <div className="text-center mt-20">
            <PrimaryButton
              title="Next"
              type="button"
              className=" w-1/3 mx-auto"
            />
          </div>
        </form>
      </main>
    </main>
  );
};

export default page;
