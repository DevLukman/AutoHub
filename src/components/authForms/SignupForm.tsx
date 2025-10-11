"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import ListingInputContainer from "../../app/dashboard/_components/ListingInputContainer";
import { signUp } from "../../lib/actions/authAction";
import { authClient } from "../../lib/auth-client";
import { SignupSchema, TSignUpSchema } from "../../lib/Types";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Spinner } from "../ui/spinner";

export default function SignupForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(SignupSchema),
  });

  async function handleSignup(data: TSignUpSchema) {
    const results = await signUp(data);
    if (results?.success) {
      toast.success(results.message);
      router.push("/");
    } else {
      toast.error(results?.message);
    }
  }

  async function handleSocialLogin() {
    try {
      setIsGoogleLoading(true);
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (error) {
      setIsGoogleLoading(false);
      const e = error as Error;
      toast.error(e.message || "Failed to sign in with Google");
    }
  }

  return (
    <section className="mt-4 overflow-x-hidden px-4 sm:px-6 lg:px-8">
      <div className="bg-secondary mx-auto h-fit w-full max-w-[450px] p-6">
        <Link
          href="/"
          className="mt-8 flex items-center justify-center text-4xl font-black uppercase"
        >
          AutoHub
        </Link>
        <p className="text-subPrimary mt-4 text-center font-semibold">
          Welcome! Create your account to get started!
        </p>
        <form onSubmit={handleSubmit(handleSignup)}>
          <ListingInputContainer>
            <Label className="text-sm font-semibold" htmlFor="name">
              Name
            </Label>
            <Input
              {...register("name")}
              className="border-border border"
              id="name"
              type="text"
              placeholder="John Doe"
              disabled={isGoogleLoading || isSubmitting}
            />
            {errors.name?.message && (
              <span className="pl-1 text-sm text-red-500">
                {errors.name.message}
              </span>
            )}
          </ListingInputContainer>

          <ListingInputContainer>
            <Label className="text-sm font-semibold" htmlFor="email">
              Email
            </Label>
            <Input
              {...register("email")}
              className="border-border border"
              id="email"
              type="email"
              placeholder="john@example.com"
              disabled={isGoogleLoading || isSubmitting}
            />
            {errors.email?.message && (
              <span className="pl-1 text-sm text-red-500">
                {errors.email.message}
              </span>
            )}
          </ListingInputContainer>

          <ListingInputContainer>
            <Label className="text-sm font-semibold" htmlFor="password">
              Password
            </Label>
            <div className="relative">
              <Input
                {...register("password")}
                className="border-border border pr-10"
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Minimum 8 characters"
                disabled={isGoogleLoading || isSubmitting}
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

          <Button
            className="bg-btnBg text-secondary hover:bg-btnBg hover:text-secondary mt-4 w-full cursor-pointer font-semibold"
            type="submit"
            disabled={isSubmitting || isGoogleLoading}
          >
            {isSubmitting ? (
              <>
                <Spinner />
                Signing Up...
              </>
            ) : (
              "Sign Up"
            )}
          </Button>
          <Button
            className="bg-btnBg text-secondary hover:bg-btnBg hover:text-secondary mt-4 w-full cursor-pointer font-semibold"
            type="button"
            onClick={handleSocialLogin}
            disabled={isGoogleLoading || isSubmitting}
          >
            {isGoogleLoading ? (
              <>
                <Spinner />
                Signing Up with Google...
              </>
            ) : (
              <div className="flex items-center gap-3">
                <span>
                  <FcGoogle size={30} />
                </span>
                <span> Login with Google</span>
              </div>
            )}
          </Button>
        </form>

        <p className="text-subPrimary mt-6 text-center text-sm font-medium">
          Already have an account?{" "}
          <Link href="/login" className="text-btnBg text-sm">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}
