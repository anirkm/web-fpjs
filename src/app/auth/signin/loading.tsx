import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex justify-center items-center flex-col space-y-6 last:m-auto h-[75vh] sm:w-[50vh]">
      <Skeleton 
        className="w-[60px] h-[60px] rounded-full"
      />
      <Skeleton className="h-[15px] w-[350px]"/>
      <Skeleton className="h-[12px] w-[300px]"/>
      <Skeleton className="h-[35px] w-[230px]"/>
      <Skeleton className="h-[13px] w-[150px]"/>
    </div>
  );
}
