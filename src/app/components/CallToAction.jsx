import React from "react";
import Image from "next/image";
import { PrimaryButton, SecondaryButton } from "../components/Buttons";
import CTA from "../../Asset/FARMKART IMAGES/images/landing-page/Hero-image.png";

const CallToAction = () => {
  return (
    <section className="h-auto pt-10 flex items-center px-14 justify-between bg-[#E6EEE6]">
      <div className="w-1/2 pr-5 grid gap-10">
        <h1
          className="text-[#005400] font-bold text-4xl tracking-wider"
          style={{ lineHeight: "2.7rem" }}
        >
          Connecting Farmers and Buyers with Ease
        </h1>
        <p
          className="text-sm text-black font-regular"
          style={{ lineHeight: "1.5rem" }}
        >
          FarmKart ensures that your farm produce are sold with relative ease
          and customers can expect swift delivery when they purchase any item.
        </p>
        <div className="flex gap-2 mt-6">
          <PrimaryButton title="Get Started" type="button" />
          <SecondaryButton title="Learn more" type="button" />
        </div>
      </div>
      <div className="h-auto">
        <Image
          src={CTA}
          className="h-[550px] "
          objectFit="contain"
          objectPosition="center"
          loading="lazy"
        />
      </div>
    </section>
  );
};

export default CallToAction;
