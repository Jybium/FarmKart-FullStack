import React from "react";
import { GrSearch } from "react-icons/gr";
import { MdFilterList } from "react-icons/md";

const Search = () => {
  return (
    <section className="relative m-auto text-center w-full my-8">
      <div className="absolute left-[26.5%] bottom-2">
        <GrSearch size="24px" />
      </div>
      <input
        type="text"
        name="search"
        placeholder="search products"
        id="search"
        className="placeholder:text-sm bg-[#E6EEE6] w-1/2 m-auto rounded pl-14"
      />
      <div className="absolute right-[26.5%] bottom-2">
        <MdFilterList size="24px" />
      </div>
    </section>
  );
};

export default Search;
