"use client";

import { Ibooking } from ".";
import { bookingDTO, updateBooking } from "../../utils/booking-validate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { updateBookingById } from "@/apis/bookings-api/bookings";

import { useUpdateBookingById } from "@/hooks/bookings-hook/useBookings";

import { formatDateForDateTimeLocal } from "@/utils/date-formatter";

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

interface UpdateBookingDialogProps {
    children: React.ReactNode;
    booking: Ibooking;
}
export function UpdateBookingDialog({
    children,
    booking,
}: UpdateBookingDialogProps) {
    const paymentMethodValue = ["Left", "Reserved", "Cancelled"];
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);
    const [paidAmountState, setPaidAmountState] = useState(
        booking.paidAmount.amount,
    );
    const { mutate: updateBookingById } = useUpdateBookingById();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        control,
    } = useForm<updateBooking>({
        resolver: zodResolver(bookingDTO.updateSchema),
    });
    const onSubmit = handleSubmit((data) => {
        let payload;
        payload = {
            paidAmount: data.paidAmount,
            numberOfGuests: data.numberOfGuests,
            currentStatus: data.currentStatus,
        };
        if (
            data.checkInTime !== formatDateForDateTimeLocal(booking.checkInTime)
        ) {
            payload = { ...payload, checkingInTime: data.checkInTime };
        }
        if (
            data.checkOutTime !==
            formatDateForDateTimeLocal(booking.checkOutTime)
        ) {
            payload = { ...payload, checkOutTime: data.checkOutTime };
        }

        updateBookingById(
            { id: booking._id, data: payload },
            {
                onSuccess: () => {
                    toast.success("Update booking success!");
                    queryClient.invalidateQueries({
                        queryKey: ["getBookingById"],
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
        setValue(
            "checkInTime",
            formatDateForDateTimeLocal(booking.checkInTime),
        );
        setValue(
            "checkOutTime",
            formatDateForDateTimeLocal(booking.checkOutTime),
        );
        setValue("numberOfGuests", booking.numberOfGuests);
        setValue("currentStatus", booking.currentStatus);
        setValue("paidAmount", booking.paidAmount.amount);
        setOpen(newOpen);
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[530px]">
                <DialogHeader>
                    <DialogTitle>Update booking information</DialogTitle>
                </DialogHeader>
                <form onSubmit={onSubmit}>
                    <div className="grid gap-4 px-1 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="checkInTime" className="text-right">
                                Check in time
                            </Label>
                            <div className="col-span-3">
                                <Input
                                    {...register("checkInTime")}
                                    type="datetime-local"
                                    id="datetime"
                                />
                                {errors.checkInTime && (
                                    <ErrorField>
                                        {errors.checkInTime.message}
                                    </ErrorField>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                                htmlFor="checkOutTime"
                                className="text-right"
                            >
                                Check out time
                            </Label>
                            <div className="col-span-3">
                                <Input
                                    {...register("checkOutTime")}
                                    type="datetime-local"
                                    id="datetime"
                                />
                                {errors.checkOutTime && (
                                    <ErrorField>
                                        {errors.checkOutTime.message}
                                    </ErrorField>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                                htmlFor="numberOfGuests"
                                className="text-right"
                            >
                                Number Of Guests
                            </Label>
                            <div className="col-span-3">
                                <Input
                                    type="number"
                                    min={1}
                                    {...register("numberOfGuests")}
                                />
                                {errors.numberOfGuests && (
                                    <ErrorField>
                                        {errors.numberOfGuests.message}
                                    </ErrorField>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="paidAmount" className="text-right">
                                Paid Amount
                            </Label>
                            <div className="col-span-3">
                                <Input
                                    {...register("paidAmount")}
                                    onBlur={(e) =>
                                        setPaidAmountState(
                                            Number(e.target.value),
                                        )
                                    }
                                />
                                {errors.paidAmount && (
                                    <ErrorField>
                                        {errors.paidAmount.message}
                                    </ErrorField>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                                htmlFor="currentStatus"
                                className="text-right"
                            >
                                Status
                            </Label>
                            <div className="col-span-3">
                                <Controller
                                    name="currentStatus"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            disabled={
                                                field.value !== "Reserved"
                                            }
                                        >
                                            <SelectTrigger id="currentStatus">
                                                <SelectValue placeholder="Select your status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {paymentMethodValue.map(
                                                    (value, index) => (
                                                        <SelectItem
                                                            key={index}
                                                            value={value}
                                                        >
                                                            {value}
                                                        </SelectItem>
                                                    ),
                                                )}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>
                        </div>
                        {paidAmountState < booking.totalAmount ? (
                            <ErrorField>
                                The required amount has not been paid in full!
                            </ErrorField>
                        ) : (
                            <p className="text-green-600">Payment completed!</p>
                        )}
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
