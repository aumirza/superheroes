import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronLeftIcon, ForwardIcon } from "lucide-react";
import { FC, PropsWithChildren } from "react";

interface PBProps {
  highlight?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

const PaginationButton: FC<PropsWithChildren<PBProps>> = ({
  highlight,
  disabled,
  onClick,
  className,
  children,
}) => (
  <button
    disabled={disabled}
    onClick={onClick}
    className={cn(
      "flex items-center justify-center border rounded p-2 md:px-3 disabled:bg-gray-300 cursor-pointer transition-all duration-100 ease-in-out disabled:text-black disabled:cursor-not-allowed gap-1",
      highlight
        ? "bg-red-500 text-white hover:bg-red-400"
        : "bg-white hover:bg-red-500 hover:text-white",
      className
    )}
  >
    {children}
  </button>
);

interface Props {
  items: any[];
  perPage: number;
  currPage: number;
  setCurrPage: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  items,
  perPage,
  currPage,
  setCurrPage,
}) => {
  const totalPages = Math.ceil(items.length / perPage);
  const buttonsToShow = 2;

  return (
    <div className="">
      <div className="text-lg text-center text-red-500">
        Page {currPage} of {totalPages}
      </div>
      <div className="flex gap-1">
        <PaginationButton
          disabled={currPage === 1}
          onClick={() => setCurrPage(1)}
        >
          <ForwardIcon className="rotate-180" />
          <span>First</span>
        </PaginationButton>

        <PaginationButton
          className="hidden md:flex"
          onClick={() => setCurrPage(currPage - 1)}
          disabled={currPage === 1}
        >
          <ChevronLeft />
          <span>Previous</span>
        </PaginationButton>

        {Array.from({ length: Math.min(buttonsToShow, currPage - 1) })
          .map((_, i) => currPage - (i + 1))
          .reverse()
          .map((pageNum) => (
            <PaginationButton
              key={pageNum}
              onClick={() => setCurrPage(pageNum)}
            >
              {pageNum.toString()}
            </PaginationButton>
          ))}

        <PaginationButton highlight={true}>
          {currPage.toString()}
        </PaginationButton>
        {Array.from({ length: Math.min(buttonsToShow, totalPages - currPage) })
          .map((_, i) => currPage + (i + 1))
          .map((pageNum) => (
            <PaginationButton
              key={pageNum}
              onClick={() => setCurrPage(pageNum)}
            >
              {pageNum.toString()}
            </PaginationButton>
          ))}

        <PaginationButton
          className="hidden md:flex"
          onClick={() => setCurrPage(currPage + 1)}
          disabled={currPage === totalPages}
        >
          <span>Next</span>
          <ChevronLeftIcon className="rotate-180" />
        </PaginationButton>
        <PaginationButton
          disabled={currPage === items.length}
          onClick={() => setCurrPage(totalPages)}
        >
          <span>Last</span>
          <ForwardIcon />
        </PaginationButton>
      </div>
    </div>
  );
};
