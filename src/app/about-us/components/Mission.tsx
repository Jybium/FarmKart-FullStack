import React from "react";
import Image from "next/image";
import { Team } from "@/Constants/Offers";

const Person = ({ person }: any) => {
  return (
    <div className="text-center sm:w-1/6 w-2/6 gap-3 m-auto">
      <Image
        src={person.image}
        objectFit="contain"
        objectPosition="center"
        className="rounded-full w-20 h-20 m-auto mb-2"
        alt="team image"
      />
      <h3 className="text-[#005400] font-bold">{person.name}</h3>
      <p>{person.role}</p>
    </div>
  );
};

const Mission = () => {
  return (
    <main className="w-[90%] mx-auto mb-20 border-t-[1px] border-slate-400">
      <section className="w-11/12 mx-auto">
        <h1 className="text-[#005400] font-bold my-3 text-center  pt-10 text-lg">
          Our Mission
        </h1>
        <div className="text-center mt-5 mb-10 grid gap-3">
          <p>
            Farmer's Vetures, an agricultural organisation that aims to better
            the lives of farmers by giving them a unique way of selling their
            products and increasing their income. Most importantly, giving them
            opportunity to have the autonomy in selling without fretting with
            middle men exorbitant fees. Thus, the introducton of an E-market
            agricultural platform -{" "}
            <span className="font-bold uppercase"> farm kart</span>.
          </p>
          <p>
            with <span className="font-bold uppercase"> farm kart</span>,
            farmers can post their goods for sale. By doing this, they connect
            with consumers across the country and link directly with consumers
            at their comfort zone. Consumers also have the opportunity to speak
            with the farmers on their preferences and negotiate where
            neccessary.
          </p>
          <p>
            Farm Kart is safe, reliable and efficient. Goods are thoroughly
            inspected and delivered swiftly. Our trained and efficient customer
            support is top-notch. They are reliable and understanding in their
            dealings with our customers. Response are delivered swiftly and
            issues are resolved amicably.
          </p>
        </div>
      </section>
      <section className="pt-10 w-11/12 mx-auto">
        <h1 className="text-[#005400] font-bold my-3 text-center text-lg">
          Meet Our Team
        </h1>
        <p className="text-center pb-14">
          We are an innovative team consisting of a project manager, product
          designers and developers dedicated to creating outstanding solutions
          to real-world problems.
        </p>
        <div className="text-center">
          <div className="flex flex-wrap gap-5 place-content-center place-items-center ">
            {Team.map((person) => (
              <Person person={person} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Mission;
