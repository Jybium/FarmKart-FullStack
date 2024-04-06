
import React from "react";
import Header from "../../components/Header";
import Form from "./components/Form";


const page = () => {

  return (
    <main className="w-full">
      <Header className="bg-white" />
      <main className="w-5/6 m-auto py-10 relative overflow-scroll top-[80px] h-[calc(100%-80px)] Hide pb-28">
        <h1 className="font-black text-lg text-center">Sell Your Products</h1>
        <Form/>
      </main>
    </main>
  );
};

export default page;
