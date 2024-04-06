"use client";

import { useEffect } from "react";
import Link from "next/link"
import { PrimaryButton } from "./components/Buttons";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="text-lg sm:text-3xl flex flex-row justify-center content-center items-center  h-screen">
      <div className="w-5/6 m-auto h-[80vh] grid justify-center content-center items-center">
        <h2 className="text-green-800 animate-bounce font-bold">
          Something went wrong! 😥😥😣😣
        </h2>
        <div className="flex gap-5 mt-5 text-base">
          <button type="button" onClick={() => reset()}>
            <PrimaryButton title="Try again" />
          </button>
          <Link href="/products">
            <PrimaryButton title="Go Home" />
          </Link>
        </div>
      </div>
    </div>
  );
}
