"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import ListingInputContainer from "../../app/dashboard/_components/ListingInputContainer";
import { ResetPassword } from "../../lib/actions/authAction";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(20),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(20),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type TResetPasswordSchema = z.infer<typeof ResetPasswordSchema>;

export default function ResetPasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") as string;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TResetPasswordSchema>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  async function handleResetPassword(data: TResetPasswordSchema) {
    const result = await ResetPassword(data.password, token);
    if (result?.success) {
      toast.success(result.message as string);
      router.push("/login");
    } else {
      toast.error(result?.message as string);
    }
  }

  return (
    <section className="mt-4 overflow-x-hidden px-4 sm:px-6 lg:px-8">
      <div className="bg-secondary mx-auto w-full max-w-[450px] p-6">
        <Link
          href="/"
          className="mt-8 flex items-center justify-center text-4xl font-black uppercase"
        >
          AutoHub
        </Link>
        <p className="text-subPrimary mt-4 text-center font-semibold">
          Enter your new password to complete the reset
        </p>

        <form onSubmit={handleSubmit(handleResetPassword)}>
          <ListingInputContainer>
            <Label className="text-sm font-semibold" htmlFor="password">
              New Password
            </Label>
            <div className="relative">
              <Input
                {...register("password")}
                className="border-border border pr-10"
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Minimum 8 characters"
                disabled={isSubmitting}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.password?.message && (
              <span className="pl-1 text-sm text-red-500">
                {errors.password.message}
              </span>
            )}
          </ListingInputContainer>

          <ListingInputContainer>
            <Label className="text-sm font-semibold" htmlFor="confirmPassword">
              Confirm New Password
            </Label>
            <div className="relative">
              <Input
                {...register("confirmPassword")}
                className="border-border border pr-10"
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Repeat your new password"
                disabled={isSubmitting}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.confirmPassword?.message && (
              <span className="pl-1 text-sm text-red-500">
                {errors.confirmPassword.message}
              </span>
            )}
          </ListingInputContainer>

          <Button
            className="bg-btnBg text-secondary hover:bg-btnBg hover:text-secondary mt-4 w-full cursor-pointer font-semibold"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Resetting Password...
              </>
            ) : (
              "Reset Password"
            )}
          </Button>
        </form>

        <p className="text-subPrimary mt-4 text-center text-sm font-medium">
          Remember your password?{" "}
          <Link className="text-btnBg text-sm" href="/login">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}
