"use client";

import LoadingProvider from "../components/_components/LoadingProvider";

export default function Template({ children }: { children: React.ReactNode }) {
  return <LoadingProvider>{children}</LoadingProvider>;
}
