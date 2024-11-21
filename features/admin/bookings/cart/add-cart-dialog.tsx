"use client";

import { TypeRoom } from "../../rooms/types-table/type-rooms-columns";
import { useState } from "react";
import { toast } from "sonner";

import { useCartStore } from "@/stores/admin/store-cart";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddCartDialogProps {
    children: React.ReactNode;
    typeRoom: TypeRoom;
}
export function AddCartDialog({ children, typeRoom }: AddCartDialogProps) {
    const [numberOfRooms, setNumberOfRooms] = useState(1);
    const [open, setOpen] = useState(false);
    const { addToCart, typeRooms } = useCartStore();
    const onAddToCart = () => {
        addToCart(typeRoom._id, numberOfRooms, typeRoom.typename);
        toast.success("Added to cart!");
        console.log(typeRooms);
        setOpen(false);
    };
    const handleOpenChange = (newOpen: boolean) => {
        if (typeRoom.availableRoom == 0) {
            toast.error("There are no available rooms for this type.");
        } else setOpen(newOpen);
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[530px]">
                <DialogHeader>
                    <DialogTitle>Add to cart</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 px-1 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="shiftName" className="text-right">
                            Shift Name
                        </Label>
                        <div className="col-span-3">
                            <Input
                                type="number"
                                min={1}
                                max={typeRoom.availableRoom}
                                value={numberOfRooms}
                                onChange={(e) =>
                                    setNumberOfRooms(Number(e.target.value))
                                }
                            />
                        </div>
                    </div>
                </div>

                <DialogFooter className="flex justify-between gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => setOpen(false)}
                    >
                        Cancel
                    </Button>
                    <Button onClick={onAddToCart}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
