import { useEffect, useState } from "react";

export function useClientside() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") setIsClient(true);
  }, []);
}
