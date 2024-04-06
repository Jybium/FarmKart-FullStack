"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import "../product.css";
import Product from "../components/Product";
import { Categories } from "@/Constants/Offers";
import Category from "./Category";
import { useAuth } from "@/app/Context/AuthContext";
import { Spinner } from "flowbite-react";

const imageUrl =
  "https://neainqsqckknglhdwqdv.supabase.co/storage/v1/object/public/";


const Products = ({ datas }) => {
  const [product, setProduct] = useState(datas);
  const { loading } = useAuth();
  const searchParams = useSearchParams();
  const category = searchParams?.get("category")?.replace("+", " ");
  const location = searchParams?.get("location")?.replace("+", " ");
  const productName = searchParams?.get("product")?.replace("+", " ");
  const price = searchParams?.get("price")?.replace("+", " ");
  const popular = searchParams?.get("popularity")?.replace("+", " ");
 

 useEffect(() => {
   let filteredData = datas.slice(); 

   if (category) {
     filteredData = filteredData.filter(
       (item) => item.category.replace("_", " ").toLowerCase() === category
     );
   }

   if (location) {
     filteredData = filteredData.filter((item) => item.location === location);
   }

   if (productName) {
     filteredData = filteredData.filter((item) =>
       item.productName.includes(productName)
     );
   }

   if (price === "ascending") {
     filteredData.sort((a, b) => a.price - b.price);
   } else if (price === "descending") {
     filteredData.sort((a, b) => b.price - a.price);
   }

   if (popular === "most popular") {
     filteredData.sort((a, b) => a.views - b.views);
   } else if (popular === "least popular") {
     filteredData.sort((a, b) => b.views - a.views);
   }

   setProduct(filteredData);
 }, [category, location, productName, popular, price]);




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
        {loading ? (
          <div className="mx-auto justify-center text-center my-3 text-xl">
            <Spinner
              color="success"
              size="xl"
              className="text-center justify-center"
            />
          </div>
        ) : (
          <>
            {product.length <= 0 ? (
              <div className="text-center text-lg justify-center mt-5 mb-5 mx-auto">
                sorry 😥😣! <br /> There are no product available!
              </div>
            ) : (
              <div className="container w-fit">
                <p className="text-[#003800] font-bold my-5">Most Popular</p>
                <section className="grid grid-cols-1 justify-center sm:grid-cols-2 lg:grid-cols-3 gap-2 w-fit">
                  {product.map((product, i) => (
                    <Product product={product} key={i} />
                  ))}
                </section>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
};

export default Products;
