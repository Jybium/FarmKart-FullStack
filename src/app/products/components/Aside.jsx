"use client";

import React, { useCallback } from "react";
import { Categories } from "@prisma/client";
import { MdOutlineAddBox } from "react-icons/md";
import { AiOutlineUnorderedList } from "react-icons/ai";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";

const {LIVESTOCK, CROPS, FARM_SUPPLEMENT, OTHER_CATEGORIES} = Categories




const Aside = () => {

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback((name, value) =>{
    const params = new URLSearchParams(searchParams)
    params.set(name, value)
  },[searchParams])

  return (
    <aside
      className="border-[1px] border-black rounded border-collapse text-sm h-max md:w-2/5 xl:w-1/4 lg:w-2/5 sm:w-1/4 w-fit mb-10
     block sm:grid"
    >
      <div className="w-full">
        <div className="border-collaspe ">
          <p className="text-[#003800] font-bold py-2 px-4">categories</p>
          <ul className=" border-y border-black border-collapse px-4 py-3 grid gap-3">
           <Link href={{pathname:"/products", query:{"category":`${LIVESTOCK.toLowerCase()}`}}}>
            <li className="cursor-pointer flex items-center gap-3">
              <span>
                <AiOutlineUnorderedList size="24px" />
              </span>{" "}
              Livestock
            </li>
           </Link>

            <li className="cursor-pointer flex items-center gap-3">
              <span>
                <AiOutlineUnorderedList size="24px" />
              </span>{" "}
              Crops
            </li>
          
          
           <Link href={{pathname:"/products", query:{"category":`${FARM_SUPPLEMENT.replace("_", " ").toLowerCase()}`}}}>

            <li className="cursor-pointer flex items-center gap-3">
              <span>
                <AiOutlineUnorderedList size="24px" />
              </span>{" "}
              Farm Supplements
            </li>
            </Link>
           <Link href={{pathname:"/products", query:{"category":`${OTHER_CATEGORIES.replace("_", " ").toLowerCase()}`}}}>

            <li className="cursor-pointer flex items-center gap-3">
              <span>
                <AiOutlineUnorderedList size="24px" />
              </span>{" "}
              Other Categories
            </li>
            </Link>
          </ul>
        </div>
        <section className="grid py-3 px-4 gap-3 text-sm w-full">
          <div className="grid">
            <label htmlFor="location" className="mb-[2px]">
              Select Location:
            </label>
            <select
              name="location"
              id="location"
              className="rounded text-sm bg-[#E6EEE6]"
            >
              <option value="All Nigeria">All Nigeria</option>
            </select>
          </div>
          <div className="grid">
            <label htmlFor="sort" className="mb-[2px]">
              Sort By:
            </label>
            <select
              name="sort"
              id="sort"
              className="rounded text-sm bg-[#E6EEE6]"
            >
              <option value="Most Popular">Most Popular</option>
            </select>
          </div>

          <Link
            href="/sell"
            className="flex items-center content-center justify-center gap-3 text-white bg-[#003800] px-3 py-2 rounded text-sm text-center"
          >
            <span>
              <MdOutlineAddBox size="22px" />
            </span>{" "}
            Sell Your Products
          </Link>
        </section>
      </div>
    </aside>
  );
};

export default Aside;
