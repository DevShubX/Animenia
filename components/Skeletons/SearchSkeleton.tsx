import { Skeleton } from "../ui/skeleton";

const SearchSkeleton = () => {
  return (
    <div className="grid grid-cols-7 max-xl:grid-cols-6 max-lg:grid-cols-5 max-md:grid-cols-4 max-sm:grid-cols-3 max-[400px]:grid-cols-2 gap-5 mt-5">
      {[...Array(20)].map((item, index) => (
        <Skeleton className="flex-shrink-0 relative w-[250px] h-[330px] max-md:w-[180px] max-md:h-[235px] max-sm:w-[170px] max-sm:h-[235px]" />
      ))}
    </div>
  );
};

export default SearchSkeleton;
