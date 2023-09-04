import React from "react";
import Image from "next/image";
import { Partner } from "@/Constants/Offers";

const Sponsor = () => {
  return (
    <main className="my-10">
      <h1 className="text-black font-black my-3 text-center">
        Trusted By 50+ Partners
      </h1>
      <div className="grid grid-flow-col mx-auto w-10/12 place-items-center  justify-between gap-10 my-10">
        {Partner.map((partner) => (
          <Image
            src={partner.image}
            className="w-full flex m-auto"
            objectFit="contain"
            objectPosition="center"
            key={partner.id}
          />
        ))}
      </div>
    </main>
  );
};

export default Sponsor;
