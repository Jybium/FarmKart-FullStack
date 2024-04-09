import React from "react";
import Image from "next/image";
import Seller from "@/Asset/FARMKART IMAGES/images/product-details/seller.png";
import Rating from "@/app/products/[id]/components/Rating";
import { GrLocation, GrPhone } from "react-icons/gr";
import Quantity from "@/app/products/[id]/components/Quantity";
import { GrStar } from "react-icons/gr";
import { GrView } from "react-icons/gr";
import {reverseFormatNumber} from "../../../utils/numberFormatter"
import formatTimeElapsed from "../../../helpers/formatTimeElapsed"
import { PrimaryButton } from "@/app/components/Buttons";
import { ImageUrl } from "@/Constants/Offers";
import profile from "../../../../../public/profile.png";
import Link from "next/link";





const style = { color: "Green" };

const Details = ({user, details}) => {

  const imageUrl = `${ImageUrl}/${user.image}`;

  return (
    <section className="sm:w-5/12 w-full">
      <section className="border-[1px] border-black rounded px-3 py-2 my-2 ">
        {/* FOR THE DETAILS SUCH AS IMAGE, NAME AND LOCATION */}

        <div className="flex items-center gap-5 text-sm font-black">
          <Image
            src={user.image ? imageUrl : profile}
            alt="User's profile image"
            className=" block w-16 h-16 rounded-full border  border-black object-cover"
            width={16}
            height={16}
          />
          <div className="grid sm:flex items-center justify-between sm:gap-3">
            <p className="text-[#003800] flex gap-2">
              {user.firstName} <span>{user.lastName}</span>
            </p>
            <p className="text-[#003800] flex items-center gap-2">
              <GrPhone /> {user.phoneNumber}
            </p>
            <p className="flex items-center gap-2">
              <span className="text-green-400">
                <GrLocation style={{ fill: "green" }} color={"yellow"} />
              </span>
              <span>{user.location}</span>
            </p>
          </div>
        </div>
        <Rating />
        <div className="grid gap-2 font-black">
          <p>{details.productName}</p>
          <p className="flex gap-5 text-xs text-blue-600">
            <span>Posted {formatTimeElapsed(details.createdAt)} Ago</span>

            <span className="flex items-center gap-3">
              <GrView /> {details.views} views
            </span>
          </p>
          <p># {reverseFormatNumber(details.price)}/ Quantity</p>
        </div>
        <div className="flex justify-between mt-3 text-sm w-5/6">
          <div className="text-left grid gap-1">
            <p>categories:</p>
            <p>Available Quantities:</p>
            <p>Location:</p>
            <p>Colour:</p>
          </div>
          <div className="text-right grid gap-1">
            <p>{details.category}</p>
            <p>{details.Quantity}</p>
            <p>{user.location}</p>
            <p>{details.color}</p>
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
      <Link href="/payment-successful">

      <PrimaryButton title="Buy Now" type="button" className="w-full" />
      </Link>
    </section>
  );
};

export default Details;
