import React, { useEffect, useState } from "react";
import Fuse from "fuse.js";
import { FaSearch, FaTimes } from "react-icons/fa";

interface Props {
  characters: character[];
  setFilteredCharacters: CallableFunction;
}

export const SearchBox: React.FC<Props> = ({
  characters,
  setFilteredCharacters,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    if (!characters) return;
    if (searchTerm === "") {
      setFilteredCharacters(characters);
      return;
    }

    const fuse = new Fuse(characters, {
      keys: ["name"],
      includeScore: true,
      threshold: 0.3,
      distance: 10,
    });

    const result = fuse.search(searchTerm);
    const characterResults = result.map((character) => character.item);
    setFilteredCharacters(characterResults);
  }, [characters, searchTerm, setFilteredCharacters]);

  return (
    <div className="flex items-center justify-between mt-5 h-10 px-2 w-72 bg-white rounded-full">
      <FaSearch className="text-slate-400 m-2" />
      <input
        placeholder="Find Your Character"
        className="w-60 placeholder:text-center placeholder:text-lg placeholder:font-mono placeholder:text-slate-400 outline-none"
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
        type="text"
      />
      <button onClick={() => setSearchTerm("")}>
        <FaTimes className="text-slate-400 m-2" />
      </button>
    </div>
  );
};
