"use client";

import { TypeRoomDTO, createTypeRoom } from "../../utils/type-room-validate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
    useCreateTypeRoom,
    useUpdateTypeRoom,
} from "@/hooks/rooms-hook/useTypeRooms";

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

interface TypeDialogProps {
    children: React.ReactNode;
    typeRoomId?: string;
    defaultValue?: {
        description: string;
        typename: string;
        limit: number;
        hourlyRate: number;
        dailyRate: number;
        existingImages?: string[];
    };
}
export function TypeRoomDialog({
    children,
    typeRoomId,
    defaultValue,
}: TypeDialogProps) {
    const queryClient = useQueryClient();

    const { mutate: createTypeRoom } = useCreateTypeRoom();
    const { mutate: updateTypeRoom } = useUpdateTypeRoom();
    const [open, setOpen] = useState(false);
    const [images, setImages] = useState<File[]>([]);
    const [isCreate, setIsCreate] = useState(true);
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        setValue,
    } = useForm<createTypeRoom>({
        resolver: zodResolver(TypeRoomDTO.createSchema),
    });

    const onSubmit = handleSubmit((data) => {
        console.log(data);
        const formData = new FormData();
        formData.append("description", data.description);
        formData.append("typename", data.typename);
        formData.append("limit", String(data.limit));
        formData.append("price[hourlyRate]", String(data.hourlyRate));
        formData.append("price[dailyRate]", String(data.dailyRate));
        images.forEach((image, index) => {
            console.log(image);
            formData.append("images", image); // 'images[]' là tên trường gửi lên server
        });
        if (isCreate) {
            createTypeRoom(formData, {
                onSuccess: (resp) => {
                    toast.success("Add type room success!");
                    queryClient.invalidateQueries({
                        queryKey: ["getAllTypeRooms"],
                    });
                    console.log(resp);
                    setOpen(false);
                    setImages([]);
                },
                onError: () => {
                    toast.error("Add type room error!");
                },
            });
        } else {
            updateTypeRoom(
                { id: typeRoomId, formData: formData },
                {
                    onSuccess: (resp) => {
                        toast.success("Update type room success!");
                        queryClient.invalidateQueries({
                            queryKey: ["getAllTypeRooms"],
                        });
                        setOpen(false);
                        setImages([]);
                    },
                    onError: () => {
                        toast.error("Update type room error!");
                    },
                },
            );
        }
    });
    const handleOpenChange = (newOpen: boolean) => {
        if (defaultValue) {
            setValue("typename", defaultValue.typename);
            setValue("description", defaultValue.description);
            setValue("limit", defaultValue.limit);
            setValue("hourlyRate", defaultValue.hourlyRate);
            setValue("dailyRate", defaultValue.dailyRate);
            setIsCreate(false);
            console.log(defaultValue);
        }
        // else {
        //     setValue("typename", "");
        //     setValue("description", "");
        //     setValue("limit", 0);
        //     setValue("hourlyRate", 0);
        //     setValue("dailyRate", 0);
        // }
        setOpen(newOpen);
    };
    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[520px]">
                <DialogHeader>
                    <DialogTitle>
                        {isCreate ? "Add" : "Update"} type room
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={onSubmit}>
                    <ScrollArea className="h-[calc(100vh-12rem)] px-4">
                        <div className="grid gap-4 px-1 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="typename"
                                    className="text-right"
                                >
                                    Type name
                                </Label>
                                <div className="col-span-3">
                                    <Input {...register("typename")} />
                                    {errors.typename && (
                                        <ErrorField>
                                            {errors.typename.message}
                                        </ErrorField>
                                    )}
                                </div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="description"
                                    className="text-right"
                                >
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
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="limit" className="text-right">
                                    Limit person
                                </Label>
                                <div className="col-span-3">
                                    <Input {...register("limit")} />
                                    {errors.limit && (
                                        <ErrorField>
                                            {errors.limit.message}
                                        </ErrorField>
                                    )}
                                </div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="hourlyRate"
                                    className="text-right"
                                >
                                    Hourly price
                                </Label>
                                <div className="col-span-3">
                                    <Input {...register("hourlyRate")} />
                                    {errors.hourlyRate && (
                                        <ErrorField>
                                            {errors.hourlyRate.message}
                                        </ErrorField>
                                    )}
                                </div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="dailyRate"
                                    className="text-right"
                                >
                                    Daily price
                                </Label>
                                <div className="col-span-3">
                                    <Input {...register("dailyRate")} />
                                    {errors.dailyRate && (
                                        <ErrorField>
                                            {errors.dailyRate.message}
                                        </ErrorField>
                                    )}
                                </div>
                            </div>
                            <ImageUploader
                                images={images}
                                setImages={setImages}
                                existingPreviews={
                                    defaultValue && defaultValue.existingImages
                                }
                            />
                        </div>
                    </ScrollArea>

                    <DialogFooter className="flex justify-between">
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
