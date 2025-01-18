import { Skeleton } from "@/components/ui/skeleton";

export function RoomCardSkeleton() {
    return (
        <div className="space-y-4 overflow-hidden rounded-lg">
            <Skeleton className="aspect-[4/3] overflow-hidden bg-amber-1/30"></Skeleton>
            <div className="space-y-2">
                <Skeleton className="h-6 w-28" />
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-3 w-20" />
            </div>
        </div>
    );
}
