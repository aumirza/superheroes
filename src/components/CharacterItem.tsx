import { Link } from "react-router-dom";

interface Prop {
  character: character;
}

export const CharacterItem: React.FC<Prop> = ({ character }) => {
  return (
    <Link to={`/characters/${character.id}`}>
      <div className="relative flex flex-col p-2 bg-white rounded-lg shadow border-1">
        <div className="overflow-hidden rounded">
          <img
            className="w-full h-full transition-all duration-200 aspect-square hover:scale-125"
            alt={character.name}
            src={character.thumbnail.path + "." + character.thumbnail.extension}
          />
        </div>
        <div className="absolute p-3 bg-red-500 bottom-5 rounded-tr-xl">
          <span className="text-lg font-semibold text-white">
            {character.name}
          </span>
        </div>
      </div>
    </Link>
  );
};
