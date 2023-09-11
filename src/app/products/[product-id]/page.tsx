import Header from "@/app/components/Header";
import React from "react";
import Images from "@/app/products/[product-id]/components/Images";
import Details from "@/app/products/[product-id]/components/Details";

const page = () => {
  return (
    <main>
      <Header />
      <main>
        <Images />
        <Details />
      </main>
      <section>
        <h3>People also check</h3>
      </section>
    </main>
  );
};

export default page;
