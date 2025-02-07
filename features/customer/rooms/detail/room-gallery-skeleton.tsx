import { Skeleton } from "@/components/ui/skeleton";

export function RoomGallerySkeleton() {
    return (
        <div className="flex flex-col space-y-4">
            <Skeleton className="w-full rounded-lg sm:h-[300px] md:h-[200px] lg:h-[300px] xl:h-[350px] 2xl:h-[400px]" />
            <div className="flex w-full justify-around space-x-2">
                <Skeleton className="h-24 flex-grow rounded-lg" />
                <Skeleton className="h-24 flex-grow rounded-lg" />
                <Skeleton className="h-24 flex-grow rounded-lg" />
                <Skeleton className="h-24 flex-grow rounded-lg" />
                <Skeleton className="h-24 flex-grow rounded-lg" />
            </div>
        </div>
    );
}
