import React from "react";
import Image from "next/image";
import Logo from "@/app/logo (2).png";
import Link from "next/link";
import { PrimaryButton } from "./Buttons";

const Footer = () => {
  return (
    <footer className="bg-[#E6EEE6] px-10 py-5">
      <section className=" flex justify-between items-start pb-14 w-12/12 border-[#5E5B57] border-b-[1px]">
        <Link href="/">
          <Image
            className="w-[80px]"
            src={Logo}
            alt="Farmkart logo"
            objectFit="cover"
          />
        </Link>
        <div className="flex justify-between gap-12 text-[#27241E] text-base">
          <div>
            <h1 className="font-bold uppercase">About Us</h1>
            <ul className="mt-2 text-sm gap-1 grid">
              <li>
                <Link href="/about-us">About FarmKart</Link>
              </li>
              <li>
                <Link href="/term-of-use">Terms Of Use</Link>
              </li>
            </ul>
          </div>
          <div>
            <h1 className="font-bold uppercase">Resources</h1>
            <ul className="mt-2 text-sm gap-1 grid">
              <li>
                <Link href="">Our Blog</Link>
              </li>
            </ul>
          </div>
          <div>
            <h1 className="font-bold uppercase">Support</h1>
            <ul className="mt-2 text-sm gap-1 grid">
              <li>
                <Link href="/contact-us">Contact Us</Link>
              </li>
              <li>
                <Link href="/faq">FAQ</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-4/12">
          <label htmlFor="Suscribe" className="font-bold text-base">
            NEWSLETTER
          </label>
          <div className="flex">
            <input
              type="email"
              className="h-10 w-full pl-2 pr-1 border-0 py-2 outline-0 rounded text-sm placeholder:text-sm"
              placeholder="AbelJames@gmail.com"
            />
            <PrimaryButton type="submit" title="SUBSCRIBE" />
          </div>
        </div>
      </section>
      <section className="pt-5 pb-2">
        <p className="text-sm">
          <span className="text-[#5E5B57]">
            &copy; 2022. All Rights Reserved.{" "}
            <span className="text-[#005400]">FarmKart</span>
          </span>
        </p>
        <div></div>
      </section>
    </footer>
  );
};

export default Footer;
