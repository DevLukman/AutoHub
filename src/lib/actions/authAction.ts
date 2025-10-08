"use server";
import { headers } from "next/headers";
import { auth } from "../auth";
import {
  ForgetPasswordSchema,
  LoginSchema,
  SignupSchema,
  TForgetPasswordSchema,
  TLoginSchema,
  TSignUpSchema,
} from "../Types";

export async function Sigin(data: TLoginSchema) {
  const validation = LoginSchema.safeParse(data);
  if (!validation.success) throw new Error("Not a valid Information");

  try {
    await auth.api.signInEmail({
      body: {
        ...validation.data,
      },
    });
    return { success: true, message: "Login successfully" };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || "Please check your information",
    };
  }
}

export async function signUp(data: TSignUpSchema) {
  const validation = SignupSchema.safeParse(data);
  if (!validation.success) throw new Error("Not a valid information");
  try {
    await auth.api.signUpEmail({
      body: {
        ...validation.data,
      },
    });
    return { success: true, message: "Signup successful" };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || "There was an error with Signup",
    };
  }
}

export async function logout() {
  try {
    await auth.api.signOut({ headers: await headers() });
    return { success: true, message: "Log out successful" };
  } catch (error) {
    const e = error as Error;
    return { success: false, message: e.message || "Failed to Log out" };
  }
}

export async function ForgetPassword(data: TForgetPasswordSchema) {
  const validation = ForgetPasswordSchema.safeParse(data);
  if (!validation.success) throw new Error("Not a valid email");

  try {
    await auth.api.forgetPassword({
      body: {
        ...validation.data,
        redirectTo: "/resetpassword",
      },
    });
    return { success: true, message: "Password reset email sent" };
  } catch (error) {
    const e = error as Error;
    return { success: false, message: e.message || "There was an error" };
  }
}

export async function ResetPassword(newPassword: string, token: string) {
  try {
    await auth.api.resetPassword({
      body: {
        newPassword,
        token,
      },
    });
    return { success: true, message: "Password reset successfully" };
  } catch (error) {
    const e = error as Error;
    return { success: false, message: e || "Password reset not successful" };
  }
}
