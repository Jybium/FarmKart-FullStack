"use client"

import React, {useState} from "react";
import { GrAdd } from "react-icons/gr";
import { GrSubtract } from "react-icons/gr";

const Quantity = () => {

  const [quantity, setQuantity] = useState(1)
  return (
    <div className="border-y-[1px] border-black my-2 py-2 text-sm">
      <p className="text-base font-black text-[#003800]">Quantity:</p>
      <div className="flex gap-3 items-center mt-1">
        <span
          className="p-2 border-black border"
          onClick={() => {
            if (quantity <= 1) {
              return;
            } else {
              setQuantity(quantity - 1);
            }
          }}
        >
          <GrSubtract />
        </span>
        <p>{quantity}</p>
        <span
          className="p-2 border-black border"
          onClick={() => {
            
              setQuantity(quantity + 1);
           
          }}
        >
          <GrAdd />
        </span>
        <p>1 item(s) added</p>
      </div>
    </div>
  );
};

export default Quantity;
