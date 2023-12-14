import React from "react";
import Image from "next/image";
import Logo from "../../app/logo (2).png";

import Link from "next/link";
import { PrimaryButton } from "./Buttons";
import { TfiFacebook } from "react-icons/tfi";
import { TfiLinkedin } from "react-icons/tfi";
import { TfiTwitterAlt } from "react-icons/tfi";
import { TbMailFilled } from "react-icons/tb";
import { MdCall } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-[#E6EEE6] px-10 py-5">
      <section className="grid sm:flex justify-between items-start pb-14 w-12/12 border-[#5E5B57] border-b-[1px]">
        <Link href="/">
          <Image
            className="w-[80px] ml-5 sm:ml-0"
            src={Logo}
            alt="Farmkart logo"
            objectFit="cover"
          />
        </Link>
        <div className="sm:flex grid justify-between sm:gap-12 gap-5 text-[#27241E] text-base my-7 sm:my-0 ml-5 sm:ml-0">
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
        <div className="sm:w-4/12 w-full sm:ml-0">
          <label htmlFor="Suscribe" className="font-bold text-base">
            NEWSLETTER
          </label>
          <div className="flex sm:mt-3 mt-1">
            <input
              type="email"
              className="h-10 w-full pl-2 pr-1 border-0 py-2 outline-0 rounded text-sm placeholder:text-sm"
              placeholder="AbelJames@gmail.com"
            />
            <PrimaryButton type="submit" title="SUBSCRIBE" />
          </div>
        </div>
      </section>
      <section className="grid gap-3 sm:gap-0 sm:flex justify-between pt-5 pb-2">
        <p className="text-sm">
          <span className="text-[#5E5B57]">
            &copy; 2022. All Rights Reserved.{" "}
            <span className="text-[#005400]">FarmKart</span>
          </span>
        </p>
        <div className="flex gap-2 ">
          <Link
            href=""
            className="border-[1px] border-black rounded-full p-[6px] text-center"
          >
            <TfiFacebook />
          </Link>
          <Link
            href=""
            className="border-[1px] border-black rounded-full p-[6px] text-center"
          >
            <TfiLinkedin />
          </Link>
          <Link
            href=""
            className="border-[1px] border-black rounded-full p-[6px] text-center"
          >
            <TfiTwitterAlt />
          </Link>
          <Link
            href=""
            className="border-[1px] border-black rounded-full p-[6px] text-center"
          >
            <TbMailFilled />
          </Link>
          <Link
            href=""
            className="border-[1px] border-black rounded-full p-[6px] text-center"
          >
            <MdCall />
          </Link>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
