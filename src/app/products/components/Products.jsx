"use client"

import React, {useState} from "react";
import Image from "next/image";
// import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { product } from "@/Constants/Offers";
import "../product.css";
import Link from "next/link"
import { Categories } from "@/Constants/Offers";
import { PrimaryButton } from "@/app/components/Buttons";
import { GrAdd } from "react-icons/gr";


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
  const productImage = product?.image[0]?.Image;
  const fullImageUrl = imageUrl + productImage
  // console.log(product.image)

  return (
    <Link href={`/products/${product.Id}`}>
      <div className="bg-[#E6EEE6] w-auto rounded shadow hover:shadow-lg hover:scale-110 hover:delay-100 m-1">
        <div className="w-auto text-center">
          <img
            src={fullImageUrl}
            alt="product-image"
            className="block w-full"
            // width={50}
            // height={50}
          />
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
          <PrimaryButton
            title="Add to cart"
            type="button"
            className="mt-2 w-full text-center"
          />
        </div>
      </div>
    </Link>
  );
};

const Products = ({data}) => {
  const searchParams = useSearchParams();
  // const [product, setProduct] = useState([])

  // setProduct(data)
  const search = searchParams?.get("category" || "location" );
   console.log(search);

   

  if (data.length <= 0)
    return (
      <div className="text-center text-xl justify-center mt-3 mx-auto">
        sorry 😥😣! <br /> There are no product available!
      </div>
    );

  
  return (
    <main className="w-3/4 lg:w-3/5 xl:w-3/4 md:w-3/5 mb-10">
      <section className="flex justify-between gap-5 overflow-auto w-full Hide">
        {Categories.map((category) => (
          <Category category={category} key={category.name} />
        ))}
      </section>
      <section className="">
        <p className="text-[#003800] font-bold my-5">Most Popular</p>
        <section className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          
          {data.map((product, i) => (
            <Product product={product} key={i}/>
          ))}
        </section>
      </section>
    </main>
  );
};

export default Products;
