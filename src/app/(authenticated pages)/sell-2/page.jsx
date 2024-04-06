
import React from "react";
import Header from "../../components/Header"
import Form from "./components/Form"

import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";



const page = () => {
  
  
  return (
    <main className="w-full">
      <Header className="bg-white" />
      <main className="w-5/6 mx-auto py-10 relative overflow-scroll top-[80px] h-[calc(100%-80px)] pb-20 Hide">


        <div className="sm:flex justify-between mx-5">
          <Link href="/sell" className="text-left">
            <p className="flex gap-3 items-center font-black text-[#003800]">
              <span>
                <BsArrowLeft size="26" />
              </span>
              Back
            </p>
          </Link>
          <p className="font-black text-lg text-center mt-3 sm:mt-0">
            Post Product
          </p>
          <p className="hidden sm:block"></p>
        </div>
        
       <Form/>


        <p className="text-sm sm:mt-4 mt-2 text-center pb-10">
          By Clicking on submit product, you accept the{" "}
          <Link
            href="/term-of-use"
            className="font-bold text-[#003800] text-center"
          >
            Terms of Use
          </Link>
          .
        </p>


      </main>
    </main>
  );
};

export default page;
