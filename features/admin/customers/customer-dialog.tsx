"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { useSignup } from "@/hooks/auth-hook/useAuth";
import { useUpdateCustomer } from "@/hooks/customers-hook/useCustomers";

import { genderType } from "@/types/gender-type";

import { PersonalInfor, UserDTO } from "@/utils/user-validate";

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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface CustomerDialogProps {
    children: React.ReactNode;
    customerId?: string;
    defaultValue?: {
        phoneNumber: string;
        fullname: string;
        gender: "Male" | "Female";
        birthDate: string;
    };
}
export function CustomerDialog({
    children,
    customerId,
    defaultValue,
}: CustomerDialogProps) {
    const queryClient = useQueryClient();

    const { mutate: updateCustomer } = useUpdateCustomer();
    const { mutate: createCustomer } = useSignup();
    const [open, setOpen] = useState(false);
    const [isCreate, setIsCreate] = useState(true);
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        control,
    } = useForm<PersonalInfor>({
        resolver: zodResolver(UserDTO.personalInforSchema),
    });

    const onSubmit = handleSubmit((data) => {
        if (isCreate) {
            const payload = { ...data, role: "OnSiteCustomer" };
            createCustomer(payload, {
                onSuccess: () => {
                    toast.success("Add customer success!");
                    queryClient.invalidateQueries({
                        queryKey: ["getAllCustomers"],
                    });
                    setOpen(false);
                },
                onError: (message) => {
                    toast.error("Error: " + message);
                },
            });
        } else {
            updateCustomer(
                { id: customerId, data: data },
                {
                    onSuccess: () => {
                        toast.success("Update customer success!");
                        queryClient.invalidateQueries({
                            queryKey: ["getAllCustomers"],
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
            setValue("phoneNumber", defaultValue.phoneNumber);
            setValue("fullName", defaultValue.fullname);
            setValue("gender", defaultValue.gender);
            setValue("dateOfBirth", defaultValue.birthDate);
            setIsCreate(false);
            console.log(defaultValue);
        }

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
                            <Label htmlFor="phone" className="text-right">
                                Phone Number
                            </Label>
                            <div className="col-span-3">
                                <Input
                                    {...register("phoneNumber")}
                                    type="tel"
                                />
                                {errors.phoneNumber && (
                                    <ErrorField>
                                        {errors.phoneNumber.message}
                                    </ErrorField>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="fullname" className="text-right">
                                Full Name
                            </Label>
                            <div className="col-span-3">
                                <Input {...register("fullName")} />
                                {errors.fullName && (
                                    <ErrorField>
                                        {errors.fullName.message}
                                    </ErrorField>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="gender" className="text-right">
                                Gender
                            </Label>
                            <div className="col-span-3">
                                <Controller
                                    name="gender"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                        >
                                            <SelectTrigger id="gender">
                                                <SelectValue placeholder="Select your gender" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {genderType.map(
                                                    (genderValue) => (
                                                        <SelectItem
                                                            key={
                                                                genderValue.value
                                                            }
                                                            value={
                                                                genderValue.value
                                                            }
                                                        >
                                                            {genderValue.name}
                                                        </SelectItem>
                                                    ),
                                                )}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.gender && (
                                    <ErrorField>
                                        {errors.gender.message}
                                    </ErrorField>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="dob" className="text-right">
                                Date of Birth
                            </Label>
                            <div className="col-span-3">
                                <Input
                                    type="date"
                                    {...register("dateOfBirth")}
                                />
                                {errors.dateOfBirth && (
                                    <ErrorField>
                                        {errors.dateOfBirth.message}
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
