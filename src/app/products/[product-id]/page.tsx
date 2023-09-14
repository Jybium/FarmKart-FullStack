import Header from "@/app/components/Header";
import React from "react";
import Images from "@/app/products/[product-id]/components/Images";
import Details from "@/app/products/[product-id]/components/Details";

const page = () => {
  return (
    <main>
      <Header className="bg-white" />
      <main className="sm:mx-28 w-[90%] m-auto sm:m-0 relative top-[80px] overflow-scroll h-[calc(100%-80px)] pb-20 Hide">
        <section className="sm:flex grid sm:gap-8 gap-3 py-10">
          <Images />
          <Details />
        </section>
        <section>
          <h3 className="font-black text-lg">People also check</h3>
        </section>
      </main>
    </main>
  );
};

export default page;
