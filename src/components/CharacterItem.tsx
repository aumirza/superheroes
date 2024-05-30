import { Link } from "react-router-dom";

interface Prop {
  character: character;
}

export const CharacterItem: React.FC<Prop> = ({ character }) => {
  return (
    <Link to={`/characters/${character.id}`}>
      <div className="h-48 w-44 md:h-56 md:w-56 hover:scale-110 flex flex-col border-1 bg-white rounded-lg shadow p-2 transition-all">
        <div className="h-44 w-40 md:h-48 md:w-52 overflow-hidden rounded-md">
          <img
            height={190}
            width={220}
            alt={character.name}
            src={character.thumbnail.path + "." + character.thumbnail.extension}
          />
        </div>
        <div>
          <span>{character.name}</span>
        </div>
      </div>
    </Link>
  );
};
