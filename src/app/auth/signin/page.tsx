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
  }
}
