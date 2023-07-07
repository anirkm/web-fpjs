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
  }
}
