import { cn } from "@/lib/utils";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SidebarAdmin } from "@/features/admin/layout/sidebar";
import { Navbar } from "@/features/admin/layout/navbar";
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <SidebarAdmin />
      <div className="flex flex-grow flex-col max-h-screen">
        <div className="flex items-center h-16 border-b">
          <SidebarTrigger />
          <Navbar />
        </div>
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
