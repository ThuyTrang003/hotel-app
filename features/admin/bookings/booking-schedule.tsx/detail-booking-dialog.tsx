"use client";

import { Ibooking } from "./index.jsx";
import { Bed, Calendar, Clock, CreditCard, Users } from "lucide-react";
import { useState } from "react";

import { dateFormatter } from "@/utils/date-formatter";
import { moneyFormatter } from "@/utils/money-formatter";

import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DetailBookingProps {
    booking: Ibooking;
    children: React.ReactNode;
}

export default function DetailBookingDialog({
    booking,
    children,
}: DetailBookingProps) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[580px]">
                <DialogHeader>
                    <DialogTitle>Detail booking</DialogTitle>
                </DialogHeader>
                <ScrollArea className="max-h-[80vh] pr-4">
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-semibold">Guest Information</h3>
                            <p>{booking.userId.fullName}</p>
                            <p>{booking.userId.phoneNumber}</p>
                            <Badge>{booking.userId.role}</Badge>
                        </div>
                        <div>
                            <h3 className="font-semibold">Room Information</h3>
                            {booking.roomIds.map((room, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-2"
                                >
                                    <Bed className="h-4 w-4" />
                                    <span>
                                        {room.roomNumber} -{" "}
                                        {room.typeId.typename}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div>
                            <h3 className="font-semibold">Booking Details</h3>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    <span>Check-in:</span>
                                </div>
                                <span>
                                    {dateFormatter(booking.checkInTime)}
                                </span>
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    <span>Check-out:</span>
                                </div>
                                <span>
                                    {dateFormatter(booking.checkOutTime)}
                                </span>
                                <div className="flex items-center gap-2">
                                    <Users className="h-4 w-4" />
                                    <span>Guests:</span>
                                </div>
                                <span>{booking.numberOfGuests}</span>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold">
                                Payment Information
                            </h3>
                            <div className="grid grid-cols-2 gap-2">
                                <span>Paid Amount:</span>
                                <span>
                                    {moneyFormatter(booking.paidAmount.amount)}
                                </span>
                                <span>Total Amount:</span>
                                <span>
                                    {moneyFormatter(booking.totalAmount)}
                                </span>
                                <span>Payment Method:</span>
                                <div className="flex items-center gap-2">
                                    <CreditCard className="h-4 w-4" />
                                    <span>{booking.paymentMethod}</span>
                                </div>
                                <span>Last Payment:</span>
                                <span>
                                    {dateFormatter(
                                        booking.paidAmount.latestPaidTime,
                                    )}
                                </span>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold">Booking Status</h3>
                            <Badge
                                variant={
                                    booking.currentStatus === "Cancelled"
                                        ? "destructive"
                                        : "default"
                                }
                            >
                                {booking.currentStatus}
                            </Badge>
                        </div>
                        <div>
                            <h3 className="font-semibold">
                                Additional Information
                            </h3>
                            <div className="grid grid-cols-2 gap-2">
                                <span>Created At:</span>
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4" />
                                    <span>
                                        {dateFormatter(booking.createdAt)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}
