interface Props {
  setSearchTerm: CallableFunction;
}

export const Header: React.FC<Props> = ({ setSearchTerm }) => {
  return (
    <header className="h-64 w-full bg-red-600 flex justify-center items-center">
      <div className="flex flex-col items-center">
        <h1 className="md:text-5xl text-3xl text-white font-bold font-serif ml-5">
          Marvel characters
        </h1>
        <input
          placeholder="Your Character"
          className="mt-5 pl-2 h-10 w-64 placeholder:text-center placeholder:text-2xl placeholder:font-mono placeholder:text-slate-300 rounded-full border focus:outline-none"
          onChange={(e) => setSearchTerm(e.target.value)}
          type="text"
        />
      </div>
    </header>
  );
};
