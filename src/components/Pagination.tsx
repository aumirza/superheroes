interface PBProps {
  text: string;
  highlight?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

const PaginationButton: React.FC<PBProps> = ({
  text,
  highlight,
  disabled,
  onClick,
  className,
}) => (
  <button
    disabled={disabled}
    onClick={onClick}
    className={
      "border rounded-md p-2 md:px-3 disabled:bg-gray-300" +
      " " +
      (highlight ? "bg-red-500 text-white" : "bg-white") +
      " " +
      className
    }
  >
    {text}
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
      <div className="text-center text-lg text-red-500">
        Page {currPage} of {totalPages}
      </div>
      <div className="flex gap-1">
        <PaginationButton
          text="First"
          disabled={currPage === 1}
          onClick={() => setCurrPage(1)}
        />

        <PaginationButton
          className="hidden md:block"
          onClick={() => setCurrPage(currPage - 1)}
          disabled={currPage === 1}
          text="Previous"
        />

        {new Array(currPage > buttonsToShow ? buttonsToShow : currPage - 1)
          .fill(1)
          .reverse()
          .map((_, i, arr) => (
            <PaginationButton
              key={currPage - arr.length + i}
              onClick={() => setCurrPage(currPage - i)}
              text={(currPage - arr.length + i).toString()}
            />
          ))}

        <PaginationButton highlight={true} text={currPage.toString()} />
        {new Array(
          totalPages - currPage > buttonsToShow
            ? buttonsToShow
            : totalPages - currPage
        )
          .fill(1)
          .map((_, i) => (
            <PaginationButton
              key={currPage + i + 1}
              onClick={() => setCurrPage(currPage + i + 1)}
              text={(currPage + i + 1).toString()}
            />
          ))}

        <PaginationButton
          className="hidden md:block"
          onClick={() => setCurrPage(currPage + 1)}
          disabled={currPage === totalPages}
          text="Next"
        />
        <PaginationButton
          text="Last"
          disabled={currPage === items.length}
          onClick={() => setCurrPage(totalPages)}
        />
      </div>
    </div>
  );
};
