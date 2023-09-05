import React from "react";
import Link from "next/link";
import Image from "next/image";
import { PrimaryButton } from "../components/Buttons";
import Header from "../components/Header";
import Search from "./components/Search";
import Aside from "./components/Aside";
import Products from "./components/Products";

const page = () => {
  return (
    <main>
      <Header />
      <Search />
      <section className="flex w-[90%] mx-auto gap-10">
        <Aside />
        <Products />
      </section>
    </main>
  );
};

export default page;
