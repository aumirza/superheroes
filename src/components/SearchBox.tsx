import React from "react";
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";

interface Props {
  onSearch: (searchTerm: string) => void;
}

export const SearchBox: React.FC<Props> = ({ onSearch }) => {
  const placeholders = ["Find your favoriate character", "Ironman", "Thor"];

  return (
    <div className="w-2/3 ">
      {/* <FaSearch className="m-2 size-7 text-slate-600" /> */}
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={(e) => onSearch(e.target.value)}
        onSubmit={() => {}}
      />
      {/* <button onClick={() => setSearchTerm("")}>
        <FaTimes className="m-2 text-slate-600" />
      </button> */}
    </div>
  );
};
