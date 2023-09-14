import React from "react";
import Link from "next/link";
import Image from "next/image";
import { PrimaryButton } from "../components/Buttons";
import Header from "../components/Header";
import Search from "./components/Search";
import Aside from "./components/Aside";
import "@/app/products/product.css";
import Products from "./components/Products";

const page = () => {
  return (
    <main>
      <Header className="bg-white" />
      <main className="relative h-[calc(100%-80px)] top-[80px] overflow-scroll pb-20 Hide">
        <Search />
        <section className="sm:flex grid w-[90%] mx-auto gap-10">
          <Aside />
          <Products />
        </section>
      </main>
    </main>
  );
};

export default page;
