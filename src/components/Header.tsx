import { ReactNode } from "react";
import CoverImage from "../assets/cover.png";

type Props = {
  children: ReactNode;
};

export const Header: React.FC<Props> = ({ children }) => {
  return (
    <header className="relative overflow-clip h-64 w-full bg-red-600 flex justify-center items-center">
      <img
        className="absolute top-0 md:h-[200%] opacity-30 z-10"
        src={CoverImage}
        alt=""
      />
      <div className="flex flex-col items-center">
        <h1 className="md:text-5xl text-3xl z-20 text-white font-bold font-serif ml-5">
          Marvel characters
        </h1>
        <div className="z-20">{children}</div>
      </div>
    </header>
  );
};
