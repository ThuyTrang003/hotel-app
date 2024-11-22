"use client";

import { createShift, shiftDTO } from "../../utils/shift-validate";
import { Shift } from "./shifts-columns";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
    useCreateShift,
    useUpdateShiftById,
} from "@/hooks/staffs-hook/useShifts";

import { ErrorField } from "@/components/error-field";
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

interface ShiftDialogProps {
    children: React.ReactNode;
    defaultValue?: Shift;
}
export function ShiftDialog({ children, defaultValue }: ShiftDialogProps) {
    const queryClient = useQueryClient();
    const { mutate: updateShift } = useUpdateShiftById();
    const { mutate: createShift } = useCreateShift();
    const [open, setOpen] = useState(false);
    const [isCreate, setIsCreate] = useState(true);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<createShift>({
        resolver: zodResolver(shiftDTO.createSchema),
    });

    const onSubmit = handleSubmit((data) => {
        console.log(data);
        if (isCreate) {
            createShift(data, {
                onSuccess: () => {
                    toast.success("Add shift success!");
                    queryClient.invalidateQueries({
                        queryKey: ["getAllShifts"],
                    });
                    setOpen(false);
                },
                onError: (message) => {
                    toast.error("Error: " + message);
                },
            });
        } else {
            updateShift(
                { id: defaultValue?._id, data: data },
                {
                    onSuccess: () => {
                        toast.success("Update shift success!");
                        queryClient.invalidateQueries({
                            queryKey: ["getAllShifts"],
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
        if (defaultValue) {
            setValue("shiftName", defaultValue.shiftName);
            setValue("startTime", defaultValue.startTime);
            setValue("endTime", defaultValue.endTime);

            setIsCreate(false);
        }
        setOpen(newOpen);
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[530px]">
                <DialogHeader>
                    <DialogTitle>
                        {isCreate ? "Add" : "Update"} shift
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={onSubmit}>
                    <div className="grid gap-4 px-1 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="shiftName" className="text-right">
                                Shift Name
                            </Label>
                            <div className="col-span-3">
                                <Input {...register("shiftName")} type="tel" />
                                {errors.shiftName && (
                                    <ErrorField>
                                        {errors.shiftName.message}
                                    </ErrorField>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="startTime" className="text-right">
                                Start Date
                            </Label>
                            <div className="col-span-3">
                                <Input
                                    {...register("startTime")}
                                    type="time"
                                    className="w-40"
                                />
                                {errors.startTime && (
                                    <ErrorField>
                                        {errors.startTime.message}
                                    </ErrorField>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="endTime" className="text-right">
                                End Date
                            </Label>
                            <div className="col-span-3">
                                <Input
                                    {...register("endTime")}
                                    type="time"
                                    className="w-40"
                                />
                                {errors.endTime && (
                                    <ErrorField>
                                        {errors.endTime.message}
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
