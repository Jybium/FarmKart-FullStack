import React from "react";
import Image from "next/image";
import Logo from "@/Asset/FARMKART IMAGES/images/landing-page/logo.png";
import SignupForm from "./SignupForm";

const page = () => {
  return (
    <main>
      <div>
        <Image
          src={Logo}
          objectFit="cover"
          objectPosition="center"
          alt="company logo"
        />
        <div>
          <h1 className="capitalize font-bold">get started with farmakart!</h1>
          <p className="capitalize">registration is swift and free</p>
        </div>
      </div>
      <section>
        <Image src={SignupImage} objectFit="contain" objectPosition="center" />
      </section>
    </main>
  );
};

export default page;
