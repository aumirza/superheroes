import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { marvelApiService } from "../services";
import { Footer } from "../components/Footer";
import { CharacterSkeleton } from "../components/CharacterSkeleton";
import { CharacterHeader } from "../components/Header";
import { CharacterContent } from "../components/CharacterContent";
import { CharacterLists } from "../components/CharacterLists";

export const Character = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState<detailedCharacter>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    marvelApiService
      .getCharacterById(parseInt(id as string))
      .then((character) => {
        setCharacter(character);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="flex flex-col items-center min-h-screen gap-5 bg-gray-200">
      <CharacterHeader name={character?.name} />

      {loading ? (
        <CharacterSkeleton />
      ) : character ? (
        <div className="flex flex-col justify-center w-11/12">
          <CharacterContent character={character} />
          <CharacterLists character={character} />
        </div>
      ) : null}

      <Footer />
    </div>
  );
};
