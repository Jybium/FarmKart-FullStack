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
        <div className="h-fit mt-3 grid grid-flow-row grid-cols-2 sm:grid-cols-3 gap-2 w-fit">
          {images.map((image, i) => {
            const imagery = imageUrl + image;
            return (
              <Image
                src={imagery}
                alt="product-image"
                className="max-w-full h-[115px] block "
                width={115}
                height={115}
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
