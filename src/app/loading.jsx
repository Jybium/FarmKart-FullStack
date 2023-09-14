"use client";

import React from "react";
import Image from "next/image";
import Logo from "../app/logo (2).png";
import { motion } from "framer-motion";

const Variant = {
  hidden: {
    scale: "1",
    // opacity: 0,
  },
  visible: {
    // opacity: 1,
    scale: "1.2",
    transition: {
      type: "spring",
      delay: "0.1",
      duration: "4",
      yoyo: Infinity,
    },
  },
};

const loading = () => {
  return (
    <main className="w-full h-full fixed flex items-center content-center flex-1 justify-center bg-slate-100 backdrop-blur-sm z-30">
      <motion.div variants={Variant} initial="hidden" animate="visible">
        <Image src={Logo} alt="logo" width={200} height={200} />
      </motion.div>
    </main>
  );
};

export default loading;
