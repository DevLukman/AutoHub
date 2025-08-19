import { DashboardSidebar } from "@/app/dashboard/_components/DashboardSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import DashboardHeader from "./_components/DashboardHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
