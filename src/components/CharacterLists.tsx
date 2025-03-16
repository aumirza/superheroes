const ListTitle = ({ title }: { title: string }) => (
  <div className="flex">
    <h1 className="my-1 font-serif text-2xl font-bold text-gray-700 border-b-2 border-red-500 md:text-3xl md:my-3">
      {title}
    </h1>
  </div>
);

const List = ({
  items,
}: {
  items: detailedCharacter["comics" | "stories" | "series"]["items"];
}) => (
  <ul className="flex flex-col gap-0.5">
    {items.slice(0, 5).map((item) => (
      <li
        className="p-2 bg-gray-100 rounded cursor-pointer hover:bg-red-500 hover:text-white"
        key={item.resourceURI}
      >
        <span>{item.name}</span>
      </li>
    ))}
  </ul>
);

export const CharacterLists = ({
  character,
}: {
  character: detailedCharacter;
}) => {
  return (
    <div className="flex flex-col gap-2 mt-5 md:flex-row">
      <div className="md:w-1/3">
        <ListTitle title="Comics" />
        {character.comics.available ? (
          <List items={character.comics.items} />
        ) : (
          "No comics available"
        )}
      </div>

      <div className="md:w-1/3">
        <ListTitle title="Stories" />
        {character.stories.available ? (
          <List items={character.stories.items} />
        ) : (
          "No stories available"
        )}
      </div>

      <div className="md:w-1/3">
        <ListTitle title="Series" />
        {character.series.available ? (
          <List items={character.series.items} />
        ) : (
          "No Series available"
        )}
      </div>
    </div>
  );
};
