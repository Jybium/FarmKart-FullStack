import React from "react";

const Select = (props) => {

  const Category = Object.entries(props.data)
  console.log(Category)

  return (
    <div className="block w-full">
      <label htmlFor={props.name} className="text-sm font-black w-full">
        {props.name}
      </label>
      <select
        name={props.name}
        id={props.name}
        className="rounded w-full text-sm bg-[#E6EEE6]"
      >
        {Category.map((items) => items.map((each, i) => <option key={i} value={each[0]}>{each[1].replace("_", " ")}</option>))}
      </select>
    </div>
  );
};

export default Select;
