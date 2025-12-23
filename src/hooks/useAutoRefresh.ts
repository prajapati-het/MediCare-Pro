import { useEffect } from "react";

/**
 * useAutoRefresh
 * @param callback - function to run on every interval
 * @param interval - refresh interval in milliseconds
 */
export function useAutoRefresh(callback: () => void, interval: number = 60000) {
  useEffect(() => {
    const timer = setInterval(() => {
      callback();
    }, interval);

    return () => clearInterval(timer);
  }, [callback, interval]);
}
