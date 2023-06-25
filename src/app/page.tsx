import { FpjsProvider } from "@fingerprintjs/fingerprintjs-pro-react";
import Fingerprint from "@/components/Fingerprint";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <FpjsProvider
        loadOptions={{
          apiKey: "qG86ITS1SNYy2UG8NtL1",
          endpoint: "https://satanic.world/9UdfU9zDc1LEBpMF/2GhHG2qv16YjSSsm",
          scriptUrlPattern:
            "https://satanic.world/9UdfU9zDc1LEBpMF/2cF9r13mPV0vbeIk?apiKey=<apiKey>&version=<version>&loaderVersion=<loaderVersion>",
        }}
      >
        <Fingerprint />
      </FpjsProvider>
    </main>
  );
}
