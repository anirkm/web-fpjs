"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import useSwr from "swr";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { fetcher } from "@/lib/utils";

import { Skeleton } from "../ui/skeleton";
import { Alert, AlertDescription } from "../ui/alert";

export default function ProfileTab() {
  const { data, isLoading, error } = useSwr("/api/profile", fetcher);

    if (isLoading) {
        return (
            <p>juss wait</p>
        )
    }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-bold">Profile</CardTitle>
        <CardDescription>This is you.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2">
          <Avatar>
            <AvatarImage src={data.member?.image} alt={data.member?.user?.username}/>
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="font-semibold">{data.member?.user?.global_name}</p>
            <p className="text-muted-foreground text-sm">@{data.member?.user?.username}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Skeleton className="h-9  w-[20%]" />
      </CardFooter>
    </Card>
  );
}
