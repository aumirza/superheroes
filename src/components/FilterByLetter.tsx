import { useState } from "react";
import { FaFilter, FaTimes } from "react-icons/fa";

export const FilterByLetter = () => {
  const [popUpOpen, setPopUpOpen] = useState(false);
  const [filterBy, setFilterBy] = useState("");

  const handleFilterClick = (letter: string) => {
    const letterLowerCase = letter.toLocaleLowerCase();
    setFilterBy(letterLowerCase);
    setPopUpOpen(false);
  };

  const removeFilter = () => {
    setFilterBy("");
  };

  return (
    <div className="relative flex gap-2">
      {filterBy !== "" ? (
        <div
          className="flex items-center px-3 gap-1 bg-red-500 border rounded-full cursor-pointer"
          onClick={removeFilter}
        >
          <span className="text-white font-semibold">
            {" "}
            {filterBy.toLocaleUpperCase()}
          </span>
          <FaTimes className="text-white text-sm" />
        </div>
      ) : (
        ""
      )}
      <button onClick={() => setPopUpOpen(!popUpOpen)}>
        <FaFilter />
      </button>

      <div
        className={
          "absolute w-44 h-48 right-0 p-2 pt-1 bg-white border rounded-sm overflow-y-scroll" +
          " " +
          (popUpOpen ? "block" : "hidden")
        }
      >
        <div className="flex justify-between items-center">
          <p className="text-lg border-b-2 mb-1">Filter by letter</p>
          <button onClick={removeFilter}>
            <FaTimes className="" />
          </button>
        </div>

        <div className="grid grid-cols-5 gap-1">
          {new Array(26).fill(0).map((_, i) => (
            <button
              className={
                "p-1 border rounded-sm hover:bg-red-500 hover:text-white" +
                " " +
                (String.fromCharCode(65 + i) === filterBy.toLocaleUpperCase()
                  ? "bg-red-500 text-white"
                  : "")
              }
              key={i}
              onClick={() => handleFilterClick(String.fromCharCode(65 + i))}
            >
              {String.fromCharCode(65 + i)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
