"use client";

import React, { useState } from "react";
import Image from "next/image";
import Logo from "../../app/logo (2).png";
import { useAuth } from "../Context/AuthContext";

import Link from "next/link";
import { GrMenu, GrClose } from "react-icons/gr";
import { PrimaryButton, SecondaryButton } from "@/app/components/Buttons";
import Navlink from "@/app/components/Navlink";

const Header = (props) => {
  const [show, setShow] = useState(false);
  const { user } = useAuth();
  const showNav = () => {
    setShow((prev) => !show);
  };

  const classes = `flex fixed  w-full justify-between items-center px-8 z-10 py-2  + ${props.className}`;

  return (
    <nav className={classes}>
      <div className="w-1/4 md:w-1/12 lg:w-2/12 ">
        <Link href="/">
          <Image
            className="w-[80px]"
            src={Logo}
            alt="Farmkart logo"
            objectFit="cover"
          />
        </Link>
      </div>
      <div
        className={`${
          show ? "grid" : "hidden"
        } w-full sm:w-3/4 md:w-11/12 lg:w-10/12 fixed sm:relative top-0 left-0 h-screen sm:h-0 backdrop-blur-sm  bg-transparent sm:bg-none sm:backdrop-blur-none  sm:mt-0 shadow-md sm:flex py-3 px-5 sm:px-0 sm:py-0 flex items-center  text-left justify-between`}
        onClick={showNav}
      >
        <div className="sm:flex justify-between items-center ml-10 sm:w-full my-5 grid gap-20 sm:gap-0">
          <Navlink />
          <div className="flex gap-2 justify-center sm:justify-normal">
            {user ? (
              <div>
                <Image src={user.Image} alt="User's profile image" className=""/> <PrimaryButton title="SELL" />{" "}
                <div>
                  <span className="relative">
                    <GrCart />
                    <p className="absolute right-0 top-0 bg-red-600 px-[2px] py-[1px]">
                      0
                    </p>
                  </span>{" "}
                  <p>Cart</p>
                </div>
              </div>
            ) : (
              <>
                <Link href="/login">
                  <SecondaryButton type="button" title="Sign In" />
                </Link>
                <Link href="/signup">
                  <PrimaryButton type="button" title="Register" />
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      <span className="sm:hidden z-10" onClick={showNav}>
        {show ? <GrClose size="25" /> : <GrMenu size="25" />}
      </span>
    </nav>
  );
};

export default Header;
