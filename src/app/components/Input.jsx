"use client";

import { useState, useEffect } from "react";
import { GrView } from "react-icons/gr";
import { GrHide } from "react-icons/gr";
import React from "react";
import Link from "next/link";

export const Password = ({
  title,
  placeholder,
  input,
  setInput,
  classname,
}) => {
  const For = title.split(" ").join();
  const [show, setShow] = useState(false);

  const showPassword = () => {
    setShow((prev) => !show);
  };
  return (
    <div className="w-full relative">
      <label htmlFor={For} className="grid text-left text-sm font-bold w-full">
        {title}
        <input
          type={show ? "text" : "password"}
          name={For}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          id={For}
          className="mt-1 rounded bg-[#E6EEE6] placeholder:text-sm placeholder:font-regular font-regular text-slate-600 w-full relative"
          placeholder={placeholder}
        />{" "}
        <p className="text-gray-400 font-bold text-sm mt-1">
          Minimum of 8 characters.
        </p>
      </label>
      <span onClick={showPassword} className="absolute right-2 bottom-9">
        {show ? <GrHide size="20" /> : <GrView size="20" />}
      </span>
    </div>
  );
};
export const PasswordLogin = ({
  title,
  placeholder,
  input,
  setInput,
  classname,
}) => {
  const For = title.split(" ").join();
  const [show, setShow] = useState(false);

  const showPassword = () => {
    setShow((prev) => !show);
  };
  return (
    <div className="w-full relative">
      <label htmlFor={For} className="grid text-sm font-bold w-full">
        {title}
        <input
          type={show ? "text" : "password"}
          name={For}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          id={For}
          className="mt-1 rounded bg-[#E6EEE6] placeholder:text-sm placeholder:font-regular font-regular text-slate-600 w-full relative"
          placeholder={placeholder}
        />{" "}
        <Link href="/forgot-password">
          <p className="text-[#005400] font-bold text-sm text-right">
            Forgot Password?
          </p>
        </Link>
      </label>
      <span onClick={showPassword} className="absolute right-2 bottom-9">
        {show ? <GrHide size="20" /> : <GrView size="20" />}
      </span>
    </div>
  );
};

export const Text = ({
  title,
  type,
  placeholder,
  input,
  setInput,
  className,
}) => {
  const For = title.split(" ").join();
  return (
    <div className="w-full">
      <label htmlFor={For} className="grid text-left text-sm font-bold w-full">
        {title}
        <input
          type={type || "text"}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          name={For}
          id={For}
          className="mt-1 rounded bg-[#E6EEE6] placeholder:text-sm placeholder:font-regular font-regular text-slate-600 w-full "
          placeholder={placeholder}
        />
      </label>
    </div>
  );
};
