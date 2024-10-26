"use client";

import { Bell } from "lucide-react";
import { useState } from "react";

import { useSidebar } from "@/stores/admin/store-sidebar";

import { SearchBar } from "@/features/search/component/search-bar";

import { UserAvatar } from "@/components/user-avatar";

export function Navbar() {
    const { focusState } = useSidebar();
    const [search, setSearch] = useState("");

    return (
        <div className="flex w-full items-center justify-between px-4">
            <p className="text-2xl">{focusState}</p>
            <div className="flex space-x-6">
                <SearchBar search={search} setSearch={setSearch} />
                <button>
                    <Bell
                        size={28}
                        className="text-black/70 hover:text-black"
                    />
                </button>
                <UserAvatar imageUrl={"/default-image.png"} />
            </div>
        </div>
    );
}
