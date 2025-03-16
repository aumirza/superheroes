export const CharacterSkeleton = () => {
  return (
    <div className="flex flex-col justify-center w-11/12">
      <div className="flex flex-col items-center gap-5 md:flex-row md:items-start md:gap-10">
        <div className="flex-grow">
          <div className="bg-gray-300 rounded size-96 animate-pulse" />
        </div>

        <div className="relative flex flex-col items-center w-11/12 gap-5 md:items-start">
          <div className="w-48 h-8 bg-gray-300 rounded animate-pulse" />
          <div className="w-full h-24 bg-gray-300 rounded animate-pulse" />
          <div className="w-32 h-10 bg-gray-300 rounded-md animate-pulse" />
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-5 md:flex-row">
        {[1, 2, 3].map((i) => (
          <div key={i} className="md:w-1/3">
            <div className="w-32 h-8 mb-2 bg-gray-300 rounded animate-pulse" />
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map((j) => (
                <div
                  key={j}
                  className="w-full h-10 bg-gray-300 rounded animate-pulse"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
