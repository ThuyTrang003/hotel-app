"use client";

import {
    BedDouble,
    Calendar,
    ChartLine,
    Home,
    LogOut,
    Settings,
    Tag,
    UserCog,
    Users,
    Wrench,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { cn } from "@/lib/utils";

import { useLogout } from "@/hooks/auth-hook/useAuth";

import { useSidebar } from "@/stores/admin/store-sidebar";
import { useUserAccount } from "@/stores/user-account/store-user-account";

import { AlertDialogSection } from "@/components/alert-dialog-section";
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

// Menu items.
const items = [
    {
        title: "Dashboard",
        url: "/admin/dashboard",
        icon: Home,
    },
    {
        title: "Rooms",
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
    const { data: logout } = useLogout();
    const router = useRouter();
    const { focusState } = useSidebar();
    const { resetUserAccount, userAccount } = useUserAccount();
    const handleLogout = () => {
        if (logout) {
            toast("Logout successfully!");
            router.push("/");
            resetUserAccount();
        } else {
            toast("Logout fail!");
        }
    };
    return (
        <Sidebar>
            <SidebarHeader className="items-center py-4">
                <Link href="/">
                    <Image
                        src="/logo.svg"
                        alt="Logo"
                        width={150}
                        height={150}
                    />
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
                                            "h-12 text-lg",
                                            focusState === item.title
                                                ? "bg-amber-1/40 hover:bg-amber-1/60"
                                                : "",
                                        )}
                                        asChild
                                    >
                                        <a
                                            href={item.url}
                                            className="space-x-2"
                                        >
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
                                <SidebarMenuButton
                                    className="h-12 text-lg"
                                    asChild
                                >
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
