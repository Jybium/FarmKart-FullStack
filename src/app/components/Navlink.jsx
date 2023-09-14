"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Navlinks } from "@/Constants/Offers";
import { motion } from "framer-motion";

const Navlink = () => {
  const pathname = usePathname();
  return (
    <div>
      <ul className="sm:flex sm:justify-center grid md:gap-6 gap-10 lg:gap-10 sm:text-sm lg:text-lg text-base font-bold text-[#696763] justify-between">
        {Navlinks.map((link) => (
          <motion.li
            whileHover={{ fontSize: "20", x: "10" }}
            key={link.id}
            className={`${pathname === link.to ? "text-[#003800]" : ""}`}
          >
            <Link href={link.to} key={link.id}>
              {link.name}
            </Link>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default Navlink;
