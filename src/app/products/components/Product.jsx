"use client";

import React, { useState } from "react";
import "../product.css";
import Link from "next/link";
import Image from "next/image";
import { PrimaryButton } from "@/app/components/Buttons";
import Loading from "../../loading";
import { GrAdd } from "react-icons/gr";
import { useFetchWithInterceptors } from "@/app/lib/fetch";
import notifyError from "@/app/utils/notifyError";
import notifySuccess from "@/app/utils/notifySuccess";
import { reverseFormatNumber } from "@/app/utils/numberFormatter";

const imageUrl =
  "https://neainqsqckknglhdwqdv.supabase.co/storage/v1/object/public/";

const Product = ({ product }) => {
  const MemoizedProduct = React.memo(Product);

  const productImage = product?.image[0]?.Image[0];


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
        const errorData = await response.json();
        console.error("Error:", errorData);
        notifyError(errorData.message);
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      notifySuccess(data?.response?.message);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  fetchData();

  return (
    <div className="bg-[#E6EEE6] w-auto rounded shadow hover:shadow-lg hover:scale-100 hover:delay-100 m-1">
      <div className="w-auto text-center">
        <Link href={`/products/${product.Id}`}>
          <Image
            src={`${imageUrl}/${productImage}`}
            alt="product-image"
            className="max-w-full h-[200px] block object-cover rounded-t"
            width={340}
            height={200}
          />
        </Link>
      </div>
      <div className="p-3 grid gap-1">
        <p className="font-bold text-sm">{product.productName}</p>
        <p className="font-black text-[15px] text-sm">
          # {reverseFormatNumber(product.price)}
        </p>
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

export default Product;
