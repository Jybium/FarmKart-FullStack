
import React from "react";

const Select = async  (props) => {
  
  const Category = await props?.categories
  const register = await  props?.register
  
  

  return (
    <div className="block w-full">
      <label htmlFor={props.name} className="text-sm font-black w-full">
        {props.name}
      </label>
      <select
        {...register(props.name, { required: true })}
        name={props.name}
        id={props.name}
        className="rounded w-full text-sm bg-[#E6EEE6]"
      >
        {Category?.map((items, i) => (
          <option key={i} value={items}>
            {items.replace("_", " ")}
          </option>
        ))}
      </select>

      {props.error[props.name] && props.error[props.name].type === "required" && (
        <p className="text-sm text-red-600 font-bold">{`${props.name} is required.`}</p>
      )}
    </div>
  );
};

export default Select;

