import React from "react";

const Banner = () => {
  return (
    <main>
      <div className="my-10 bg-about-us bg-blend-overlay bg-gray-500 bg-cover bg-center bg-no-repeat text-center h-[70vh]">
        <div className="grid h-3/4 text-center text-white place-items-center place-content-center">
          <h1 className="font-black text-2xl tracking-wider">At FarmKart,</h1>
          <p className="font-light text-lg tracking-widest">
            We aim to connect farmers and consumers with ease
          </p>
        </div>
      </div>
    </main>
  );
};

export default Banner;
