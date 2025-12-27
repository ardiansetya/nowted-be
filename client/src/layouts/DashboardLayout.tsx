import { AppSidebar } from "@/components/shared/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />

      <main className="flex-1">
        <header className="h-14 flex items-center border-b px-4">
          {/* <SidebarTrigger /> */}
        </header>

        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}
