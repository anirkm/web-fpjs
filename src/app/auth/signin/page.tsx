"use client";


import { useSession} from "next-auth/react";
import SingIn from "@/components/Signin";
import DashboardApp from "@/components/dashboard/app";


export default function Page() {
  const { data: session, status } = useSession();

  if (status === "unauthenticated") {
    return <SingIn />;
  }

  if (session && status === "authenticated") {
    return <DashboardApp />;
  }
}
