import { useState } from "react";
import { Button } from "./ui/button";
import { FilterIcon, XIcon } from "lucide-react";

interface FilterByLetterProps {
  onFilterChange: (letter: string) => void;
}

export const FilterByLetter: React.FC<FilterByLetterProps> = ({
  onFilterChange,
}) => {
  const [popUpOpen, setPopUpOpen] = useState(false);
  const [filterBy, setFilterBy] = useState("");

  const handleFilterClick = (letter: string) => {
    const letterLowerCase = letter.toLocaleLowerCase();
    setFilterBy(letterLowerCase);
    onFilterChange(letterLowerCase);
    setPopUpOpen(false);
  };

  const removeFilter = () => {
    setFilterBy("");
    onFilterChange("");
  };

  return (
    <div className="relative flex gap-2">
      {filterBy !== "" ? (
        <div
          className="flex items-center gap-1 px-3 bg-red-500 border rounded-full cursor-pointer"
          onClick={removeFilter}
        >
          <span className="font-semibold text-white">
            {filterBy.toLocaleUpperCase()}
          </span>
          <XIcon className="text-sm text-white" />
        </div>
      ) : (
        ""
      )}
      <Button
        variant="ghost"
        className="cursor-pointer"
        onClick={() => setPopUpOpen(!popUpOpen)}
      >
        <FilterIcon />
      </Button>

      <div
        className={
          "absolute w-64 z-10 right-0 p-2 pt-1 bg-white border rounded-sm overflow-y-scroll flex flex-col gap-2" +
          " " +
          (popUpOpen ? "block" : "hidden")
        }
      >
        <div className="flex items-end justify-between">
          <p className="pb-1 text-lg border-b-2">Filter by letter</p>
          <Button
            className="cursor-pointer"
            onClick={() => setPopUpOpen(false)}
          >
            <XIcon />
          </Button>
        </div>

        <div className="grid grid-cols-5 gap-1">
          {new Array(26).fill(0).map((_, i) => (
            <button
              className={
                "p-1 text-lg border rounded-sm hover:bg-red-500 hover:text-white" +
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
