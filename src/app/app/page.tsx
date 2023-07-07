"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import DashboardApp from "@/components/dashboard/app";
import Image from "next/image";
export default function Dashboard() {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (session && status === "authenticated") {
    return <DashboardApp />;
  }

  if (status === "unauthenticated") {
    router.replace("/auth/signin");

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
