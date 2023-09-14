import React from "react";
import Image from "next/image";
import { Choose, products } from "../../Constants/Offers";

const OurOffer = ({ offer }) => {
  const classes = `sm:flex grid justify-between bg-[#E6EEE6] content-center items-center sm:m-2 m-3 mx-auto sm:px-20 px-2 sm:py-4   ${offer.className}`;

  return (
    <div className={classes}>
      <Image
        src={offer.image}
        alt={`${offer.title} image`}
        objectFit="cover"
        objectPosition="center"
        className="sm:w-[35%] w-full block object-cover"
      />
      <div className=" grid gap-1 mt-3 sm:w-1/2 px-4 py-2 sm:py-0 sm:px-0">
        <h1 className="text-black font-extrabold pb-2 text-xl">
          {offer.title}
        </h1>
        <p className="text-[#504D49] text-sm">{offer.words}</p>
      </div>
    </div>
  );
};

const images = () => {};

const ChooseUs = () => {
  return (
    <main>
      <h1 className="text-[#005400] font-bold my-3 text-center">
        Why Choose Us?
      </h1>
      <div className=" mx-auto w-[90%] my-10 ">
        {Choose.map((item) => (
          <OurOffer offer={item} />
        ))}
      </div>

      <section>
        <h1 className="text-[#005400] font-bold my-3 text-center">
          What Can I Buy At FarmKart?
        </h1>
        <div className="w-[90%] grid md:grid-cols-4 lg:grid-cols-5 grid-cols-2 mx-auto gap-5 my-10">
          {products.map((image) => (
            <Image
              src={image.image}
              alt={`${image.image} image`}
              objectFit="cover"
              objectPosition="center"
              key={image.id}
              className="w-40 h-40 mx-auto"
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default ChooseUs;
