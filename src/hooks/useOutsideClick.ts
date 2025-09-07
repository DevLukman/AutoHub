"use client";

import { Dispatch, SetStateAction, useEffect, useRef } from "react";

export function useOutsideClick(
  close: Dispatch<SetStateAction<boolean>>,
  capturingPhase: boolean = true,
) {
  const closeRef = useRef(null);
  useEffect(
    function () {
      function handleClick(e: MouseEvent) {
        if (closeRef.current && !closeRef.current.contains(e.target)) {
          close(false);
        }
      }
      document.addEventListener("click", handleClick, capturingPhase);
      return () =>
        document.removeEventListener("click", handleClick, capturingPhase);
    },
    [capturingPhase, close],
  );

  return closeRef;
}
