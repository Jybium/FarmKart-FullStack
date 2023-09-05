import React from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/Asset/FARMKART IMAGES/images/landing-page/logo.png";
import passwordsuccess from "@/Asset/FARMKART IMAGES/images/password-success/password-success.gif";
import { PrimaryButton } from "../components/Buttons";

const page = () => {
  return (
    <main className="text-center">
      <header>
        <Image
          src={Logo}
          objectFit="contain"
          objectPosition="center"
          alt="company logo"
          className="text-center m-auto"
        />
      </header>
      <main className="my-6 w-1/2 mx-auto">
        <Image
          src={passwordsuccess}
          objectFit="contain"
          objectPosition="center"
          alt="company logo"
          className="text-center m-auto w-1/2"
        />
        <div className="capitalize my-10">
          <h1 className="font-black text-lg">Password reset successful</h1>
          <p>proceed to Sign In with your new password</p>
        </div>
        <Link href="/login">
          <PrimaryButton
            title="Sign In"
            className="w-8/12 m-auto"
            type="button"
          />
        </Link>
      </main>
    </main>
  );
};

export default page;
