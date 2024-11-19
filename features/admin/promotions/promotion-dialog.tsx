"use client";

import { PromotionDTO, promotion } from "../utils/promotion-validate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
    useCreatePromotion,
    useUpdatePromotionById,
} from "@/hooks/promotions-hook/usePromotions";

import { formatISODate, toEndOfDayISO } from "@/utils/date-formatter";

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
import { Textarea } from "@/components/ui/textarea";

interface PromotionDialogProps {
    children: React.ReactNode;
    promotionId?: string;
    defaultValue?: {
        code: string;
        description: string;
        discountPercentage: number;
        startDate: string;
        endDate: string;
        minSpend: number;
        maxDiscount: number;
        limitUse: number;
    };
}
export function PromotionDialog({
    children,
    promotionId,
    defaultValue,
}: PromotionDialogProps) {
    const queryClient = useQueryClient();
    const { mutate: updatePromotion } = useUpdatePromotionById();
    const { mutate: createPromotion } = useCreatePromotion();
    const [open, setOpen] = useState(false);
    const [isCreate, setIsCreate] = useState(true);
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<promotion>({
        resolver: zodResolver(PromotionDTO.schema),
    });

    const onSubmit = handleSubmit((data) => {
        const formatData = {
            ...data,
            endDate: toEndOfDayISO(data.endDate),
        };
        console.log(formatData);
        if (isCreate) {
            createPromotion(formatData, {
                onSuccess: () => {
                    toast.success("Add promotion success!");
                    queryClient.invalidateQueries({
                        queryKey: ["getAllPromotions"],
                    });
                    setOpen(false);
                },
                onError: (message) => {
                    toast.error("Error: " + message);
                },
            });
        } else {
            updatePromotion(
                { id: promotionId, data: formatData },
                {
                    onSuccess: () => {
                        toast.success("Update customer success!");
                        queryClient.invalidateQueries({
                            queryKey: ["getAllPromotions"],
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
            setValue("code", defaultValue.code);
            setValue("description", defaultValue.description);
            setValue("discountPercentage", defaultValue.discountPercentage);
            setValue("startDate", formatISODate(defaultValue.startDate));
            setValue("endDate", formatISODate(defaultValue.endDate));
            setValue("minSpend", defaultValue.minSpend);
            setValue("maxDiscount", defaultValue.maxDiscount);
            setValue("limitUse", defaultValue.limitUse);

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
                        {isCreate ? "Add" : "Update"} promotion
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={onSubmit}>
                    <div className="grid gap-4 px-1 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="code" className="text-right">
                                Code
                            </Label>
                            <div className="col-span-3">
                                <Input {...register("code")} />
                                {errors.code && (
                                    <ErrorField>
                                        {errors.code.message}
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
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                                htmlFor="discountPercentage"
                                className="text-right"
                            >
                                Discount (%)
                            </Label>
                            <div className="col-span-3">
                                <Input {...register("discountPercentage")} />
                                {errors.discountPercentage && (
                                    <ErrorField>
                                        {errors.discountPercentage.message}
                                    </ErrorField>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="startDate" className="text-right">
                                Start Date
                            </Label>
                            <div className="col-span-3">
                                <Input type="date" {...register("startDate")} />
                                {errors.startDate && (
                                    <ErrorField>
                                        {errors.startDate.message}
                                    </ErrorField>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="endDate" className="text-right">
                                End Date
                            </Label>
                            <div className="col-span-3">
                                <Input type="date" {...register("endDate")} />
                                {errors.endDate && (
                                    <ErrorField>
                                        {errors.endDate.message}
                                    </ErrorField>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="minSpend" className="text-right">
                                Min Amount (VNĐ)
                            </Label>
                            <div className="col-span-3">
                                <Input {...register("minSpend")} />
                                {errors.minSpend && (
                                    <ErrorField>
                                        {errors.minSpend.message}
                                    </ErrorField>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="maxDiscount" className="text-right">
                                Max Discount (VNĐ)
                            </Label>
                            <div className="col-span-3">
                                <Input {...register("maxDiscount")} />
                                {errors.maxDiscount && (
                                    <ErrorField>
                                        {errors.maxDiscount.message}
                                    </ErrorField>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="limitUse" className="text-right">
                                Limit Use
                            </Label>
                            <div className="col-span-3">
                                <Input {...register("limitUse")} />
                                {errors.limitUse && (
                                    <ErrorField>
                                        {errors.limitUse.message}
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
