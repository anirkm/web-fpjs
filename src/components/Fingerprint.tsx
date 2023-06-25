/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useVisitorData } from "@fingerprintjs/fingerprintjs-pro-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import useSWR, { useSWRConfig } from "swr";

const fetcher = (url: string, data: any) =>
  fetch(url, {
    method: data ? "POST" : "GET",
    body: data ? JSON.stringify(data) : undefined,
  }).then((res) => res.json());

interface visitorData {
  visitorId: string;
  requestId: string;
}

export default function Fingerprint() {
  const [visitorData, setVisitorData] = useState<visitorData | null>(null);

  const { isLoading, error, data, getData } = useVisitorData(
    { extendedResult: false },
    { immediate: true }
  );

  const {
    isLoading: isLoadingFp,
    error: errorFp,
    data: dataFp,
    mutate,
    isValidating,
  } = useSWR(
    visitorData ? "/api/requestid" : null,
    (url) => fetcher(url, { id: visitorData?.requestId }),
    { refreshInterval: 3000 }
  );

  useEffect(() => {
    if (data) {
      setVisitorData({
        visitorId: data.visitorId,
        requestId: data.requestId,
      });
    }
  }, [data]);

  return (
    <div>
      <Button
        variant="default"
        disabled={isLoading}
        onClick={async () => {
          await getData({ ignoreCache: false });
        }}
      >
        Reload data
      </Button>
      <p>
        VisitorId: {isLoading || isLoadingFp ? "Loading..." : data?.visitorId}
      </p>
      <p>Full visitor data:</p>
      <pre>{error ? error.message : JSON.stringify(data, null, 2)}</pre>
      <p>
        Request ID:{" "}
        {isLoadingFp
          ? "Loading..."
          : dataFp?.products.identification.data.requestId}
      </p>
      <p>Full Request data:</p>
      <pre>{errorFp ? errorFp.message : JSON.stringify(dataFp, null, 2)}</pre>
    </div>
  );
}
