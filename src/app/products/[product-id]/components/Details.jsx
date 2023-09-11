import React from "react";
import Image from "next/image";
import Seller from "@/Asset/FARMKART IMAGES/images/product-details/seller.png";
import Rating from "@/app/products/[product-id]/components/Rating";
import { GrLocation } from "react-icons/gr";
import Quantity from "@/app/products/[product-id]/components/Quantity";
import { GrStar } from "react-icons/gr";
import { GrView } from "react-icons/gr";
import { PrimaryButton } from "@/app/components/Buttons";

const Details = () => {
  return (
    <section>
      {/* FOR THE DETAILS SUCH AS IMAGE, NAME AND LOCATION */}
      <div>
        <Image src={Seller} alt="seller-image" />
        <div>
          <p>Ade</p>
          <p>
            <span>
              <GrLocation />
            </span>
            <span>Ondo West, Ondo, Nigeria</span>
          </p>
        </div>
      </div>
      <Rating />
      <div>
        <p>Mature West African Dwarf Breed Goats</p>
        <p>
          <span>Posted 4 Hours Ago</span>
          <span>
            <GrView /> 120 views
          </span>
        </p>
        <p>#30, 000/ Quantity</p>
      </div>
      <div>
        <div>
          <p>categories:</p>
          <p>Available Quantities:</p>
          <p>Location:</p>
          <p>Colour:</p>
        </div>
        <div>
          <p>Livestock</p>
          <p>60</p>
          <p>Ondo West, Ondo</p>
          <p>Brown and Black</p>
        </div>
      </div>
      <Quantity />
      <div>
        <p>Delivery</p>
        <p>Estimated time: 2-5 days</p>
      </div>
      <PrimaryButton title="Buy Now" type="button" />
    </section>
  );
};

export default Details;
