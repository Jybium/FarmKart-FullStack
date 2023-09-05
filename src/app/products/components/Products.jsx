import React from "react";
import Image from "next/image";
// import Link from "next/link";
import "../product.css";
import { Categories } from "@/Constants/Offers";
import { PrimaryButton } from "@/app/components/Buttons";
import { GrAdd } from "react-icons/gr";

const Category = ({ category }) => {
  return (
    <div className="grid w-full mx-auto text-center gap-1">
      <div className="w-[70px] h-[70px]">
        <Image
          src={category.image}
          objectFit="cover"
          objectPosition="center"
          alt="category image"
          className="rounded-full w-[70px] h-[70px] block border-[1px] border-black"
        />
      </div>

      <p className="text-sm font-bold">{category.name}</p>
    </div>
  );
};

const Product = () => {
  return (
    <div className="bg-[#E6EEE6]">
      <div>
        <Image />
      </div>
      <div>
        <p className="font-bold text-sm"></p>
        <p className="font-black "></p>
        <p className="text-sm text-slate-300">
          <span className="font-bold">Sold By: </span> <span>Samuel</span>
        </p>
      </div>
      <PrimaryButton title="Add to cart" type="button" />
    </div>
  );
};

const Products = () => {
  return (
    <main className="w-3/4">
      <section className="flex justify-between gap-5 overflow-auto w-full Hide">
        {Categories.map((category) => (
          <Category category={category} key={category.id} />
        ))}
      </section>
      <section className="">
        <p className="text-[#003800] font-bold my-5">Most Popular</p>
      </section>
    </main>
  );
};

export default Products;
