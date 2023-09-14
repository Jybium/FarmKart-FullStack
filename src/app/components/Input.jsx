"use client";

import { useState, useEffect } from "react";
import { GrView } from "react-icons/gr";
import { GrHide } from "react-icons/gr";
import React from "react";
import Link from "next/link";

export const Password = ({
  title,
  placeholder,
  register,
  error,
  required,
  name,
  classname,
}) => {
  const For = title.toLowerCase().split("").join("");

  const [show, setShow] = useState(false);

  const showPassword = () => {
    setShow((prev) => !show);
  };
  return (
    <div className="w-full">
      <label htmlFor={For} className="grid text-left text-sm font-bold w-full">
        {title}
      </label>
      <div className="relative w-full">
        <input
          type={show ? "text" : "password"}
          name={For}
          {...register(name, {
            required: true,
            validate: {
              checkLength: (value) => value.length >= 8,
              matchPattern: (value) =>
                /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$*])/.test(value),
            },
          })}
          id={For}
          className="mt-1 rounded bg-[#E6EEE6] placeholder:text-sm placeholder:font-regular font-regular text-slate-600 w-full relative"
          placeholder={placeholder}
        />
        <span onClick={showPassword} className="absolute right-2 bottom-3">
          {show ? <GrHide size="20" /> : <GrView size="20" />}
        </span>
      </div>
      <p className="text-gray-400 font-bold text-sm mt-1">
        Minimum of 8 characters.
      </p>
      {error[name] && error[name].type === "required" && (
        <p className="text-sm text-red-600 font-bold text-left">
          Password is required
        </p>
      )}
      {error[name] && error[name].type === "checkLength" && (
        <p className="text-sm text-red-600 font-bold text-left">
          Password is must be up to eight characters
        </p>
      )}
      {error[name] && error[name].type === "matchPattern" && (
        <p className="text-sm text-red-600 font-bold text-left">
          Password is must be contain at least a number, symbol, uppercase
          letter and lowercase letter
        </p>
      )}
    </div>
  );
};
export const PasswordLogin = ({
  title,
  placeholder,
  error,
  register,
  name,
  classname,
}) => {
  const For = title.toLowerCase().split("").join("");

  const [show, setShow] = useState(false);

  const showPassword = () => {
    setShow((prev) => !show);
  };
  return (
    <div className="w-full grid relative">
      <label htmlFor={For} className="grid text-sm font-bold w-full relative">
        {title}
      </label>
      <div className="relative w-full">
        <input
          type={show ? "text" : "password"}
          name={For}
          {...register(name, {
            required: true,
            validate: {
              checkLength: (value) => value.length >= 8,
              matchPattern: (value) =>
                /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$*])/.test(value),
            },
          })}
          id={For}
          className="mt-1 rounded bg-[#E6EEE6] placeholder:text-sm placeholder:font-regular font-regular text-slate-600 w-full relative"
          placeholder={placeholder}
        />
        <span onClick={showPassword} className="absolute right-2 bottom-3">
          {show ? <GrHide size="20" /> : <GrView size="20" />}
        </span>
      </div>
      {error[name] && error[name].type === "required" && (
        <p className="text-sm text-red-600 font-bold text-left">
          Password is required
        </p>
      )}
      {error[name] && error[name].type === "checkLength" && (
        <p className="text-sm text-red-600 font-bold text-left">
          Password is must be up to eight characters
        </p>
      )}
      {error[name] && error[name].type === "matchPattern" && (
        <p className="text-sm text-red-600 font-bold text-left">
          Password is must be contain at least a number, symbol, uppercase
          letter and lowercase letter
        </p>
      )}
      <Link href="/forgot-password">
        <p className="text-[#005400] font-bold text-sm text-right">
          Forgot Password?
        </p>
      </Link>
    </div>
  );
};

export const Text = ({
  title,
  type,
  placeholder,
  register,
  error,
  name,
  required,
  className,
}) => {
  return (
    <div className="w-full">
      <label htmlFor={name} className="grid text-left text-sm font-bold w-full">
        {title}
        <input
          type={type || "text"}
          {...register(name, { required: true })}
          name={name}
          id={name}
          className="mt-1 rounded bg-[#E6EEE6] placeholder:text-sm placeholder:font-regular font-regular text-slate-600 w-full "
          placeholder={placeholder}
        />
      </label>
      {error[name] && error[name].type === "required" && (
        <p className="text-sm text-red-600 font-bold text-left">{`${title} is required.`}</p>
      )}
    </div>
  );
};
export const Select = ({ title, register, error, children, name, onclick }) => {
  return (
    <div className="w-full">
      <label htmlFor={name} className="grid text-left text-sm font-bold w-full">
        {title}
        <select
          name={name}
          id={name}
          {...register(name, { required: true })}
          className="mt-1 rounded bg-[#E6EEE6] placeholder:text-sm placeholder:font-regular font-regular text-slate-600 w-full "
        >
          <option value="">Select location</option>
          <option value="lagos">Lagos</option>
          <option value="abuja">Abuja</option>
        </select>
      </label>
      <p
        className="font-black text-blue-500 text-sm cursor-pointer mt-1"
        onClick={() => onclick()}
      >
        {children}
      </p>
      {error[name] && error[name].type === "required" && (
        <p className="text-sm text-red-600 font-bold">{`${title} is required.`}</p>
      )}
    </div>
  );
};
