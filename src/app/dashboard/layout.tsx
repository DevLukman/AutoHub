import { sellerProfile } from "../../lib/action";
import { DashboardSidebar } from "../../app/dashboard/_components/DashboardSidebar";
import { SidebarInset, SidebarProvider } from "../../components/ui/sidebar";
import DashboardHeader from "./_components/DashboardHeader";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isComplete = await sellerProfile();
  if (!isComplete) {
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
