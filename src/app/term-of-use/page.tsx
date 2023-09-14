import React from "react";
import Header from "../components/Header";
import { TOU } from "@/Constants/Offers";

const page = () => {
  return (
    <main>
      <Header className="bg-white" />
      <main className="py-10 w-5/6 mx-auto relative top-[80px] h-[calc(100%-80px)] overflow-scroll pb-20 Hide">
        <h1 className="font-black my-3 text-center">TERMS OF USE</h1>
        <section className="grid gap-4 mt-4">
          {TOU.map((text, i) => (
            <p className="text-sm" key={i}>
              {text}
            </p>
          ))}
        </section>
        <section className="my-3">
          <h2 className="font-black my-2 capitalize">
            Changes to this terms and condtions
          </h2>
          <p className="text-sm">
            We may update our Terms and Conditions from time to time. Thus, you
            are advised to review this page periodically for any changes. We
            will notify you of any changes by posting the new Terms and
            Conditions on this page. These changes are effective immediately
            after they are posted on this page.
          </p>
        </section>
        <section className="my-3 mb-10">
          <h2 className="font-black my-2">Contact Us</h2>
          <p className="text-sm">
            If you have any questions or suggestions about our Terms of Use, do
            not hesitate to contact us at info@farmkart.ng.
          </p>
        </section>
      </main>
    </main>
  );
};

export default page;
