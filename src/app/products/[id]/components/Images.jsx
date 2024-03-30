import React from "react";
import Image from "next/image";
import { product } from "@/Constants/Offers";

const imageUrl =
  "https://neainqsqckknglhdwqdv.supabase.co/storage/v1/object/public/";

const Images = ({ image }) => {
  const images = image[0].Image;
  const fullImageUrl = imageUrl + images[0];


  return (
    <>
    <div className="flex flex-col sm:w-5/12 w-full">

      <section>
        <Image
          src={fullImageUrl}
          alt="product-image"
          className="max-w-full h-[360px] object-cover block"
          width={360}
          height={360}
        />
      </section>
      <div className="h-36 mt-3">
        {images.map((image, i) => {
          const imagery = imageUrl + image;
          return (
            <Image
              src={imagery}
              alt="product-image"
              className="max-w-full h-[150px] block "
              width={150}
              height={150}
              key={i}
            />
            );
          })}
      </div>
          </div>
    </>
  );
};

export default Images;
