"use client";

import { IPromotion } from "./promotions-table/promotions-columns";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

import { useGetAllPromotions } from "@/hooks/promotions-hook/usePromotions";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DetailBookingProps {
    totalAmount: number;
    setDiscountVoucher?: (amount: number) => void;
    children: React.ReactNode;
}

export default function SearchPromotionDialog({
    children,
    totalAmount,
    setDiscountVoucher,
}: DetailBookingProps) {
    const [open, setOpen] = useState(false);
    const {
        data: promotionsData,
        isError,
        error,
        isPending,
    } = useGetAllPromotions({ available: true, totalAmount: totalAmount });

    console.log(promotionsData);

    const [copiedCode, setCopiedCode] = useState<string | null>(null);

    const copyToClipboard = (code: string) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(null), 2000);
    };
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[580px]">
                <DialogHeader>
                    <DialogTitle>Voucher available</DialogTitle>
                </DialogHeader>
                {promotionsData &&
                    (promotionsData.length < 0 ? (
                        <p>No Voucher Founded</p>
                    ) : (
                        <ScrollArea className="max-h-[80vh] pr-4">
                            <div className="grid gap-4 py-4">
                                {promotionsData.map((voucher: IPromotion) => (
                                    <div
                                        key={voucher.code}
                                        className="flex items-center justify-between rounded-lg border p-2"
                                    >
                                        <div className="flex flex-col">
                                            <span className="font-semibold">
                                                {voucher.code}
                                            </span>
                                            <span className="text-sm text-gray-500">
                                                {voucher.description}
                                            </span>
                                        </div>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="flex items-center gap-2"
                                            onClick={() =>
                                                copyToClipboard(voucher.code)
                                            }
                                        >
                                            {copiedCode === voucher.code ? (
                                                <>
                                                    <Check className="h-4 w-4" />
                                                    Copied
                                                </>
                                            ) : (
                                                <>
                                                    <Copy className="h-4 w-4" />
                                                    Copy
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    ))}
            </DialogContent>
        </Dialog>
    );
}
