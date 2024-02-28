import Header from "@/app/components/Header";
import React from "react";
import Images from "@/app/products/[id]/components/Images";
import Details from "@/app/products/[id]/components/Details";
import notifyError from "@/app/utils/notifyError";
import { fetchData } from "@/app/lib/fetch";


export const dynamic = 'force-dynamic'

// const fetch = async (id) =>{

// try {
  
//   const product = await fetchData(`/api/products/${id}`, {
//     method: "POST",
//     headers: {
//       "content-type": "application/json",
//     },
//   });
//   const response = await product.json();
//   console.log(response)

//   return response
// } catch (error) {
//   console.log(error)
  
//   notifyError(error.message)
// }
// }

export async function generateStaticParams() {
  const products = await fetch("http:/127.0.0.1:3000/api/product").then((res) =>
    res.json()
  );

  return products.data?.map((product) => ({
    id: product.Id.toString(),
  }));
}


const page = async ({params}) => {

  const param  = +params.id

  const result = await fetch(
    `http://127.0.0.1:3000/api/product-details/${param}`,
    {
      method: "GET",
    }
  ).then((res) => res.json());

  console.log(result)


    const responseImage = await result.message.data?.image
    const responseDetails = await result.message.data
    const responseUser = await result.message.data?.user
  
  return (
    <main>
      <Header className="bg-white" />
      <main className="sm:mx-28 w-[90%] m-auto sm:m-0 relative top-[80px] overflow-scroll h-[calc(100%-80px)] pb-20 Hide">
        <section className="sm:flex grid sm:gap-8 gap-3 py-10">
          <Images image={responseImage}/>
          <Details details={responseDetails} user={responseUser}/>
        </section>
        <section>
          <h3 className="font-black text-lg">People also check</h3>
        </section>
      </main>
    </main>
  );
};

export default page;


