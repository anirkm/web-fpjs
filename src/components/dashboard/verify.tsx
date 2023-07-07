"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import ConfettiExplosion from "react-confetti-explosion";

import useSwr from "swr";
import { Skeleton } from "../ui/skeleton";
import { useState } from "react";
import {
  ReloadIcon,
  CheckCircledIcon,
  CrossCircledIcon,
  InfoCircledIcon,
  UpdateIcon,
} from "@radix-ui/react-icons";
import { useVisitorData } from "@fingerprintjs/fingerprintjs-pro-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { set } from "zod";
import Image from "next/image";

const fetcher = (url: string) =>
  fetch(url).then((res) => res.json());

export default function VerifyTab() {
  const {
    data: data,
    error: error,
    isLoading: isLoading,
  } = useSwr("/api/user/", fetcher);

  console.log(data);

  const [isVerifying, setIsVerifying] = useState(false);

  const [verificationStatus, setVerificationStatus] = useState<{
    fp: {
      status: "pending" | "success" | "error";
      errors: string[];
    };
    discord: {
      status: "pending" | "success" | "error";
      errors: string[];
    };
  }>({
    fp: {
      status: "pending",
      errors: [],
    },
    discord: {
      status: "pending",
      errors: [],
    },
  });

  const [verdict, setVerdict] = useState<{
    status: "pending" | "success" | "error" | "flagged";
    errors: string[];
  }>({
    status: "pending",
    errors: [],
  });

  const {
    isLoading: fpIsLoading,
    error: fpError,
    data: fpData,
    getData,
  } = useVisitorData({ extendedResult: false }, { immediate: false });

  const handleVerification = async () => {
    setIsVerifying(true);

    const { requestId } = await getData({ ignoreCache: false });

    const fp = await fetch("/api/verify", {
      method: "POST",
      body: JSON.stringify({ _: requestId }),
    });

    if (!fp.ok)
      return setVerificationStatus({
        ...verificationStatus,
        fp: {
          status: "error",
          errors: Array.from(
            new Set([
              ...verificationStatus.fp.errors,
              "Browser verification endpoint failed.",
            ])
          ),
        },
      });

    const fpData = await fp.json();

    setVerificationStatus({
      ...verificationStatus,
      fp: {
        status: "success",
        errors: [],
      },
    });

    setVerificationStatus({
      fp: {
        status: "success",
        errors: [],
      },
      discord: {
        status: "success",
        errors: [],
      },
    });

    await new Promise((resolve) => setTimeout(resolve, 3000));

    setVerdict({
      status: fpData._v,
      errors: [],
    });
  };

  if (fpError) {
    setVerificationStatus({
      ...verificationStatus,
      fp: {
        status: "error",
        errors: Array.from(
          new Set([
            ...verificationStatus.fp.errors,
            "Browser verification mounting failed.",
          ])
        ),
      },
    });
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-bold">
            Server verification
          </CardTitle>
          <CardDescription>
            Here you can begin the verification process
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Skeleton className="h-4 w-[60%]" />
          <Skeleton className="h-4 w-[30%]" />
          <Skeleton className="h-4 w-[37%]" />
          <Skeleton className="h-4 w-[33%]" />
          <Skeleton className="h-4 w-[40%]" />
          <Skeleton className="h-4 w-[37%]" />
          <Skeleton className="h-4 w-[33%]" />
        </CardContent>
        <CardFooter>
          <Skeleton className="h-9  w-[20%]" />
        </CardFooter>
      </Card>
    );
  }

  if (error || !data?.session) {
    return <p>An unexpected error has occured. (refresh the page)</p>;
  }

  switch (verdict.status) {
    case "success":
      return (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-bold">
              Server verification
            </CardTitle>
            <CardDescription>
              Here you can begin the verification process
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Alert>
              <AlertDescription>
                <div className="flex flex-col space-y-2 items-center">
                  <Image
                    src="/v.png"
                    alt="logo"
                    width={70}
                    height={70}
                    className="mt-2 transition-transform hover:scale-[1.05]"
                  />
                  <ConfettiExplosion />
                  <p className="text-lg font-bold text-center">
                    You&apos;ve been successfully verified!
                  </p>
                  <div className="flex flex-col space-y-0.5 text-center ">
                    <p className="text-muted-foreground">
                      You have access to the server now.
                    </p>
                    <p className="text-muted-foreground">
                      If you still encounter problems, contact a staff member.
                    </p>
                  </div>
                  <div className="text-center mt-1">
                    <p className="text-muted-foreground text-xs">
                      fee8054354b30bb6
                    </p>
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      );
    case "error":
      return (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-bold">
              Server verification
            </CardTitle>
            <CardDescription>
              Here you can begin the verification process
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-lg">verdict {verdict.status}</p>
          </CardContent>
        </Card>
      );
    case "flagged":
      return (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-bold">
              Server verification
            </CardTitle>
            <CardDescription>
              Here you can begin the verification process
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-lg">verdict {verdict.status}</p>
          </CardContent>
        </Card>
      );
    default:
      break;
  }

  if (data.session.isVerified) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-bold">
            Server verification
          </CardTitle>
          <CardDescription>
            Here you can begin the verification process
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Alert>
            <AlertDescription>
              <p className="font-semibold">
                • You&apos;re already verified, nothing to do here.
              </p>
            </AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter className="flex flex-col items-start space-y-2">
          <p className="text-sm text-muted-foreground">
            If you&apos;re not verified on the server or still can&apos;t access
            any channels, please join a verification channel and a staff member
            will assist you.
          </p>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-bold">Server verification</CardTitle>
        <CardDescription>
          Here you can begin the verification process
        </CardDescription>
      </CardHeader>
      {!isVerifying ? (
        <CardContent className="space-y-2">
          <p className="text-base">
            Before you start the verification make sure:
          </p>
          <p className="text-sm text-muted-foreground font-semibold">
            • You&apos;re not using private browser
          </p>
          <p className="text-sm text-muted-foreground font-semibold">
            • You&apos;re not using a VPN or any from of proxy.
          </p>
          <p className="text-sm text-muted-foreground font-semibold">
            • You&apos;re not using using a disposable email address for your
            discord account.
          </p>
          <p className="text-sm text-muted-foreground font-semibold">
            • Not following above conditions will result in a unsuccessful
            verification.
          </p>
        </CardContent>
      ) : (
        <CardContent className="space-y-2">
          <p className="text-base">
            Please wait while we verify your browser and discord account.
          </p>
          {Object.keys(verificationStatus).map((key) => (
            <div key={key} className="flex space-y-7">
              <Alert className="flex flex-col [&:has(svg)]:pl-2 transition-transform hover:scale-[1.02]">
                <div className="flex space-x-2">
                  {verificationStatus[key as "fp"].status === "pending" ? (
                    <UpdateIcon className="w-5 h-5 animate-spin" />
                  ) : verificationStatus[key as "fp"].status === "success" ? (
                    <CheckCircledIcon className="w-5 h-5 fill-blue-500" />
                  ) : verificationStatus[key as "discord"].status ===
                    "error" ? (
                    <CrossCircledIcon className="w-5 h-5" />
                  ) : (
                    <UpdateIcon className="w-5 h-5 animate-spin" />
                  )}
                  <p /* @ts-ignore */>
                    {key}: {verificationStatus[key as "fp"].status}
                  </p>
                </div>
              </Alert>
            </div>
          ))}
        </CardContent>
      )}
      <CardFooter className="flex flex-col items-start space-y-2">
        <Button
          onClick={handleVerification}
          className="hover:scale-[1.02] transition-transform"
          disabled={isVerifying}
        >
          {isVerifying && <ReloadIcon className="w-5 h-5 mr-2 animate-spin" />}
          {isVerifying ? "Verifying..." : "Begin Verification"}
        </Button>
        <p className="text-xs text-muted-foreground">
          This process may take up to 2 minutes.
        </p>
      </CardFooter>
    </Card>
  );
}
