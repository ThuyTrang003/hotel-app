import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useDeletePromotionById } from "@/hooks/promotions-hook/usePromotions";

import { AlertDialogSection } from "@/components/alert-dialog-section";

interface DeletePromotionDialogProps {
    children: React.ReactNode;
    promotionId: string;
    code: string;
}
export function DeletePromotionDialog({
    children,
    promotionId,
    code,
}: DeletePromotionDialogProps) {
    const { mutate: deletePromotion } = useDeletePromotionById();

    const queryClient = useQueryClient();

    const handleDeletePromotion = () => {
        deletePromotion(promotionId, {
            onSuccess: () => {
                toast("Delete promotion successfully!");
                queryClient.invalidateQueries({
                    queryKey: ["getAllPromotions"],
                });
            },
            onError: () => {
                toast("Delete promotion failed!");
            },
        });
    };

    return (
        <AlertDialogSection
            title="Confirm delete promotion"
            description={`Are you sure you want to delete promotion ${code}?`}
            cancelButtonContent="No"
            actionButtonContent="Yes"
            handleAction={handleDeletePromotion}
        >
            {children}
        </AlertDialogSection>
    );
}
