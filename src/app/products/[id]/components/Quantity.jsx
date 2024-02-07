import React from "react";
import { GrAdd } from "react-icons/gr";
import { GrSubtract } from "react-icons/gr";

const Quantity = () => {
  return (
    <div className="border-y-[1px] border-black my-2 py-2 text-sm">
      <p className="text-base font-black text-[#003800]">Quantity:</p>
      <div className="flex gap-1 items-center mt-1">
        <span className="p-2 border-black border">
          <GrSubtract />
        </span>
        <p>20</p>
        <span className="p-2 border-black border">
          <GrAdd />
        </span>
        <p>1 item(s) added</p>
      </div>
    </div>
  );
};

export default Quantity;
