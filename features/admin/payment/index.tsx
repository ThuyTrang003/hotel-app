"use client";

import { bookingDTO, createBooking } from "../utils/booking-validate";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { ErrorField } from "@/components/error-field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function Payment() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        setValue,
        control,
    } = useForm<createBooking>({
        resolver: zodResolver(bookingDTO.createSchema),
    });
    const onSubmit = handleSubmit((data) => {});
    const paymentMethodValue = ["Credit Card", "Cash"];
    return (
        <form onSubmit={onSubmit}>
            <div className="grid gap-4 px-1 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="phoneNumber" className="text-right">
                        Phone Number
                    </Label>
                    <div className="col-span-3">
                        <Input {...register("phoneNumber")} />
                        {errors.phoneNumber && (
                            <ErrorField>
                                {errors.phoneNumber.message}
                            </ErrorField>
                        )}
                    </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="checkInTime" className="text-right">
                        Check in time
                    </Label>
                    <div className="col-span-3">
                        <input
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
                    <Label htmlFor="checkOutTime" className="text-right">
                        Check out time
                    </Label>
                    <div className="col-span-3">
                        <input
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
                    <Label htmlFor="numberOfGuests" className="text-right">
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
                    <Label htmlFor="redeemedPoint" className="text-right">
                        Point
                    </Label>
                    <div className="col-span-3">
                        <Input type="number" {...register("redeemedPoint")} />
                        {errors.redeemedPoint && (
                            <ErrorField>
                                {errors.redeemedPoint.message}
                            </ErrorField>
                        )}
                    </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="voucherCode" className="text-right">
                        Voucher Code
                    </Label>
                    <div className="col-span-3">
                        <Input type="number" {...register("voucherCode")} />
                        {errors.voucherCode && (
                            <ErrorField>
                                {errors.voucherCode.message}
                            </ErrorField>
                        )}
                    </div>
                </div>
                <div className="space-y-1">
                    <Label htmlFor="paymentMethod">Payment Method</Label>
                    <Controller
                        name="paymentMethod"
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
                                    {paymentMethodValue.map((value, index) => (
                                        <SelectItem key={index} value={value}>
                                            {value}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    />
                </div>
            </div>
        </form>
    );
}
