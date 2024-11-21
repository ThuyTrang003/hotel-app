"use client";

import { X } from "lucide-react";

import { cn } from "@/lib/utils";

import { useCartStore } from "@/stores/admin/store-cart";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CartDropdownProps {
    children: React.ReactNode;
}

export function CartDropdown({ children }: CartDropdownProps) {
    const { typeRooms, removeFromCart } = useCartStore();
    const handleRemoveItem = (typeId: string) => {
        removeFromCart(typeId);
    };
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 pl-4" align="end">
                <h2 className="mb-4 mt-2 font-semibold">Cart</h2>
                <div className="flex flex-col gap-4">
                    <ScrollArea
                        className={cn(
                            "pr-2",
                            typeRooms.length > 6 ? "h-[calc(100vh-19rem)]" : "",
                        )}
                    >
                        <div className="flex flex-col gap-4">
                            {typeRooms.map((item) => (
                                <div
                                    key={item.typeId}
                                    className="flex items-center gap-4"
                                >
                                    <div className="grid flex-1 gap-1">
                                        <h3 className="text-base font-medium">
                                            {item.typeName}
                                        </h3>
                                        <div className="text-sm">
                                            Quantity: {item.numberOfRooms}
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={() =>
                                            handleRemoveItem(item.typeId)
                                        }
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                    <div className="mb-2 space-y-2 pr-4">
                        <div className="flex gap-2">
                            <Button className="flex-1" variant="secondary">
                                Checkout
                            </Button>
                        </div>
                    </div>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
