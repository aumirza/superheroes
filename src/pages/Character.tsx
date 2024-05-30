import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { marvelApiService } from "../services";
import { FaArrowCircleLeft } from "react-icons/fa";
import { Footer } from "../components/Footer";

export const Character = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState<detailedCharacter>();

  useEffect(() => {
    marvelApiService
      .getCharacterById(parseInt(id as string))
      .then((character) => setCharacter(character));
  }, [id]);

  useEffect(() => {
    console.log(character);
  }, [character]);

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center gap-10">
      <header className="relative w-full flex items-center justify-center h-16 bg-red-500 ">
        <div className="absolute left-0 h-full w-14 flex justify-center items-center">
          <Link to="/">
            <FaArrowCircleLeft className="text-2xl md:text-3xl text-white" />
          </Link>
        </div>

        <div>
          <span className="text-xl md:text-2xl font-semibold text-white">
            {character?.name}
          </span>
        </div>
      </header>

      {/* content */}
      <div className="w-11/12">
        <div className="flex flex-col items-center md:items-start md:flex-row gap-5 md:gap-10">
          <div className="h-72 w-72 flex-shrink-0  rounded-md overflow-hidden">
            <img
              height={250}
              width={250}
              loading="lazy"
              className="w-full h-full"
              src={
                character?.thumbnail.path + "." + character?.thumbnail.extension
              }
              alt=""
            />
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h1 className="text-2xl md:text-3xl text-gray-800 font-bold font-serif">
              {character?.name}
            </h1>
            <p className="mt-2 text-gray-700">
              {character?.description !== ""
                ? character?.description
                : "No description available"}
            </p>

            <a
              href={
                character?.urls.filter((url) => url.type === "detail")[0].url
              }
              className="mt-5 bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-600 transition-colors"
            >
              See details
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row mt-5 gap-2">
          <div className="md:w-1/3">
            <h1 className="text-2xl md:text-3xl text-gray-700 font-bold font-serif my-1 md:my-3">
              Comics
            </h1>
            {character?.comics.available ? (
              <ul className="list-disc list-inside pl-5">
                {character?.comics.items.slice(0, 5).map((comic) => (
                  <li key={comic.resourceURI}>
                    <span>{comic.name}</span>
                  </li>
                ))}
              </ul>
            ) : (
              "No comics available"
            )}
          </div>

          <div className="md:w-1/3">
            <h1 className="text-2xl md:text-3xl text-gray-700 font-bold font-serif my-1 md:my-3">
              Stories
            </h1>
            {character?.stories.available ? (
              <ul className="list-disc list-inside pl-5">
                {character?.stories.items.slice(0, 5).map((story) => (
                  <li key={story.resourceURI}>
                    <span>{story.name}</span>
                  </li>
                ))}
              </ul>
            ) : (
              "No stories available"
            )}
          </div>

          <div className="md:w-1/3">
            <h1 className="text-2xl md:text-3xl text-gray-700 font-bold font-serif my-1 md:my-3">
              Series
            </h1>
            {character?.series.available ? (
              <ul className="list-disc list-inside pl-5">
                {character?.series.items.slice(0, 5).map((series) => (
                  <li key={series.resourceURI}>
                    <span>{series.name}</span>
                  </li>
                ))}
              </ul>
            ) : (
              "No events available"
            )}
          </div>
        </div>
      </div>
      {/* content */}
      <Footer />
    </div>
  );
};
