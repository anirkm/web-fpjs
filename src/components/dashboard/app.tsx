"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession, signIn, signOut } from "next-auth/react";
import { BsDiscord } from "react-icons/bs";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getServerSession } from "next-auth";
import SingIn from "@/components/Signin";
import { Separator } from "@/components/ui/separator";

export default function DashboardApp() {
  const { data: session, status } = useSession();

  return (
    <div className="flex justify-center flex-col m-auto h-[75vh] sm:w-[75vh] space-y-3">
      <Alert className="transition-transform hover:scale-[1.02] w-full">
        <AlertDescription>
          <div className="flex justify-between">
            <div className="flex justify-start space-x-2">
              <Avatar>
                <AvatarImage
                  src={session?.user?.image || ""}
                  alt={`@${session?.user?.name || "uh"}`}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <p className="font-semibold">Yatsuki</p>
                <p className="text-xs text-slate-400">{`@${
                  session?.user?.name || "wesh"
                }`}</p>
              </div>
            </div>
            <div className="">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant={"destructive"}>Sign Out</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will log you out of your account. and invalidate all
                      other sessions.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => signOut()}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </AlertDescription>
      </Alert>
      <Tabs defaultValue="verify">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="verify">Verify</TabsTrigger>
          <TabsTrigger value="appeal">Appeal</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>
        <TabsContent value="verify">
          <Card>
            <CardHeader>
              <CardTitle>Verify</CardTitle>
              <CardDescription>
                Make changes to your account here.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>hamid</p>
            </CardContent>
            <CardFooter>
              <Button>Save changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="appeal">
          <Card>
            <CardHeader>
              <CardTitle>Appeal</CardTitle>
              <CardDescription>
                Make changes to your account here.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>hamid</p>
            </CardContent>
            <CardFooter>
              <Button variant={"destructive"}>Save changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>
                Make changes to your account here.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>hamid</p>
            </CardContent>
            <CardFooter className="flex space-x-2">
              <Button variant={"destructive"}>Save changes</Button>
              <Button variant={"destructive"}>Save changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      <p className="text-center text-slate-300 text-xs">
        stop playing with em rioooot (like graah)
      </p>
    </div>
  );
}
