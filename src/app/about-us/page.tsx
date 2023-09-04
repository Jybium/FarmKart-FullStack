import Head from "next/head";

import React from "react";
import Banner from "./components/Banner";
import Mission from "./components/Mission";
import Header from "../components/Header";

const page = () => {
  return (
    <main>
      <Header />
      <Banner />
      <Mission />
    </main>
  );
};

export default page;
