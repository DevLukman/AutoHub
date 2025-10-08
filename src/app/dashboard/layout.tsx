export const dynamic = "force-dynamic";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { DashboardSidebar } from "../../app/dashboard/_components/DashboardSidebar";
import { SidebarInset, SidebarProvider } from "../../components/ui/sidebar";
import { sellerProfile } from "../../lib/actions/createSeller";
import DashboardHeader from "./_components/DashboardHeader";
import { getUserSession } from "../../lib/actions/getSession";
export const metadata: Metadata = {
  title: "Auto Hub | Dashboard",
  description: "Your Best Automobile Marketplace",
};
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const alreadyASeller = await sellerProfile();
  if (!alreadyASeller) {
    redirect("/becomeSeller");
  }

  const session = await getUserSession();

  return (
    <SidebarProvider>
      <DashboardSidebar session={session || null} />
      <SidebarInset>
        <DashboardHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
