export const CharacterContent = ({
  character,
}: {
  character: detailedCharacter;
}) => {
  return (
    <div className="flex flex-col items-center gap-5 md:flex-row md:items-start md:gap-10">
      <div className="flex-grow">
        <img
          loading="lazy"
          className="object-cover rounded size-96"
          src={character.thumbnail.path + "." + character.thumbnail.extension}
          alt={character.name}
        />
      </div>

      <div className="relative flex flex-col items-center w-11/12 gap-5 md:items-start">
        <h1 className="font-serif text-2xl font-bold text-gray-800 md:text-5xl">
          {character.name}
        </h1>
        <p className="mt-2 text-gray-700 md:text-lg">
          {character.description || "No description available"}
        </p>
        <a
          href={character.urls.find((url) => url.type === "detail")?.url}
          className="px-5 py-2 mt-5 text-white transition-colors bg-red-500 rounded-md hover:bg-red-600"
        >
          See details
        </a>
      </div>
    </div>
  );
};
