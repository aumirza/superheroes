import { useEffect, useState } from "react";
import { FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";
import { CharacterItem } from "../components/CharacterItem";
import { Header } from "../components/Header";
import { marvelApiService } from "../services";
import { Footer } from "../components/Footer";
import { SearchBox } from "../components/SearchBox";
import { Pagination } from "../components/Pagination";
import { FilterByLetter } from "../components/FilterByLetter";

export const Home = () => {
  const [characters, setCharacters] = useState<character[]>([]);
  const [filteredCharacters, setFilteredCharacters] = useState<character[]>([]);
  const [sortedCharacters, setSortedCharacters] = useState<character[]>([]);
  const [sortAsc, setSortAsc] = useState<boolean>(true);

  const [currPage, setCurrPage] = useState(1);
  const [perPage] = useState(20);

  useEffect(() => {
    marvelApiService
      .getAllCharacters()
      .then((characters) => setCharacters(characters));
  }, []);

  useEffect(() => {
    if (!filteredCharacters.length) return;
    setSortedCharacters(filteredCharacters);
    setCurrPage(1);
    setSortAsc(true);
  }, [filteredCharacters]);

  const sortHandler = () => {
    setSortAsc(!sortAsc);
    setSortedCharacters(
      !sortAsc
        ? filteredCharacters.slice()
        : filteredCharacters.slice().reverse()
    );
  };

  return (
    <div className="min-h-screen bg-gray-200">
      <Header>
        <SearchBox
          characters={characters}
          setFilteredCharacters={setFilteredCharacters}
        />
      </Header>
      {characters ? (
        <div className="flex flex-col items-center py-5">
          <div className="flex justify-between w-11/12 lg:w-5/6 mb-2 border-b-2 border-gray-600">
            <div className="flex items-center">
              <span>Name</span>
              <button onClick={sortHandler}>
                {sortAsc ? (
                  <FaSortAlphaUp className="ml-0.5" />
                ) : (
                  <FaSortAlphaDown className="ml-0.5" />
                )}
              </button>
            </div>
            <FilterByLetter />
          </div>

          {characters.length && !filteredCharacters.length ? (
            <div className="text-center text-2xl text-gray-500">
              No results found
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
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
        {filteredCharacters?.length ? (
          <Pagination
            currPage={currPage}
            setCurrPage={setCurrPage}
            perPage={perPage}
            items={filteredCharacters}
          />
        ) : (
          ""
        )}
      </div>
      <Footer />
    </div>
  );
};
