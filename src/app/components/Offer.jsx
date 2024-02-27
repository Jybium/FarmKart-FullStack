import Image from "next/image";
import React from "react";
import { Offers } from "../../Constants/Offers";
import Mockup from "@/Asset/FARMKART IMAGES/images/landing-page/Frame 1151.png";
import { createPortal } from "react-dom";

const OurOffer = ({ offer }) => {
  return (
    <div className="flex flex-col sm:flex-  content-center text-center w-[46%] sm:w-[30%]  items-center text-xs m-2 sm:mx- mx-auto">


      <Image
        src={offer.image}
         
         
        className={offer.className || "w-[80px]"}
        alt="Image of what we offer"
        />
      <div className=" grid gap-1 mt-3">
        <h1 className="text-[#005400] font-bold">{offer.title}</h1>
        <p className="text-[#504D49]">{offer.words}</p>
      </div>
        
    </div>
  );
};

const Offer = () => {
  return (
    <main className="text-center relative py-10 px-5 sm:px-0 w-full">
      <Image
        src={Mockup}
         
         
        className="w-[40px] hidden sm:block absolute left-0 top-0"
        alt="Offers"
      />
      <h1 className="text-[#005400] font-bold my-3">What We Offer</h1>
      <p className="text-[#504D49] font-bold text-sm">
        Our major goal is to help farmers conduct agricultural transactions in
        an easy go
      </p>
      <div className="relative">
        <div className="flex flex-wrap gap-5 sm:gap-5 my-5 w-[100%]  sm:w-5/6 justify-center content-center items-center text-center mx-auto relative">
          {Offers.map((offer) => (
            <OurOffer offer={offer} key={offer.id} />
          ))}
        </div>

        <Image
          src={Mockup}
           
           
          className="w-[40px] hidden sm:block absolute top-0 right-0"
          alt="image of what we offer"
        />
      </div>
    </main>
  );
};

export default Offer;
