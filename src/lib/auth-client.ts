import { createAuthClient } from "better-auth/react";
import { lastLoginMethodClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
  plugins: [lastLoginMethodClient()],
});

export const {
  useSession,
  signIn,
  signOut,
  signUp,
  isLastUsedLoginMethod,
  getLastUsedLoginMethod,
} = authClient;
