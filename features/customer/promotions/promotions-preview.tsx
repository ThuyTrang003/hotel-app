import { PromotionCard } from "./promotion-card";
import { PromotionCardSkeleton } from "./promotion-card-skeleton";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

import { useGetAllPromotions } from "@/hooks/promotions-hook/usePromotions";

import { IPromotion } from "@/features/admin/promotions/promotions-table/promotions-columns";

import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

export function PromotionPreview() {
    const router = useRouter();
    const {
        data: allPromotionsData,
        isError,
        error,
        isPending,
    } = useGetAllPromotions({ valid: true });
    return (
        <section className="px-10 py-12">
            <div className="flex items-center justify-between pb-4">
                <h2 className="text-2xl font-semibold tracking-tight">
                    Promotions
                </h2>
                <Button
                    variant="ghost"
                    className="text-muted-foreground hover:text-foreground"
                    onClick={() => router.push("/promotions")}
                >
                    See All
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="mx-10"
            >
                <CarouselContent className="w-full">
                    {isPending ? (
                        Array.from({ length: 4 }).map((_, index) => (
                            <CarouselItem
                                key={index}
                                className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                            >
                                <PromotionCardSkeleton />
                            </CarouselItem>
                        ))
                    ) : allPromotionsData.length > 0 ? (
                        allPromotionsData
                            ?.slice(0, 10)
                            .map((promotion: IPromotion) => (
                                <CarouselItem
                                    key={promotion._id}
                                    className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                                >
                                    <PromotionCard promotion={promotion} />
                                </CarouselItem>
                            ))
                    ) : (
                        <div className="flex w-full justify-center text-muted-foreground">
                            No promotions available!
                        </div>
                    )}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </section>
    );
}
