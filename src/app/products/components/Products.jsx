import React from "react";
import Image from "next/image";
// import Link from "next/link";
import { product } from "@/Constants/Offers";
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

const Product = ({ product }) => {
  const productImage = product.images;

  return (
    <div className="bg-[#E6EEE6] w-auto rounded shadow hover:shadow-lg hover:scale-110 hover:delay-100">
      <div className="w-auto text-center">
        <Image
          src={productImage[0]}
          alt="product-image"
          className="block w-full"
        />
      </div>
      <div className="p-3 grid gap-1">
        <p className="font-bold text-sm">{product.productName}</p>
        <p className="font-black text-[15px]">{product.price}</p>
        <p className="text-sm text-slate-400">
          <span className="font-bold">Sold By: </span>{" "}
          <span>{product.name}</span>
        </p>
        <PrimaryButton
          title="Add to cart"
          type="button"
          className="mt-2 w-full text-center"
        />
      </div>
    </div>
  );
};

const Products = () => {
  return (
    <main className="w-3/4 lg:w-3/5 xl:w-3/4 md:w-3/5 mb-10">
      <section className="flex justify-between gap-5 overflow-auto w-full Hide">
        {Categories.map((category) => (
          <Category category={category} key={category.id} />
        ))}
      </section>
      <section className="">
        <p className="text-[#003800] font-bold my-5">Most Popular</p>
        <section className="flex">
          {product.map((product) => (
            <Product product={product} />
          ))}
        </section>
      </section>
    </main>
  );
};

export default Products;
