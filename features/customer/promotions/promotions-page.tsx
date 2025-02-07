"use client";

import { PromotionCard } from "./promotion-card";
import { PromotionCardSkeleton } from "./promotion-card-skeleton";

import { useGetAllPromotions } from "@/hooks/promotions-hook/usePromotions";

import { IPromotion } from "@/features/admin/promotions/promotions-table/promotions-columns";

export function PromotionsPage() {
    const { data: allPromotionsData, isPending } = useGetAllPromotions({
        valid: true,
    });
    return (
        <section className="px-10 pb-12 pt-6">
            <div className="flex items-center pb-4">
                <h2 className="text-2xl font-semibold tracking-tight">
                    Promotions
                </h2>
            </div>

            <div className="grid w-full gap-6 md:grid-cols-2 lg:grid-cols-3">
                {isPending ? (
                    Array.from({ length: 4 }).map((_, index) => (
                        <PromotionCardSkeleton key={index} />
                    ))
                ) : allPromotionsData.length > 0 ? (
                    allPromotionsData
                        ?.slice(0, 10)
                        .map((promotion: IPromotion) => (
                            <PromotionCard
                                promotion={promotion}
                                key={promotion._id}
                            />
                        ))
                ) : (
                    <div className="flex w-full justify-center text-muted-foreground">
                        No promotions available!
                    </div>
                )}
            </div>
        </section>
    );
}
