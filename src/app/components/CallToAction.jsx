import React from "react";
import Image from "next/image";
import { PrimaryButton, SecondaryButton } from "../components/Buttons";
import CTA from "../../Asset/FARMKART IMAGES/images/landing-page/Hero-Image.png";
import Link from "next/link";

const CallToAction = () => {
  return (
    <section className="grid gap-4 sm:gap-0 pt-10 relative sm:flex items-center sm:px-14  px-10 justify-between bg-[#E6EEE6]">
      <div className="sm:w-1/2 pr-5 grid sm:gap-10 gap-5">
        <h1
          className="text-[#005400] font-bold text-4xl text-center sm:text-left tracking-wider"
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
        <div className="flex gap-2 mt-6 text-center sm:text-left">
          <Link href="/signup">
            <PrimaryButton title="Get Started" type="button" />
          </Link>
          <Link href="/about-us">
            <SecondaryButton title="Learn more" type="button" />
          </Link>
        </div>
      </div>
      <div className="h-auto">
        <Image
          src={CTA}
          className="sm:h-[550px] h-[300px] w-full"
          objectFit="contain"
          objectPosition="center"
          loading="lazy"
          alt="A woman holding shovel in the garden"
        />
      </div>
    </section>
  );
};

export default CallToAction;
