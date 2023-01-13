import { Link } from "react-router-dom";

interface Prop {
    character: character;
}

export const CharacterItem: React.FC<Prop> = ({ character }) => {
    return (
        <Link to={`/characters/${character.id}`}>
            <div className="h-56 w-56 flex flex-col border-1 bg-white rounded-lg shadow p-2">
                <div className="h-48 w-52 overflow-hidden rounded-md">
                    <img height={190} width={220}
                        src={character.thumbnail.path + '.' + character.thumbnail.extension}
                    />
                </div>
                <div><span>{character.name}</span></div>
            </div>
        </Link>
    )
}
