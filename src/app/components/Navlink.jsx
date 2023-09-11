"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Navlinks } from "@/Constants/Offers";

const Navlink = () => {
  const pathname = usePathname();
  return (
    <div>
      <ul className="flex justify-between gap-8 text-sm font-bold text-[#696763]">
        {Navlinks.map((link) => (
          <li
            key={link.id}
            className={`${pathname === link.to ? "text-[#003800]" : ""}`}
          >
            <Link href={link.to} key={link.id}>
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navlink;
