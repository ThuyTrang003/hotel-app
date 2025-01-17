import { DetailDialog } from "./detail-dialog";
import { CalendarRange, Copy, Info } from "lucide-react";
import { toast } from "sonner";

import { dateFormatter } from "@/utils/date-formatter";

import { IPromotion } from "@/features/admin/promotions/promotions-table/promotions-columns";

import { TooltipModel } from "@/components/tooltip-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

interface PromotionCardProps {
    promotion: IPromotion;
}
export function PromotionCard({ promotion }: PromotionCardProps) {
    const startDate = new Date(promotion.startDate);
    const endDate = new Date(promotion.endDate);
    const isActive = new Date() >= startDate && new Date() <= endDate;
    const copyToClipboard = () => {
        navigator.clipboard.writeText(promotion.code);
        toast.success("Copied to clipboard!");
    };

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <span>{promotion.code}</span>
                    <TooltipModel content="Copy to clipboard" side="bottom">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={copyToClipboard}
                        >
                            <Copy className="h-4 w-4" />
                        </Button>
                    </TooltipModel>
                </CardTitle>
                <CardDescription>{promotion.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex items-center justify-between rounded-lg bg-amber-1/20 p-3">
                        <div className="text-center">
                            <p className="text-sm font-medium text-muted-foreground">
                                Starts
                            </p>
                            <p className="text-lg font-semibold">
                                {dateFormatter(promotion.startDate)}
                            </p>
                        </div>
                        <CalendarRange className="m-2 h-5 w-5 text-muted-foreground" />
                        <div className="text-center">
                            <p className="text-sm font-medium text-muted-foreground">
                                Ends
                            </p>
                            <p className="text-lg font-semibold">
                                {dateFormatter(promotion.endDate)}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <Badge variant={isActive ? "default" : "secondary"}>
                            {isActive ? "Active" : "Inactive"}
                        </Badge>
                        <TooltipModel content="More information" side="top">
                            <DetailDialog promotion={promotion}>
                                <Button variant="ghost" size="icon">
                                    <Info className="h-4 w-4" />
                                </Button>
                            </DetailDialog>
                        </TooltipModel>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
