"use client";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
type ErrorBoundary = {
  error: Error;
  reset: () => void;
};

export default function ErrorBoundary({ error, reset }: ErrorBoundary) {
  const router = useRouter();
  function reload() {
    startTransition(() => {
      router.refresh();
      reset();
    });
  }
  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center gap-4">
      <h1 className="font-nosifer text-center text-sm text-[red]">
        {error.message || "something went wrong"}
      </h1>
      <button
        onClick={reload}
        className="text-secondary font-secondary border-secondary cursor-pointer rounded-sm border-2 px-5 py-2 text-base uppercase hover:scale-[1.2]"
      >
        Try Again
      </button>
    </div>
  );
}
