import React from "react";
import { product } from "@/Constants/Offers";

const Images = () => {
  return (
    <section className="sm:w-[40%] w-full py-2">
      {product.map((image, i) => (
        <img src={image.images[0].src} className="w-full block" key={i}/>
      ))}
      {product.map((image, i) => {
        const images = image.images;
        <img src={images} key={i}/>;
      })}
    </section>
  );
};

export default Images;
