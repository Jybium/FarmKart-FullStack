import React from "react";
import { GrSearch } from "react-icons/gr";
import { MdFilterList } from "react-icons/md";

const Search = () => {
  return (
    <section className="relative m-auto text-center w-full py-8">
      <div className="absolute w-auto top-10 left-[13%] sm:left-[26.5%] sm:bottom-2 z-8">
        <GrSearch size="22px" />
      </div>
      <input
        type="text"
        name="search"
        placeholder="search products"
        id="search"
        className="placeholder:text-sm bg-[#E6EEE6] sm:w-1/2 w-5/6 m-auto rounded pl-14"
      />
      <div className="absolute w-auto bottom-10 right-[10%] sm:right-[26.5%] sm:bottom-10">
        <MdFilterList size="24px" />
      </div>
    </section>
  );
};

export default Search;
