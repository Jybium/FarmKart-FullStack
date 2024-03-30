"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
// import Link from "next/link";
import { useSearchParams } from "next/navigation";
import "../product.css";
import Product from "../components/Product"
import { Categories } from "@/Constants/Offers";
import { useAuth } from "@/app/Context/AuthContext";
import { Spinner } from "flowbite-react";


const imageUrl =
  "https://neainqsqckknglhdwqdv.supabase.co/storage/v1/object/public/";

const Category = ({ category }) => {
  return (
    <div className="grid w-full mx-auto text-center gap-1">
      <div className="w-[70px] h-[70px]">
        <Image
          src={category.image}
          alt="category image"
          className="rounded-full max-w-full object-cover h-[70px] block border-[1px] border-black"
        />
      </div>

      <p className="text-sm font-bold">{category.name}</p>
    </div>
  );
};



const Products = ({ datas }) => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="grid justify-center text-center my-5 text-xl">
        <Spinner color="success" size="xl" />
      </div>
    );
  }
  const searchParams = useSearchParams();
  // const [product, setProduct] = useState([])

  // setProduct(data)
  const search = searchParams?.get("category" || "location");
  // console.log(search);

  if (datas.length <= 0)
    return (
      <div className="text-center text-xl justify-center mt-3 mb-5 mx-auto">
        sorry 😥😣! <br /> There are no product available!
      </div>
    );

  return (
    <main className="w-3/4 lg:w-3/5 xl:w-3/4 md:w-3/5 mb-10">
      <section className="category-section overflow-hidden mb-5">
        <p className="text-[#003800] font-bold my-5">Categories</p>
        <div className="category-carousel Hide">
          {Categories.map((category, index) => (
            <div className="category-item" key={index}>
              <Category category={category} />
            </div>
          ))}
        </div>
      </section>
      <section className="popular-section">
        <div className="container">
          <p className="text-[#003800] font-bold my-5">Most Popular</p>
          <section className="grid grid-cols-1 justify-center sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {datas.map((product, i) => (
              <Product product={product} key={i} />
            ))}
          </section>
        </div>
      </section>
    </main>
  );
};

export default Products;
