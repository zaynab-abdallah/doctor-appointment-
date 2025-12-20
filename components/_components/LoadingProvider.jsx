"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Loading from "./Loading";

export default function LoadingProvider({ children }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const isInitialMount = useRef(true);

  useEffect(() => {
    // Skip loading on initial mount
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Show loading when route changes
    setLoading(true);
    
    // Hide loading after a short delay (adjust as needed)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [pathname, searchParams]);

  return (
    <>
      {loading && <Loading />}
      {children}
    </>
  );
}
