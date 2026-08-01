import { useCallback, useEffect, useState } from "react";
import type { DetectionResult } from "@/lib/crop-data";

const KEY = "prakriti.history";

function read(): DetectionResult[] {
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as DetectionResult[]) : [];
  } catch {
    return [];
  }
}

export function useDetectionHistory() {
  const [history, setHistory] = useState<DetectionResult[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setHistory(read());
    setLoaded(true);
  }, []);

  const add = useCallback((result: DetectionResult) => {
    setHistory((prev) => {
      const next = [result, ...prev].slice(0, 50);
      window.localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const clear = useCallback(() => {
    window.localStorage.removeItem(KEY);
    setHistory([]);
  }, []);

  return { history, loaded, add, clear };
}
