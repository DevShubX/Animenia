import { Skeleton } from "../ui/skeleton";

const ReviewSkeleton = () => {
  return (
    <div className="grid grid-cols-5 gap-8 my-5 max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
      {[...Array(50)].map((item, index) => (
        <Skeleton className="flex-shrink-0 relative w-full h-[200px]" />
      ))}
    </div>
  )
}

export default ReviewSkeleton