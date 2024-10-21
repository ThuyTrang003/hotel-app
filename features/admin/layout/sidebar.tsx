"use client";
import {
  BedDouble,
  Calendar,
  Users,
  Tag,
  UserCog,
  ChartLine,
  Wrench,
  Home,
  Settings,
  LogOut,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { AlertDialogSection } from "@/components/alert-dialog-section";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/stores/admin/store-sidebar";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: Home,
  },
  {
    title: "Room",
    url: "/admin/rooms",
    icon: BedDouble,
  },
  {
    title: "Bookings",
    url: "/admin/bookings",
    icon: Calendar,
  },
  {
    title: "Customers",
    url: "/admin/customers",
    icon: Users,
  },
  {
    title: "Promotions",
    url: "/admin/promotions",
    icon: Tag,
  },
  {
    title: "Staff",
    url: "/admin/staff",
    icon: UserCog,
  },
  {
    title: "Reports",
    url: "/admin/reports",
    icon: ChartLine,
  },
  {
    title: "Maintenance",
    url: "/admin/maintenance",
    icon: Wrench,
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: Settings,
  },
];

export function SidebarAdmin() {
  const router = useRouter();
  const { focusState } = useSidebar();
  const handleLogout = () => {
    router.push("/");
  };
  return (
    <Sidebar>
      <SidebarHeader className="items-center py-4">
        <Link href="/">
          <Image src="/logo.svg" alt="Logo" width={150} height={150} />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    className={cn(
                      "text-lg h-12",
                      focusState === item.title
                        ? "bg-main/40 hover:bg-main/60"
                        : ""
                    )}
                    asChild
                  >
                    <a href={item.url} className="space-x-2">
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <AlertDialogSection
                title="Confirm Logout"
                description="Are you sure you want to log out?"
                cancelButtonContent="No"
                actionButtonContent="Yes"
                handleAction={handleLogout}
              >
                <SidebarMenuButton className="text-lg h-12" asChild>
                  <div className="space-x-2">
                    <LogOut />
                    <span>Logout</span>
                  </div>
                </SidebarMenuButton>
              </AlertDialogSection>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
