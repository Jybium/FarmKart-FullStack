import React, { useState } from "react";
import { FAQ } from "@/Constants/Offers";
import { GrAddCircle, GrSubtractCircle } from "react-icons/gr";

const Accordion = ({ onclick, open, setopen }) => {
  return (
    <section className="w-5/6 mx-auto grid gap-3">
      {FAQ.map((items) => (
        <div key={items.id}>
          <p
            className="bg-[#f6f6f6] px-6 sm:py-3 py-2 rounded text-[15px] gap-8 flex items-center shadow cursor-pointer"
            onClick={() => {
              onclick(items.id);
              if (open === items.id) {
                setopen("");
              }
            }}
          >
            <span className="material-symbols-outlined transition-all delay-150 duration-100 ">
              {open === items.id ? (
                <GrSubtractCircle size="24px" />
              ) : (
                <GrAddCircle size="24px" />
              )}
            </span>{" "}
            {items.question}
          </p>
          <div
            className={`${
              open === items.id ? "grid" : "hidden"
            } px-4 py-3 shadow rounded text-sm`}
          >
            {items.answer}
          </div>
        </div>
      ))}
    </section>
  );
};

export default Accordion;
