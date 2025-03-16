import { Button } from "@/components/ui/button";
import { SortAscIcon, SortDescIcon } from "lucide-react";

interface CharacterSortProps {
  sortAsc: boolean;
  onSort: () => void;
}

export const CharacterSort = ({ sortAsc, onSort }: CharacterSortProps) => {
  return (
    <div className="flex items-center text-gray-600">
      <span className="text-lg font-semibold">Name</span>
      <Button variant="ghost" className="cursor-pointer" onClick={onSort}>
        {sortAsc ? (
          <SortAscIcon className="ml-0.5" />
        ) : (
          <SortDescIcon className="ml-0.5" />
        )}
      </Button>
    </div>
  );
};
