"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSession, signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Suspense } from "react";

export default function SingIn() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [isClicked, setIsClicked] = useState(false);



  if (session && status === "authenticated") {
    router.push("/auth/signin");
    return (
      <>
        <p>already logined</p>
      </>
    );
  }

  return (
    <div className="flex justify-center flex-col m-auto h-[75vh] sm:w-[50vh] space-y-3">
      <Card className="flex flex-col justify-center items-center">
        <CardHeader className="flex flex-col justify-center items-center space-y-2">
          <Image src="/11pm_logo.gif" alt="logo" width={60} height={60} />
          <p className="text-2xl font-bold">Login to your account</p>
          <p className="text-center text-slate-400">
            Click on the button below
          </p>
        </CardHeader>
        <CardContent>
          <Button
            disabled={isClicked}
            className="w-[20vh] font-semibold hover:scale-[1.06] transition-transform"
            onClick={() => {
              setIsClicked(true);
              signIn("discord");
            }}
          >
            {isClicked && <ReloadIcon className="w-5 h-5 mr-2 animate-spin" />}
            Discord
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col justify-center items-center space-y-2">
          <p className="text-center text-slate-400 text-sm">
            Trouble signin-in?{" "}
            <Link
              href={"https://discord.gg/11pms"}
              rel="noopener noreferrer"
              target="_blank"
              className="hover:font-semibold transition-transform"
            >
              Contact support.
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
