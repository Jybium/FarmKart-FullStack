import React from "react";
import { GrStar } from "react-icons/gr";

const Rating = () => {
  return (
    <div className="flex gap-5 my-2">
      <div className="flex">
        <GrStar />
        <GrStar />
        <GrStar />
        <GrStar />
        <GrStar />
      </div>
      <div className="flex gap-3 text-xs">
        <p>1200 Reviews</p>
        <p>1 order(s)</p>
      </div>
    </div>
  );
};

export default Rating;
