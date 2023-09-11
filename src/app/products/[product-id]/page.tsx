import Header from "@/app/components/Header";
import React from "react";
import Images from "@/app/products/[product-id]/components/Images";
import Details from "@/app/products/[product-id]/components/Details";

const page = () => {
  return (
    <main>
      <Header />
      <main className="mx-28">
        <section className="flex gap-8 my-10">
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
