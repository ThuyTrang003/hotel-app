"use client";

import { CartDropdown } from "../bookings/cart/cart-dropdown";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

import { useCartStore } from "@/stores/admin/store-cart";
import { useSidebar } from "@/stores/admin/store-sidebar";

import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/user-avatar";

export function Navbar() {
    const { focusState } = useSidebar();
    const [search, setSearch] = useState("");
    const { typeRooms } = useCartStore();
    return (
        <div className="flex w-full items-center justify-between px-4">
            <p className="text-2xl">{focusState}</p>
            <div className="flex space-x-6">
                {/* <SearchBar search={search} setSearch={setSearch} /> */}
                <CartDropdown>
                    <button className="relative">
                        <ShoppingCart
                            size={28}
                            className="text-black/70 hover:text-black"
                        />
                        <div className="absolute -right-2 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                            {typeRooms.length}
                        </div>
                    </button>
                </CartDropdown>

                <UserAvatar imageUrl={"/default-image.png"} />
            </div>
        </div>
    );
}
