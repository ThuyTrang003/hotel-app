"use client";

import { Calendar, DollarSign, Package } from "lucide-react";
import { useState } from "react";

import { dateFormatter } from "@/utils/date-formatter";
import { moneyFormatter } from "@/utils/money-formatter";

import { IPromotion } from "@/features/admin/promotions/promotions-table/promotions-columns";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface DetailBookingProps {
    promotion: IPromotion;
    children: React.ReactNode;
}
export function DetailDialog({ promotion, children }: DetailBookingProps) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[580px]">
                <DialogHeader>
                    <DialogTitle>{promotion.code}</DialogTitle>
                    <DialogDescription>
                        {promotion.description}
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="flex items-center text-muted-foreground">
                                <Calendar className="mr-2 h-4 w-4" />
                                Valid from
                            </span>
                            <span className="font-medium">
                                {dateFormatter(promotion.startDate)}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="flex items-center text-muted-foreground">
                                <Calendar className="mr-2 h-4 w-4" />
                                Valid until
                            </span>
                            <span className="font-medium">
                                {dateFormatter(promotion.endDate)}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="flex items-center text-muted-foreground">
                                <DollarSign className="mr-2 h-4 w-4" />
                                Minimum amount
                            </span>
                            <span className="font-medium">
                                {moneyFormatter(promotion.minSpend)}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="flex items-center text-muted-foreground">
                                <DollarSign className="mr-2 h-4 w-4" />
                                Maximum discount
                            </span>
                            <span className="font-medium">
                                {moneyFormatter(promotion.maxDiscount)}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="flex items-center text-muted-foreground">
                                <Package className="mr-2 h-4 w-4" />
                                Remaining
                            </span>
                            <span className="font-medium">
                                {promotion.limitUse -
                                    promotion.userUsedVoucher.length}
                            </span>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
