"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import SingIn from "@/components/Signin";

export default function Page() {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "unauthenticated") {
    return <SingIn />;
  }

  if (session && status === "authenticated") {
    router.replace("/app");
    return (
      <div className="flex justify-center h-screen flex-col items-center space-y-2">
        <Image
          alt="loading"
          src={"https://cdn.satanic.world/assets/loading.gif"}
          width={128}
          height={128}
        ></Image>
        <p className="text-2xl font-semibold">Redirecting...</p>
      </div>
    );
  }
}
