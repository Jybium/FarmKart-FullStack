import CallToAction from "@/app/components/CallToAction";
import Offer from "@/app/components/Offer";
import ChooseUs from "@/app/components/ChooseUs";
import Sponsor from "@/app/components/Sponsor";
import Reviews from "@/app/components/Reviews";
import Header from "./components/Header";

export default function Home() {
  return (
    <>
      <Header className="bg-[#E6EEE6]" />
      <main className="flex min-h-screen flex-col items-center justify-between">
        <CallToAction />
        <Offer />
        <ChooseUs />
        <Reviews />
        <Sponsor />
      </main>
    </>
  );
}
