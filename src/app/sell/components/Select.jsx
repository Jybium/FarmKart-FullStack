import React from "react";

const Select = ({ name, title }) => {
  return (
    <div className="block w-full">
      <label htmlFor={name} className="text-sm font-black w-full">
        {name}
      </label>
      <select
        name={name}
        id={name}
        className="rounded w-full text-sm bg-[#E6EEE6]"
      >
        <option value="Livestock">{title}</option>
      </select>
    </div>
  );
};

export default Select;
