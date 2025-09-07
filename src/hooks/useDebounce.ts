import { useEffect, useRef, useState } from "react";

export function useDebounce(value: string, delay: number) {
  const [debounceValue, setDebounceValue] = useState(value);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(
    function () {
      if (delay === 0) {
        setDebounceValue(value);
        return;
      }

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setDebounceValue(value);
      }, delay);

      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
      };
    },
    [delay, value],
  );
  useEffect(function () {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debounceValue;
}
