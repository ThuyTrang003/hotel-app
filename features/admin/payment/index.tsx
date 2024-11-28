"use client";

import { SearchCustomer } from "../customers/search-customer";
import SearchPromotionDialog from "../promotions/search-promotion-dialog";
import { bookingDTO, createBooking } from "../utils/booking-validate";
import { calculateAmount } from "../utils/calculate-amount";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { useCreatePBooking } from "@/hooks/bookings-hook/useBookings";

import { useCartStore } from "@/stores/admin/store-cart";

import { moneyFormatter } from "@/utils/money-formatter";

import { ErrorField } from "@/components/error-field";
import { Button } from "@/components/ui/button";
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
    const { mutate: createBooking } = useCreatePBooking();
    const { typeRooms, clearCart } = useCartStore();
    const paymentMethodValue = ["Credit Card", "Cash"];
    const [userId, setUserId] = useState("");
    const [totalAmount, setTotalAmount] = useState(0);
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
    const [phoneNumber, setPhoneNumber] = useState("");
    const onSubmit = handleSubmit((data) => {
        console.log(data);
        if (userId === "") {
            toast.error("Please add customer");
        } else if (typeRooms.length === 0) {
            toast.error("Empty cart");
        } else {
            const transformedTypeRooms = typeRooms.map(
                ({ typeId, numberOfRooms }) => ({
                    typeId,
                    numberOfRooms,
                }),
            );
            let payload = {};
            payload = {
                userId: userId,
                typeRooms: transformedTypeRooms,
                checkInTime: data.checkInTime,
                checkOutTime: data.checkOutTime,
                numberOfGuests: data.numberOfGuests,
                paidAmount: data.paidAmount,
                redeemedPoint: data.redeemedPoint,
                paymentMethod: data.paymentMethod,
            };
            if (data.voucherCode) {
                createBooking(
                    { ...payload, voucherCode: data.voucherCode },
                    {
                        onSuccess: () => {
                            toast.success("Booking successful!");
                            clearCart();
                        },
                        onError: (message) => {
                            toast.error("Error: " + message);
                        },
                    },
                );
            } else {
                createBooking(payload, {
                    onSuccess: () => {
                        toast.success("Booking successful!");
                        clearCart();
                    },
                    onError: (message) => {
                        toast.error("Error: " + message);
                    },
                });
            }
        }
    });

    const handleCalculateAmount = () => {
        if (
            getValues("checkInTime") &&
            getValues("checkOutTime") &&
            getValues("redeemedPoint") &&
            getValues("overOccupancyCharge")
        ) {
            let daily = 0;
            let hourly = 0;
            typeRooms.map((typeRoom) => {
                daily += typeRoom.price.dailyRate;
                hourly += typeRoom.price.hourlyRate;
            });

            const cost = calculateAmount(
                getValues("checkInTime"),
                getValues("checkOutTime"),
                hourly,
                daily,
                getValues("overOccupancyCharge"),
                getValues("redeemedPoint"),
            );
            setTotalAmount(cost);
        }
    };
    return (
        <div className="grid grid-cols-2 gap-4">
            <form onSubmit={onSubmit}>
                <div className="grid gap-4 px-1 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="phoneNumber" className="text-right">
                            Phone Number
                        </Label>
                        <div className="col-span-3">
                            <Input
                                {...register("phoneNumber")}
                                onBlur={() => {
                                    setPhoneNumber(getValues("phoneNumber"));
                                }}
                            />
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
                        <Label htmlFor="checkOutTime" className="text-right">
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
                        <Label
                            htmlFor="overOccupancyCharge"
                            className="text-right"
                        >
                            Over Occupancy Charge
                        </Label>
                        <div className="col-span-3">
                            <Input {...register("overOccupancyCharge")} />
                            {errors.overOccupancyCharge && (
                                <ErrorField>
                                    {errors.overOccupancyCharge.message}
                                </ErrorField>
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="redeemedPoint" className="text-right">
                            Point
                        </Label>
                        <div className="col-span-3">
                            <Input
                                type="number"
                                {...register("redeemedPoint")}
                                min={0}
                            />
                            {errors.redeemedPoint && (
                                <ErrorField>
                                    {errors.redeemedPoint.message}
                                </ErrorField>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="paidAmount" className="text-right">
                            Total Amount
                        </Label>
                        <div className="col-span-2">
                            <Input
                                value={moneyFormatter(totalAmount)}
                                disabled
                            />
                        </div>
                        <div className="col-span-1">
                            <Button
                                type="button"
                                className="w-full"
                                onClick={handleCalculateAmount}
                            >
                                Calculate
                            </Button>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="paidAmount" className="text-right">
                            Paid Amount (at least 20% in total amount)
                        </Label>
                        <div className="col-span-3">
                            <Input {...register("paidAmount")} />
                            {errors.paidAmount && (
                                <ErrorField>
                                    {errors.paidAmount.message}
                                </ErrorField>
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="voucherCode" className="text-right">
                            Voucher Code
                        </Label>
                        <div className="col-span-2">
                            <Input {...register("voucherCode")} />
                            {errors.voucherCode && (
                                <ErrorField>
                                    {errors.voucherCode.message}
                                </ErrorField>
                            )}
                        </div>
                        <div className="col-span-1">
                            <SearchPromotionDialog totalAmount={totalAmount}>
                                <Button
                                    type="button"
                                    className="w-full"
                                    onClick={handleCalculateAmount}
                                >
                                    Search
                                </Button>
                            </SearchPromotionDialog>
                        </div>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="paymentMethod" className="text-right">
                            Payment Method
                        </Label>
                        <div className="col-span-3">
                            <Controller
                                name="paymentMethod"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                    >
                                        <SelectTrigger id="gender">
                                            <SelectValue placeholder="Select payment method" />
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
                            {errors.paymentMethod && (
                                <ErrorField>
                                    {errors.paymentMethod.message}
                                </ErrorField>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-2">
                    <Button type="submit">Book</Button>
                </div>
            </form>
            <div className="mt-4">
                {phoneNumber !== "" && (
                    <SearchCustomer
                        phoneNumber={getValues("phoneNumber")}
                        setUserId={setUserId}
                    />
                )}
            </div>
        </div>
    );
}
