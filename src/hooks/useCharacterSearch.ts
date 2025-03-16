import Fuse from "fuse.js";
import { useEffect, useState } from "react";

export const useCharacterSearch = (
  characters: character[],
  searchQuery: string
) => {
  const [searchResults, setSearchResults] = useState<character[]>([]);

  useEffect(() => {
    if (!characters) return;
    if (searchQuery === "") {
      setSearchResults(characters);
      return;
    }

    const fuse = new Fuse(characters, {
      keys: ["name"],
      includeScore: true,
      threshold: 0.3,
      distance: 10,
    });

    const result = fuse.search(searchQuery);
    const characterResults = result.map((character) => character.item);
    setSearchResults(characterResults);
  }, [characters, searchQuery]);

  return searchResults;
};
