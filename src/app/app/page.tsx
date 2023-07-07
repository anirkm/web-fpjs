"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import DashboardApp from "@/components/dashboard/app";

export default function Dashboard() {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (session && status === "authenticated") {
    return <DashboardApp />;
  }

  if (status === "unauthenticated") {
    router.push("/auth/signin");

    return (
        <div className="flex justify-center items-center h-screen">
            <p className="text-2xl font-semibold">Redirecting...</p>
        </div>
    )
  }
}
