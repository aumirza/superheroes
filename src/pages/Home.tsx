import { useEffect, useState } from "react";
import { CharacterItem } from "../components/CharacterItem";
import { Hero } from "../components/Hero";
import { marvelApiService } from "../services";
import { Footer } from "../components/Footer";
import { Pagination } from "../components/Pagination";
import { FilterByLetter } from "../components/FilterByLetter";
import { Button } from "@/components/ui/button";
import { SortAscIcon, SortDescIcon } from "lucide-react";
import { useCharacterSearch } from "../hooks/useCharacterSearch";

export const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [characters, setCharacters] = useState<character[]>([]);
  const [filterLetter, setFilterLetter] = useState("");

  const searchResults = useCharacterSearch(characters, searchQuery);
  const [sortedCharacters, setSortedCharacters] = useState<character[]>([]);
  const [sortAsc, setSortAsc] = useState<boolean>(true);

  const [currPage, setCurrPage] = useState(1);
  const [perPage] = useState(9);

  useEffect(() => {
    marvelApiService
      .getAllCharacters()
      .then((characters) => setCharacters(characters));
  }, []);

  useEffect(() => {
    if (!searchResults.length) return;
    const filtered = filterLetter
      ? searchResults.filter((char) =>
          char.name.toLowerCase().startsWith(filterLetter.toLowerCase())
        )
      : searchResults;
    setSortedCharacters(filtered);
    setCurrPage(1);
    setSortAsc(true);
  }, [searchResults, filterLetter]);

  const sortHandler = () => {
    setSortAsc(!sortAsc);
    setSortedCharacters(
      !sortAsc ? sortedCharacters.slice() : sortedCharacters.slice().reverse()
    );
  };

  return (
    <div className="flex flex-col min-h-screen gap-5 bg-gray-200">
      <Hero hasQuery={!!searchQuery} setSearchQuery={setSearchQuery} />
      {characters ? (
        <div className="flex flex-col justify-center w-11/12 py-5 mx-auto">
          <div className="flex justify-between gap-5 mb-2 border-b-2 border-gray-600">
            <div className="flex items-center text-gray-600">
              <span className="text-lg font-semibold">Name</span>
              <Button
                variant="ghost"
                className="cursor-pointer"
                onClick={sortHandler}
              >
                {sortAsc ? (
                  <SortAscIcon className="ml-0.5" />
                ) : (
                  <SortDescIcon className="ml-0.5" />
                )}
              </Button>
            </div>
            <FilterByLetter onFilterChange={setFilterLetter} />
          </div>

          {characters.length && !sortedCharacters.length ? (
            <div className="text-2xl text-center text-gray-500">
              No results found
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
              {sortedCharacters
                .slice(currPage * perPage - perPage, currPage * perPage)
                .map((character) => (
                  <CharacterItem key={character.id} character={character} />
                ))}
            </div>
          )}
        </div>
      ) : (
        <div>Loading...</div>
      )}
      <div className="flex justify-center">
        {sortedCharacters?.length ? (
          <Pagination
            currPage={currPage}
            setCurrPage={setCurrPage}
            perPage={perPage}
            items={sortedCharacters}
          />
        ) : (
          ""
        )}
      </div>
      <Footer />
    </div>
  );
};
