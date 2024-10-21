import { cn } from "@/lib/utils";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Navbar } from "@/features/admin/layout/Navbar";
import { SidebarAdmin } from "@/features/admin/layout/Sidebar";
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <SidebarAdmin />
      <div className="flex flex-grow flex-col max-h-screen">
        <SidebarTrigger />
        <Navbar />
        <main
          className={cn(
            "flex-grow bg-muted pl-14 transition-[margin-left] duration-300 ease-in-out"
          )}
        >
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
