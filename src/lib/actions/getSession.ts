import { auth } from "../auth";
import { headers } from "next/headers";
import { cache } from "react";

export const getUserSession = cache(async () => {
  try {
    return await auth.api.getSession({ headers: await headers() });
  } catch (error) {
    console.error("Session fetch error:", error);
    return null;
  }
});
