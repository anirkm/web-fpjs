import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex justify-center flex-col m-auto h-[75vh] sm:w-[50vh] space-y-3">
      <Skeleton 
        className="w-[60px] h-[60px] rounded-full"
      />
      <Skeleton className="h-[5px] w-[400px]"/>
      <Skeleton className="h-[2px] w-[350px]"/>
      <Skeleton className="h-[5px] w-[330px]"/>
      <Skeleton className="h-[3px] w-[200px]"/>
    </div>
  );
}
