
import Link from "next/link"
import Header from "../components/Header";
import Search from "./components/Search";
import Aside from "./components/Aside";
import "./product.css";
import { PrismaClient } from "@prisma/client";
import Products from "./components/Products";

const prisma = new PrismaClient()

export const metadata = {
  title: "Product Page | FarmKart",
  description:
    "This page contains product listing (Farm product) from the database as posted by the farmers and approved by the admin",
};

const page = async () => {

const product = await prisma.product.findMany({
  include: {
    image: { select: { Image: true } },
    user: {
      select: {
        Id:true,
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



  return (

    <main>
      <Header className="bg-white" />
      <main className="relative h-[calc(100%-80px)] top-[80px] overflow-scroll pb-20 Hide">
        <Search />
        <section className="sm:flex grid w-[90%] mx-auto gap-x-10">
          <Aside />
          
          <Products datas={product}/>
         
        </section>
      </main>
    </main>
   
  );
};

export default page;
