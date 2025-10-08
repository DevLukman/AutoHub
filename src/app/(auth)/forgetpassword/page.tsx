export const dynamic = "force-dynamic";

import { Metadata } from "next";
import { redirect } from "next/navigation";
import ForgetPasswordForm from "../../../components/authForms/ForgetpasswordForm";
import { getUserSession } from "../../../lib/actions/getSession";
export const metadata: Metadata = {
  title: "Auto Hub | Forget password",
  description: "Your Best Automobile Marketplace",
};

export default async function ForgetPassword() {
  const session = await getUserSession();
  if (session?.user) {
    redirect("/");
  }
  return <ForgetPasswordForm />;
}
