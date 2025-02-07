import { Skeleton } from "@mui/material";
import { CalendarClock, CalendarRange, Copy, Tag } from "lucide-react";

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

export function PromotionCardSkeleton() {
    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <Skeleton className="h-10 w-28" />
                    <Skeleton className="h-12 w-8" />
                </CardTitle>
                <Skeleton className="h-8 w-32" />
            </CardHeader>
            <CardContent>
                <Skeleton className="h-28 w-full" />
            </CardContent>
        </Card>
    );
}
