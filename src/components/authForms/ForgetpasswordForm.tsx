"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ListingInputContainer from "../../app/dashboard/_components/ListingInputContainer";
import { ForgetPassword } from "../../lib/actions/authAction";
import { ForgetPasswordSchema, TForgetPasswordSchema } from "../../lib/Types";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function ForgetPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TForgetPasswordSchema>({
    resolver: zodResolver(ForgetPasswordSchema),
  });

  async function handleForgetPassword(data: TForgetPasswordSchema) {
    const result = await ForgetPassword(data);
    if (result.success) {
      toast.success(result.message as string);
    } else {
      toast.error(result.message as string);
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
          Enter your email to reset your password
        </p>

        <form onSubmit={handleSubmit(handleForgetPassword)}>
          <ListingInputContainer>
            <Label className="text-sm font-semibold" htmlFor="email">
              Email Address
            </Label>
            <Input
              {...register("email")}
              className="border-border border"
              id="email"
              type="email"
              placeholder="john@example.com"
              disabled={isSubmitting}
            />
            {errors.email?.message && (
              <span className="pl-1 text-sm text-red-500">
                {errors.email.message}
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
                Sending Reset Link...
              </>
            ) : (
              "Send Reset Link"
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-subPrimary text-sm font-medium">
            Remember your password?{" "}
            <Link className="text-btnBg text-sm" href="/login">
              Login
            </Link>
          </p>
          <p className="text-subPrimary mt-2 text-sm font-medium">
            New to AutoHub?{" "}
            <Link className="text-btnBg text-sm" href="/signup">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
