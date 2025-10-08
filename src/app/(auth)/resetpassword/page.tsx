export const dynamic = "force-dynamic";
import { Metadata } from "next";
import ResetPasswordForm from "../../../components/authForms/ResetpasswordForm";
import { getUserSession } from "../../../lib/actions/getSession";
import { redirect } from "next/navigation";
export const metadata: Metadata = {
  title: "Auto Hub | Reset password",
  description: "Your Best Automobile Marketplace",
};
export default async function ResetPassword() {
  const session = await getUserSession();
  if (session?.user) {
    redirect("/");
  }
  return <ResetPasswordForm />;
}
