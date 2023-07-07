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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import VerifyTab from "./verify";
import AppealTab from "./appeal";
import { Toaster } from "../ui/toaster";
import { FpjsProvider } from "@fingerprintjs/fingerprintjs-pro-react";

export default function DashboardApp() {
  const { data: session, status } = useSession();

  console.log(session, status)

  return (
    <div className="flex justify-center flex-col sm:m-auto sm:mt-[50px] mt-8 mx-3 sm:w-[75vh] space-y-3">
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
            <div className="flex items-center">
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
          <FpjsProvider
            loadOptions={{
              apiKey: "qG86ITS1SNYy2UG8NtL1",
              endpoint:
                "https://satanic.world/9UdfU9zDc1LEBpMF/2GhHG2qv16YjSSsm",
              scriptUrlPattern:
                "https://satanic.world/9UdfU9zDc1LEBpMF/2cF9r13mPV0vbeIk?apiKey=<apiKey>&version=<version>&loaderVersion=<loaderVersion>",
            }}
          >
            <VerifyTab />
          </FpjsProvider>
        </TabsContent>
        <TabsContent value="appeal">
          <AppealTab />
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
      <Toaster />
    </div>
  );
}
