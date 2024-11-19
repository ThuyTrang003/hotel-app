import {
    createPromotion,
    deletePromotionById,
    getAllPromotions,
    getPromotionById,
    updatePromotionById,
} from "../../apis/promotions-api/promotions";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetAllPromotions = (params) => {
    return useQuery({
        queryKey: ["getAllPromotions", params],
        queryFn: () => getAllPromotions(params),
    });
};

export const useGetPromotionById = (id) => {
    return useQuery({
        queryKey: ["getPromotionById", id],
        queryFn: () => getPromotionById(id),
        enabled: !!id, // Chỉ thực thi query khi id tồn tại
    });
};

export const useUpdatePromotionById = () => {
    return useMutation({
        mutationFn: updatePromotionById,
    });
};
export const useCreatePromotion = () => {
    return useMutation({
        mutationFn: createPromotion,
    });
};

export const useDeletePromotionById = () => {
    return useMutation({
        mutationFn: deletePromotionById,
    });
};
