import React from "react";
import Image from "next/image";
import { product } from "@/Constants/Offers";

const imageUrl =
  "https://neainqsqckknglhdwqdv.supabase.co/storage/v1/object/public/";

const Images = ({ image }) => {
  const images = image[0].Image;
  const fullImageUrl = imageUrl + images[0];
  console.log(images)
  console.log(image)

  return (
    <>
      <section className="sm:w-[40%] w-full py-2">
        <img
          src={fullImageUrl}
          alt="product-image"
          className="max-w-full h-[400px] block "
          // width={50}
          // height={50}
        />
      </section>
      <div className="bg-red-500 h-60">
        {images.map((image, i) => {
          const imagery = imageUrl + image;
          {
            console.log(imagery);
          }

          <img
            src={fullImageUrl}
            alt="product-image"
            className="max-w-full h-[200px] block "
            // width={50}
            // height={50}
          />;
        })}
      </div>
    </>
  );
};

export default Images;
