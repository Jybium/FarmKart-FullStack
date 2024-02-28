import Header from "@/app/components/Header";
import React from "react";
import Images from "@/app/products/[id]/components/Images";
import Details from "@/app/products/[id]/components/Details";
import prisma from "../../lib/prisma"
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
  const products = await prisma.product.findMany({
    select: { Id: true }, 
  });

  return products.map((product) => ({
    id: product.Id.toString(),
  }));

  // return products.data?.map((product) => ({
  //   id: product.Id.toString(),
  // }));
}


const page = async ({params}) => {

  const param  = +params.id

   const product = await prisma.product.findUnique({
     where: {
       Id: param, // Assuming 'param' corresponds to the product ID
     },
     include: {
       image: { select: { Image: true } },
       user: {
         select: {
           firstName: true,
           lastName: true,
           emailAddress: true,
           phoneNumber: true,
           createdAt: true,
           updatedAt: true,
           location: true,
         },
       },
     },
   });

   console.log(product)

    const responseImage = await product?.image
    const responseDetails = await product
    const responseUser = await product?.user
  
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


