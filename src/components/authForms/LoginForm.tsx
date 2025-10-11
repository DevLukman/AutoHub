"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import ListingInputContainer from "../../app/dashboard/_components/ListingInputContainer";
import { Badge } from "../../components/ui/badge";
import { Checkbox } from "../../components/ui/checkbox";
import { Sigin } from "../../lib/actions/authAction";
import { authClient } from "../../lib/auth-client";
import { LoginSchema, TLoginSchema } from "../../lib/Types";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Spinner } from "../ui/spinner";

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [lastMethod, setLastMethod] = useState<string | null>(null);

  useEffect(() => {
    setLastMethod(authClient.getLastUsedLoginMethod());
  }, []);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TLoginSchema>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      remember: false,
    },
  });

  async function handleLogin(data: TLoginSchema) {
    const results = await Sigin(data);
    if (results.success) {
      toast.success(results.message);
      router.push("/");
    } else {
      toast.error(results.message);
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
          Welcome back! Login into your account!
        </p>
        <form onSubmit={handleSubmit(handleLogin)}>
          <ListingInputContainer>
            <div className="flex justify-between">
              <Label className="text-sm font-semibold" htmlFor="email">
                Email Address
              </Label>
              {lastMethod === "email" && (
                <Badge variant={"success"} className="text-[9px] text-white">
                  last used
                </Badge>
              )}
            </div>
            <Input
              {...register("email")}
              className="border-border border"
              id="email"
              type="email"
              placeholder="JohnDoe@example.com"
              disabled={isGoogleLoading || isSubmitting}
            />
            {errors.email?.message && (
              <span className="pl-1 text-sm text-red-500">
                {errors.email.message}
              </span>
            )}
          </ListingInputContainer>

          <ListingInputContainer>
            <div className="flex items-center justify-between">
              <Label className="text-sm font-semibold" htmlFor="password">
                Password
              </Label>
              <Link href="/forgetpassword" className="text-btnBg text-sm">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Input
                {...register("password")}
                className="border-border border pr-10 disabled:cursor-not-allowed"
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

          <div className="mt-4 flex items-center gap-1">
            <Controller
              name="remember"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id="remember"
                  checked={field.value}
                  className="disabled:cursor-not-allowed"
                  onCheckedChange={field.onChange}
                  disabled={isGoogleLoading || isSubmitting}
                />
              )}
            />
            <Label htmlFor="remember">Remember Me</Label>
          </div>

          <Button
            className="bg-btnBg text-secondary hover:bg-btnBg hover:text-secondary mt-4 w-full cursor-pointer font-semibold disabled:cursor-not-allowed"
            type="submit"
            disabled={isSubmitting || isGoogleLoading}
          >
            {isSubmitting ? (
              <>
                <Spinner />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </Button>
          <div className="relative w-full">
            <Button
              className="bg-btnBg text-secondary hover:bg-btnBg hover:text-secondary relative mt-4 w-full cursor-pointer font-semibold disabled:cursor-not-allowed"
              type="button"
              onClick={handleSocialLogin}
              disabled={isGoogleLoading || isSubmitting}
            >
              {isGoogleLoading ? (
                <>
                  <Spinner />
                  Logging in with Google...
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
            {lastMethod === "google" && (
              <Badge
                variant={"success"}
                className="absolute top-[50%] right-2 text-[9px] text-white"
              >
                last used
              </Badge>
            )}
          </div>
        </form>
        <p className="text-subPrimary mt-6 text-center text-sm font-medium">
          New to AutoHub?{" "}
          <Link className="text-btnBg text-sm" href="/signup">
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
}
