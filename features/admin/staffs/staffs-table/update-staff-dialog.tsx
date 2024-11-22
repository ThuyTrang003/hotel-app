"use client";

import { StaffDTO, updateStaff } from "../../utils/staff-validate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useUpdateStaff } from "@/hooks/staffs-hook/useStaffs";

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

interface UpdateStaffDialogProps {
    children: React.ReactNode;
    staffId: string;
    defaultValue: {
        salary: number;
    };
}
export function UpdateStaffDialog({
    children,
    staffId,
    defaultValue,
}: UpdateStaffDialogProps) {
    const queryClient = useQueryClient();

    const { mutate: updateStaff } = useUpdateStaff();
    const [open, setOpen] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<updateStaff>({
        resolver: zodResolver(StaffDTO.updateStaffSchema),
    });

    const onSubmit = handleSubmit((data) => {
        updateStaff(
            { id: staffId, data: data },
            {
                onSuccess: () => {
                    toast.success("Update staff success!");
                    queryClient.invalidateQueries({
                        queryKey: ["getAllStaffs"],
                    });
                    setOpen(false);
                },
                onError: (message) => {
                    toast.error("Error: " + message);
                },
            },
        );
    });
    const handleOpenChange = (newOpen: boolean) => {
        setValue("salary", defaultValue.salary);
        setOpen(newOpen);
    };
    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[580px]">
                <DialogHeader>
                    <DialogTitle>Update staff</DialogTitle>
                </DialogHeader>
                <form onSubmit={onSubmit}>
                    <div className="grid gap-4 px-1 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="salary" className="text-right">
                                Salary
                            </Label>
                            <div className="col-span-3">
                                <Input {...register("salary")} type="tel" />
                                {errors.salary && (
                                    <ErrorField>
                                        {errors.salary.message}
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
