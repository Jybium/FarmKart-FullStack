import Header from "@/app/components/Header";
import React from "react";
import Images from "@/app/products/[id]/components/Images";
import Details from "@/app/products/[id]/components/Details";
import notifyError from "@/app/utils/notifyError";
import { fetchData } from "@/app/lib/fetch";


const fetch = async (id) =>{

try {
  
  const product = await fetchData(`/api/products/${id}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
  });
  const response = await product.json();
  console.log(response)

  return response
} catch (error) {
  console.log(error)
  
  notifyError(error.message)
}
}


const page = ({params}) => {
  const param  = params.id
  const data  = fetch(param)
  
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


