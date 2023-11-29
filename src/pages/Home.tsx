import Fuse from "fuse.js";
import { useCallback, useEffect, useState } from "react";
import { FaFilter, FaSortAlphaUp } from "react-icons/fa";
import { CharacterItem } from "../components/CharacterItem";
import { Header } from "../components/Header";
import { marvelApiService } from "../services";

export const Home = () => {
  const [characters, setCharacters] = useState<character[]>([]);
  const [searchResults, setSearchResults] = useState<character[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const searchHandler = useCallback(
    (searchTerm: string) => {
      if (!searchTerm) return setSearchResults([]);

      const fuse = new Fuse(characters, {
        keys: ["name"],
        includeScore: true,
        threshold: 0.3,
        distance: 10,
      });

      const result = fuse.search(searchTerm);
      const characterResults = result.map((character) => character.item);
      setSearchResults(characterResults);
    },
    [characters]
  );

  useEffect(() => {
    marvelApiService
      .getAllCharacters()
      .then((characters) => setCharacters(characters));
  }, []);

  useEffect(() => {
    searchHandler(searchTerm);
  }, [searchTerm, searchHandler]);

  return (
    <div className="min-h-screen bg-gray-200">
      <Header setSearchTerm={setSearchTerm} />
      {characters ? (
        <div className="flex flex-col items-center py-5">
          <div className="flex justify-between w-4/6 mb-2 border-b-2 border-gray-600">
            <div className="flex items-center">
              <span>Name</span>
              <FaSortAlphaUp className="ml-0.5" />
              {/* <FaSortAlphaDown className="ml-0.5" /> */}
            </div>
            <FaFilter />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
            {searchTerm && !searchResults.length ? (
              <div className="text-center text-2xl text-gray-500">
                No results found
              </div>
            ) : (
              searchResults
                .slice(0, 20)
                .map((character) => (
                  <CharacterItem key={character.id} character={character} />
                ))
            )}

            {!searchTerm &&
              characters
                .slice(0, 20)
                .map((character) => (
                  <CharacterItem key={character.id} character={character} />
                ))}
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
