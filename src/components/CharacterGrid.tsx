import { motion, AnimatePresence } from "framer-motion";
import { CharacterItem } from "./CharacterItem";

interface CharacterGridProps {
  characters: character[];
  currentPage: number;
  perPage: number;
}

const gridVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export const CharacterGrid = ({
  characters,
  currentPage,
  perPage,
}: CharacterGridProps) => {
  if (!characters.length) {
    return (
      <div className="text-2xl text-center text-gray-500">No results found</div>
    );
  }

  return (
    <motion.div
      variants={gridVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3"
    >
      <AnimatePresence>
        {characters
          .slice(currentPage * perPage - perPage, currentPage * perPage)
          .map((character) => (
            <motion.div key={character.id} variants={itemVariants} layout>
              <CharacterItem character={character} />
            </motion.div>
          ))}
      </AnimatePresence>
    </motion.div>
  );
};
