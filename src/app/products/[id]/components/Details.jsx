import React from "react";
import Image from "next/image";
import Seller from "@/Asset/FARMKART IMAGES/images/product-details/seller.png";
import Rating from "@/app/products/[id]/components/Rating";
import { GrLocation } from "react-icons/gr";
import Quantity from "@/app/products/[id]/components/Quantity";
import { GrStar } from "react-icons/gr";
import { GrView } from "react-icons/gr";
import { PrimaryButton } from "@/app/components/Buttons";

const style = { color: "Green" };

const Details = () => {
  return (
    <section className="sm:w-5/12 w-full">
      <section className="border-[1px] border-black rounded px-3 py-2 my-2 ">
        
        {/* FOR THE DETAILS SUCH AS IMAGE, NAME AND LOCATION */}

        <div className="flex items-center gap-5 text-sm font-black">
          <Image src={Seller} alt="seller-image" />
          <div>
            <p className="text-[#003800]">Ade</p>
            <p className="flex items-center gap-2">
              <span className="text-green-400">
                <GrLocation style={{ fill: "green" }} color={"yellow"} />
              </span>
              <span>Ondo West, Ondo, Nigeria</span>
            </p>
          </div>
        </div>
        <Rating />
        <div className="grid gap-2 font-black">
          <p>Mature West African Dwarf Breed Goats</p>
          <p className="flex gap-5 text-xs text-blue-600">
            <span>Posted 4 Hours Ago</span>
            <span className="flex items-center gap-3">
              <GrView /> 120 views
            </span>
          </p>
          <p>#30, 000/ Quantity</p>
        </div>
        <div className="flex justify-between mt-3 text-sm w-5/6">
          <div className="text-left grid gap-1">
            <p>categories:</p>
            <p>Available Quantities:</p>
            <p>Location:</p>
            <p>Colour:</p>
          </div>
          <div className="text-right grid gap-1">
            <p>Livestock</p>
            <p>60</p>
            <p>Ondo West, Ondo</p>
            <p>Brown and Black</p>
          </div>
        </div>
      </section>
      <Quantity />
      <div className="border-b-[1px] border-black pb-2 mb-5">
        <p className="font-black">Delivery:</p>
        <p className="text-sm font-bold text-slate-400">
          Estimated time: 2 - 5 days
        </p>
      </div>
      <PrimaryButton title="Buy Now" type="button" className="w-full" />
    </section>
  );
};

export default Details;
