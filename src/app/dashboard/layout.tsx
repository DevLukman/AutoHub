import { sellerProfile } from "../../lib/actions/createSeller";
import { redirect } from "next/navigation";
import { DashboardSidebar } from "../../app/dashboard/_components/DashboardSidebar";
import { SidebarInset, SidebarProvider } from "../../components/ui/sidebar";
import DashboardHeader from "./_components/DashboardHeader";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const alreadyASeller = await sellerProfile();
  if (!alreadyASeller) {
    redirect("/becomeSeller");
  }
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <DashboardHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
