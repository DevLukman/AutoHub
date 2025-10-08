export const dynamic = "force-dynamic";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import LoginForm from "../../../components/authForms/LoginForm";
import { getUserSession } from "../../../lib/actions/getSession";
export const metadata: Metadata = {
  title: "Auto Hub | Login",
  description: "Your Best Automobile Marketplace",
};
export default async function Login() {
  const session = await getUserSession();
  if (session?.user) {
    redirect("/");
  }
  return <LoginForm />;
}
