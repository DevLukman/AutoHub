"use client";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
export function useOutsideClick(
  close: Dispatch<SetStateAction<boolean>>,
  capturingPhase: boolean = true,
) {
  const closeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        closeRef.current &&
        e.target instanceof Node &&
        !closeRef.current.contains(e.target)
      ) {
        close(false);
      }
    }

    document.addEventListener("click", handleClick, capturingPhase);
    return () =>
      document.removeEventListener("click", handleClick, capturingPhase);
  }, [capturingPhase, close]);

  return closeRef;
}
