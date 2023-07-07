"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import SingIn from "@/components/Signin";

export default function Page() {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "unauthenticated") {
    return <SingIn />;
  }

  if (session && status === "authenticated") {
    router.push("/app");
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl font-semibold">Redirecting...</p>
      </div>
    );
  }
}
