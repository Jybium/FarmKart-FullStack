import CallToAction from "@/app/components/CallToAction";
import Offer from "@/app/components/Offer";
import ChooseUs from "@/app/components/ChooseUs";
import Sponsor from "@/app/components/Sponsor";
import Reviews from "@/app/components/Reviews";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";

export default function Home() {
  return (
    <>
      <Header className="bg-[#E6EEE6]" />
      <main className="flex min-h-screen flex-col items-center justify-between relative overflow-scroll h-[calc(100%-80px)] md:top-[70px] top-[80px] pb-5 Hide">
        <CallToAction />
        <Offer />
        <ChooseUs />
        <Reviews />
        <Sponsor />
      </main>
      <ToastContainer />
    </>
  );
}
