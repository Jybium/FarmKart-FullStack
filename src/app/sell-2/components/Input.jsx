import React from "react";

const Input = ({ name, placeholder, type, title }) => {
  return (
    <div className="grid w-full">
      <label htmlFor={name} className="text-sm font-black">
        {title}
      </label>
      <input
        type={type || "text"}
        name={title}
        id={title}
        placeholder={placeholder}
        className="w-full placeholder:text-sm text-sm rounded mt-1 bg-[#E6EEE6]"
      />
    </div>
  );
};

export default Input;
