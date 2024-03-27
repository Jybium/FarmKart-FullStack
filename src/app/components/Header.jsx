"use client";

import React, { useState } from "react";
import Image from "next/image";
import Logo from "../logo (2).png";
import { useAuth } from "../Context/AuthContext";
import Link from "next/link";
import { GrMenu, GrClose} from "react-icons/gr";
import {CiShoppingCart} from "react-icons/ci"
import { PrimaryButton, SecondaryButton } from "@/app/components/Buttons";
import Navlink from "@/app/components/Navlink";
import { ImageUrl } from "@/Constants/Offers";
import { useFetchWithInterceptors } from "../lib/fetch";

const Header = (props) => {

  const [show, setShow] = useState(false);
  const { user, loading } = useAuth();


  const { data,  error } = useFetchWithInterceptors("/api/cart", {
    method: "GET",
  });


  const imageUrl = ImageUrl + user.image



  const showNav = () => {
    setShow((prev) => !show);
  };

  const classes = `flex fixed  w-full justify-between items-center px-8 z-10 py-2  + ${props.className}`;

  return (
    <nav className={classes}>
      <div className="w-1/4 md:w-1/12 lg:w-2/12 ">
        <Link href="/">
          <Image className="w-[80px]" src={Logo} alt="Farmkart logo" />
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
          {loading ? " " : 
          <div>
           {Object.entries(user).length !== 0 ? (
              <div className="flex gap-5 items-center justify-between ">
                <Link href="/profile">

                <img
                  src={imageUrl}
                  alt="User's profile image"
                  className=" block w-16 h-16 rounded-full border border-black"
                  />
                  </Link>
                <Link href="/sell">
                  <PrimaryButton title="SELL" />
                </Link>
                <Link href="/cart">

                <div className="flex justify-between items-center ml-auto gap-2">
                  <span className="relative">
                    <CiShoppingCart size={35} />
                    <p className="absolute right-0 -top-1 bg-red-700 px-[6px] py-[2px] rounded-full text-white text-sm">
                   {data?.response?.data?.length}
                    </p>
                  </span>{" "}
                  <p className="">Cart</p>
                </div>
                </Link>
              </div>
            ) : (
              <div className="flex justify-between gap-2 sm:justify-normal">
                <Link href="/login">
                  <SecondaryButton type="button" title="Sign In" />
                </Link>
                <Link href="/signup">
                  <PrimaryButton type="button" title="Register" />
                </Link>
              </div>
            )}
          </div>}
        </div>
      </div>
      <span className="sm:hidden z-10" onClick={showNav}>
        {show ? <GrClose size="25" /> : <GrMenu size="25" />}
      </span>
    </nav>
  );
};

export default Header;
