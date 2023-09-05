"use client";

import React from "react";
import Image from "next/image";
import Logo from "@/app/logo (2).png";
import Link from "next/link";
import { PrimaryButton, SecondaryButton } from "@/app/components/Buttons";

const Header = (props: any) => {
  const classes = `flex justify-between items-center px-8 py-2  + ${props.className}`;

  return (
    <nav className={classes}>
      <div>
        <Link href="/">
          <Image
            className="w-[80px]"
            src={Logo}
            alt="Farmkart logo"
            objectFit="cover"
          />
        </Link>
      </div>
      <ul className="flex justify-between gap-8 text-sm font-bold text-[#696763]">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="">Our Services</Link>
        </li>
        <li>
          <Link href="/about-us">About Us</Link>
        </li>
        <li>
          <Link href="/faq">FAQ</Link>
        </li>
        <li>
          <Link href="">Demo</Link>
        </li>
        <li>
          <Link href="/contact-us">Contact Us</Link>
        </li>
      </ul>
      <div className="flex gap-2">
        <Link href="/login">
          <SecondaryButton type="button" title="Sign In" />
        </Link>
        <Link href="/signup">
          <PrimaryButton type="button" title="Register" />
        </Link>
      </div>
    </nav>
  );
};

export default Header;
