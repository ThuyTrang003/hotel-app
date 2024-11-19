"use client";

import { RoomDTO, createRoom } from "../../utils/room-validate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useCreateRoom, useUpdateRoom } from "@/hooks/rooms-hook/useRooms";

import { ErrorField } from "@/components/error-field";
import ImageUploader from "@/components/image-uploader";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";

interface RoomDialogProps {
    children: React.ReactNode;
    roomId?: string;
    defaultValue: {
        description: string;
        typeId: string;
        roomNumber: string;
    };
}
export function RoomDialog({
    children,
    roomId,
    defaultValue,
}: RoomDialogProps) {
    const queryClient = useQueryClient();

    const { mutate: createRoom } = useCreateRoom();
    const { mutate: updateRoom } = useUpdateRoom();
    const [open, setOpen] = useState(false);
    const [isCreate, setIsCreate] = useState(true);
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        setValue,
    } = useForm<createRoom>({
        resolver: zodResolver(RoomDTO.createSchema),
    });

    const onSubmit = handleSubmit((data) => {
        console.log(data);

        if (isCreate) {
            createRoom(data, {
                onSuccess: () => {
                    toast.success("Add room success!");
                    setOpen(false);
                },
                onError: () => {
                    toast.error("Error!");
                },
            });
        } else {
            updateRoom(
                { id: roomId, data: data },
                {
                    onSuccess: () => {
                        toast.success("Update type room success!");
                        queryClient.invalidateQueries({
                            queryKey: ["getAllRooms"],
                        });
                        setOpen(false);
                    },
                    onError: (message) => {
                        toast.error("Error: " + message);
                    },
                },
            );
        }
    });
    const handleOpenChange = (newOpen: boolean) => {
        if (roomId) {
            setIsCreate(false);
        }
        setValue("typeId", defaultValue.typeId);
        setValue("description", defaultValue.description);
        setValue("roomNumber", defaultValue.roomNumber);
        setOpen(newOpen);
    };
    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[580px]">
                <DialogHeader>
                    <DialogTitle>
                        {isCreate ? "Add" : "Update"} room
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={onSubmit}>
                    <div className="grid gap-4 px-1 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="typeId" className="text-right">
                                Type Id
                            </Label>
                            <div className="col-span-3">
                                <Input
                                    {...register("typeId")}
                                    disabled
                                    value={defaultValue.typeId}
                                />
                                {errors.typeId && (
                                    <ErrorField>
                                        {errors.typeId.message}
                                    </ErrorField>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="limit" className="text-right">
                                Room number
                            </Label>
                            <div className="col-span-3">
                                <Input {...register("roomNumber")} />
                                {errors.roomNumber && (
                                    <ErrorField>
                                        {errors.roomNumber.message}
                                    </ErrorField>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                Description
                            </Label>
                            <div className="col-span-3">
                                <Textarea {...register("description")} />
                                {errors.description && (
                                    <ErrorField>
                                        {errors.description.message}
                                    </ErrorField>
                                )}
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
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
