"use client";
"use Strict";

import React from "react";
import { Carousel } from "flowbite-react";

function SlideAsAnything(props) {
  return (
    <Carousel className="" indicator="false">
      <div className="flex h-full items-center justify-center  dark:bg-slate-400 dark:text-white object-contain">
        {props.firstCarousel}
      </div>
      <div className="flex h-full items-center justify-center dark:bg-gray-400 dark:text-white">
        {props.secondCarousel}
      </div>
      <div className="flex h-full items-center justify-center  dark:bg-slate-400 dark:text-white">
        {props.thirdCarousel}
      </div>
    </Carousel>
  );
}

export const Images = () => {
  return (
    <div className="grid justify-between items-center content-center py-20">
      <div className="w-5/6 m-auto text-slate-500 font-medium">
        <p className="mb-3">
          This is the best platform ever. I love how simple everything is and
          how easy the app is to navigate.
        </p>
      </div>
      <div className="flex items-center sm:gap-5 gap-2 content-end w-5/6 m-auto">
        {/* <img
          src={Image}
          alt=""
          className="md:w-16 md:h-16 w-14 h-14 rounded-full"
        /> */}
        <div>
          <p className="font-bold text-slate-400 sm:text-lg text-sm uppercase">
            Mr Aderoboye Adetona
          </p>
          <p className="text-blue-400 font-semibold uppercase text-xs">
            Chairman, NUJ Ondo state.
          </p>
        </div>
      </div>
    </div>
  );
};

const Reviews = () => {
  return (
    <main className="w-full">
      <h1 className="text-[#005400] font-bold my-3 text-center">
        What Are People Saying About Us?
      </h1>
      <section className="h-40 w-5/6 mx-auto flex gap-10 justify-between">
        <SlideAsAnything
          firstCarousel={<Images />}
          secondCarousel={<Images />}
          thirdCarousel={<Images />}
        />

        <div className="hidden sm:block">
          <SlideAsAnything
            firstCarousel={<Images />}
            secondCarousel={<Images />}
            thirdCarousel={<Images />}
          />
        </div>
      </section>
    </main>
  );
};

export default Reviews;
