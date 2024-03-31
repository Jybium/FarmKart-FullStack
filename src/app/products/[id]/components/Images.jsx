import React from "react";
import Image from "next/image";


const imageUrl =
  "https://neainqsqckknglhdwqdv.supabase.co/storage/v1/object/public/";

const Images = ({ image }) => {
  const images = image[0].Image;

  const fullImageUrl = imageUrl + images[0];

  return (
    <>
      <div className="flex flex-col sm:w-4/12 w-full">
        <section className="w-full h-full">
          <Image
            src={fullImageUrl}
            alt="product-image"
            className="max-w-full h-[360px]  block"
            width={360}
            height={360}
          />
        </section>
        <div className="h-fit w-fit mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2 justify-center sm:justify-normal">
          {images.map((image, i) => {
            const imagery = imageUrl + image;
            return (
              <Image
                src={imagery}
                alt="product-image"
                className="max-w-full h-[120px] block object-cover"
                width={150}
                height={100}
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
