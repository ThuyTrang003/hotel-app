"use client";
import { UserAvatar } from "@/components/user-avatar";
import { SearchBar } from "@/features/search/component/search-bar";
import { useSidebar } from "@/stores/admin/store-sidebar";
import { Bell } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const { focusState } = useSidebar();
  const [search, setSearch] = useState("");

  return (
    <div className="flex justify-between items-center w-full px-4 ">
      <p className="text-2xl">{focusState}</p>
      <div className="flex space-x-6">
        <SearchBar search={search} setSearch={setSearch} />
        <button>
          <Bell size={28} className="text-black/70 hover:text-black" />
        </button>
        <UserAvatar imageUrl={"/user.svg"} />
      </div>
    </div>
  );
}
