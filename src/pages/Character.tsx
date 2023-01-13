import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { marvelApiService } from "../services";

export const Character = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState<detailedCharacter>();

  useEffect(() => {
    marvelApiService
      .getCharacterById(parseInt(id as string))
      .then((character) => setCharacter(character));
  }, []);

  return (
    <div className="min-h-screen bg-gray-200">
      <header className="flex items-center h-16 bg-red-500 ">
        <div className="h-full w-14 flex justify-center items-center">
          <Link to="/">
            <span className="text-3xl text-white">{"<-"}</span>
          </Link>
        </div>
        <div className="ml-5">
          <span className="text-2xl text-white">{character?.name}</span>
        </div>
      </header>

      {/* content */}
      <div className="p-5">
        <div className="flex">
          <div className="h-72 w-72 flex-shrink-0  overflow-hidden">
            <img
              height={250}
              width={250}
              src={
                character?.thumbnail.path + "." + character?.thumbnail.extension
              }
              alt=""
            />
          </div>

          <div className="flex flex-col p-3">
            <h1 className="text-2xl text-gray-700 font-bold font-serif">
              {character?.name}
            </h1>
            <p className="mt-2 text-gray-700">{character?.description}</p>
          </div>
        </div>

        <div className="flex">
          <div className="">
            <h1 className="text-2xl text-gray-700 font-bold font-serif">
              Comics
            </h1>
            <ul className="list-disc list-inside pl-5">
              {character?.comics.items.map((comic) => (
                <li key={comic.resourceURI}>
                  <span>{comic.name}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="">
            <h1 className="text-2xl text-gray-700 font-bold font-serif">
              Stories
            </h1>
            <ul className="list-disc list-inside pl-5">
              {character?.stories.items.map((story) => (
                <li key={story.resourceURI}>
                  <span>{story.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* content */}
    </div>
  );
};
