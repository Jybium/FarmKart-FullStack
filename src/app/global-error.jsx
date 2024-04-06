"use client";

import { PrimaryButton } from "./components/Buttons";
import Link from "next/link"

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
        <div className="text-lg sm:text-3xl flex flex-row justify-center content-center items-center  h-screen">
          <div className="w-5/6 m-auto h-[80vh] grid justify-center content-center items-center">
            <h2 className="text-green-800 font-bold">
              Something went wrong! 😥😥😣😣
            </h2>
            <p className="text-base text-gray-400">{error.message}</p>
            <div className="flex gap-5 my-5 text-base">
              <button type="button" onClick={() => reset()}>
                <PrimaryButton title="Try again" />
              </button>
              <Link href="/products">
                <PrimaryButton title="Go Home" />
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
