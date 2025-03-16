import { Link } from "react-router-dom";
import { ChevronLeftCircleIcon } from "lucide-react";

export const CharacterHeader = ({ name }: { name?: string }) => {
  return (
    <header className="relative flex items-center justify-center w-full h-16 bg-red-500">
      <div className="absolute left-0 flex items-center justify-center h-full w-14">
        <Link to="/">
          <ChevronLeftCircleIcon className="text-2xl text-white md:text-3xl" />
        </Link>
      </div>
      <div>
        <span className="text-xl font-semibold text-white md:text-3xl">
          {name}
        </span>
      </div>
    </header>
  );
};
