import { useEffect, useState } from "react";
import { Hero } from "../components/Hero";
import { marvelApiService } from "../services";
import { Footer } from "../components/Footer";
import { Pagination } from "../components/Pagination";
import { FilterByLetter } from "../components/FilterByLetter";
import { useCharacterSearch } from "../hooks/useCharacterSearch";
import { CharacterGrid } from "../components/CharacterGrid";
import { CharacterSort } from "../components/CharacterSort";
import { LoadingState } from "../components/LoadingState";

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

  const resetSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="flex flex-col min-h-screen gap-5 bg-gray-200">
      <Hero hasQuery={!!searchQuery} setSearchQuery={setSearchQuery} />
      {!characters ? (
        <LoadingState />
      ) : (
        <div className="flex flex-col justify-center w-11/12 py-5 mx-auto">
          <div className="flex justify-between gap-5 mb-2 border-b-2 border-gray-600">
            <CharacterSort sortAsc={sortAsc} onSort={sortHandler} />
            <FilterByLetter
              onFilterChange={setFilterLetter}
              resetSearch={resetSearch}
            />
          </div>

          <CharacterGrid
            characters={sortedCharacters}
            currentPage={currPage}
            perPage={perPage}
          />
        </div>
      )}

      <div className="flex justify-center">
        {sortedCharacters?.length ? (
          <Pagination
            currPage={currPage}
            setCurrPage={setCurrPage}
            perPage={perPage}
            items={sortedCharacters}
          />
        ) : null}
      </div>
      <Footer />
    </div>
  );
};
