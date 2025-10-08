export const dynamic = "force-dynamic";
import { getUserSession } from "../../../lib/actions/getSession";
import { redirect } from "next/navigation";
import SignupForm from "../../../components/authForms/SignupForm";
export default async function Signup() {
  const session = await getUserSession();
  if (session?.user) {
    redirect("/");
  }
  return <SignupForm />;
}
