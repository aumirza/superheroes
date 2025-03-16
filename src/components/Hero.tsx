import { cn } from "@/lib/utils";
import CoverImage from "../assets/cover.png";
import { SearchBox } from "./SearchBox";

export const Hero = ({
  setSearchQuery,
  hasQuery,
}: {
  setSearchQuery: (query: string) => void;
  hasQuery: boolean;
}) => {
  return (
    <header
      className={cn(
        "relative flex items-center justify-center w-full bg-black text-white  overflow-clip transition-all duration-500 ease-in-out",
        hasQuery
          ? "h-[40vh] rounded-b-2xl"
          : "h-[90vh] rounded-b-[4rem] sm:rounded-b-2xl"
      )}
    >
      <img
        className="absolute top-0 object-cover h-full opacity-30"
        src={CoverImage}
        alt=""
      />
      <div className="flex flex-col items-center w-full gap-5">
        <div className="flex flex-col items-center justify-center">
          <h1 className="z-20 ml-5 text-3xl font-bold md:text-7xl">
            Marvel characters
          </h1>
          <p className="text-xl font-semibold">
            All Marvel characters assembled.
          </p>
        </div>
        <div className="z-20 flex justify-center w-full">
          <SearchBox onSearch={setSearchQuery} />
        </div>
      </div>
    </header>
  );
};
