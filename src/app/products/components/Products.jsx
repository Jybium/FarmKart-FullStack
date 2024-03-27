"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
// import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { product } from "@/Constants/Offers";
import "../product.css";
import Link from "next/link";
import { Categories } from "@/Constants/Offers";
import { PrimaryButton } from "@/app/components/Buttons";
import Loading from "../../loading";
import { GrAdd } from "react-icons/gr";
import { useFetchWithInterceptors } from "@/app/lib/fetch";
import notifyError from "@/app/utils/notifyError";
import { useAuth } from "@/app/Context/AuthContext";
import { Spinner } from "flowbite-react";
import notifySuccess from "@/app/utils/notifySuccess";

const imageUrl =
  "https://neainqsqckknglhdwqdv.supabase.co/storage/v1/object/public/";

const Category = ({ category }) => {
  return (
    <div className="grid w-full mx-auto text-center gap-1">
      <div className="w-[70px] h-[70px]">
        <Image
          src={category.image}
          alt="category image"
          className="rounded-full w-[70px] h-[70px] block border-[1px] border-black"
        />
      </div>

      <p className="text-sm font-bold">{category.name}</p>
    </div>
  );
};

const Product = ({ product }) => {
  const MemoizedProduct = React.memo(Product);

  const productImage = product?.image[0]?.Image;
  const fullImageUrl = imageUrl + productImage;

  const [productId, setProductId] = useState("");

  const bodyData = {
    productId,
    Quantity: 1,
  };



 const fetchData = async () => {

    if (productId.length === 0) {
      return;
    }

   try {
    

     const response = await fetch("/api/cart", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(bodyData),
     });

     if (!response.ok) {
       throw new Error("Network response was not ok");
     }

     const data = await response.json();
     notifySuccess(data?.response?.message)
     console.log("Success:", data);
   } catch (error) {
     console.error("Error:", error);
   }
 };


       fetchData()


  return (
    <div className="bg-[#E6EEE6] w-auto rounded shadow hover:shadow-lg hover:scale-110 hover:delay-100 m-1">
      <div className="w-auto text-center">
        <Link href={`/products/${product.Id}`}>
          <Image
            src={`${imageUrl}/${productImage}`}
            alt="product-image"
            className="max-w-full h-auto block "
            width={300}
            height={150}
          />
        </Link>
      </div>
      <div className="p-3 grid gap-1">
        <p className="font-bold text-sm">{product.productName}</p>
        <p className="font-black text-[15px]"># {product.price}</p>
        <p className="flex items-center gap-1 text-sm text-slate-400">
          <span className="font-bold">Sold By: </span>{" "}
          <span className="text-black">
            {product.user.firstName} {product.user.lastName}
          </span>
        </p>
        <p onClick={() => setProductId(product.Id)}>
          <PrimaryButton
            title="Add to cart"
            type="button"
            className="mt-2 w-full text-center"
          />
        </p>
      </div>
    </div>
  );
};

const Products = ({ datas }) => {
  const { loading } = useAuth();

  if (loading) {
    
    return <div className="justify-center text-center my-5 text-xl"><Spinner color="success" size="xl"/></div>;
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
      <section className="overflow-auto mb-5">
        <p className="text-[#003800] font-bold my-5">Categories</p>
        <div className="grid grid-flow-col overflow-auto gap-5">
          {Categories.map((category) => (
            <Category category={category} key={category.name} />
          ))}
        </div>
      </section>
      <section>
        <p className="text-[#003800] font-bold my-5">Most Popular</p>
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {datas.map((product, i) => (
            <Product product={product} key={i} />
          ))}
        </section>
      </section>
    </main>
  );
};

export default Products;
