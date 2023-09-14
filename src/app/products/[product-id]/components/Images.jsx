import React from "react";
import { product } from "@/Constants/Offers";

const Images = () => {
  return (
    <section className="sm:w-[40%] w-full py-2">
      {product.map((image) => (
        <img src={image.images[0].src} className="w-full block" />
      ))}
      {product.map((image) => {
        const images = image.images;
        <img src={images} />;
      })}
    </section>
  );
};

export default Images;
