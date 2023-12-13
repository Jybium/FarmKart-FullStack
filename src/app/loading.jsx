"use client";

import React from "react";
import Image from "next/image";
import Logo from "../app/logo (2).png";
import { motion } from "framer-motion";

const Variant = {
  hidden: {
    opacity: 0,
    scale: "1.0",
  },
  visible: {
    opacity: 1,
    scale: "1.2",
    transition: {
      type: "spring",
      delay: "0.2",
      duration: "3",
      yoyo: Infinity,
    },
  },
};

const loading = () => {
  return (
    <main className="w-full h-full fixed flex items-center content-center flex-1 justify-center bg-slate-100 backdrop-blur-sm z-30">
      <motion.div variants={Variant} initial="hidden" animate="visible">
        <Image src={Logo} alt="logo" width={100} height={100} />
      </motion.div>
    </main>
  );
};

export default loading;
