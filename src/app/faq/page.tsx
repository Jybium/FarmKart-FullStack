"use client";

import React, { useState } from "react";
import Header from "../components/Header";
import Accordion from "./components/Accordion";
import { GrSearch } from "react-icons/gr";
import Link from "next/link";

const page = () => {
  const [item, setItem] = useState();

  const revealAccordion = (id: any) => {
    setItem(id);
  };

  return (
    <main>
      <Header />
      <h1 className="uppercase text-center font-black tracking-wider text-lg my-5">
        frequently asked questions
      </h1>
      <p className="capitalize text-sm text-center my-5 tracking-wide text-gray-400">
        have questions? we're here to help.
      </p>
      <div className="relative text-center mb-10">
        <div className="absolute bottom-3 left-[27%]  sm:left-[35%] z-30">
          <GrSearch />
        </div>
        <input
          type="text"
          name=""
          id=""
          className="relative sm:w-1/3 w-3/6 m-auto placeholder:text-sm rounded sm:px-14 px-10 bg-[#E6EEE6] ring-gray-900"
          placeholder="Search FAQ"
        />
      </div>

      <Accordion onclick={revealAccordion} open={item} setopen={setItem} />
      <p className="font-bold text-sm capitalize text-center my-10">
        Still got questions? let our team help you.{" "}
        <Link href="/contact-us" className="text-[#005400] ml-1">
          contact us
        </Link>
      </p>
    </main>
  );
};

export default page;
