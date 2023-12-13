"use client";

import { Suspense, lazy } from "react";
const Offer = lazy(()=>import("@/app/components/Offer"))
const ChooseUs = lazy(()=>import("@/app/components/ChooseUs"))
const Sponsor = lazy(()=>import("@/app/components/Sponsor"))
const Reviews = lazy(()=>import("@/app/components/Reviews"))
const Header = lazy(()=>import("@/app/components/Header"))
const CallToAction = lazy(()=>import("@/app/components/CallToAction"))
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";

export default function Home() {
  return (
    <Suspense>
      <Header className="bg-[#E6EEE6]" />
      <main className="flex min-h-screen flex-col items-center justify-between relative overflow-scroll h-[calc(100%-80px)] md:top-[70px] top-[80px] pb-5 Hide">
        <CallToAction />
        <Offer />
        <ChooseUs />
        <Reviews />
        <Sponsor />
      </main>
      <ToastContainer />
    </Suspense>
  );
}
