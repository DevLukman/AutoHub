"use client";

import { useEffect, useRef } from "react";

export function useOutsideClick(close, capturingPhase: boolean = true) {
  const closeRef = useRef(null);
  useEffect(
    function () {
      function handleClick(e) {
        if (closeRef.current && !closeRef.current.contains(e.target)) {
          close();
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
