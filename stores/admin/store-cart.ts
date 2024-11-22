import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface CartItem {
    typeId: string;
    numberOfRooms: number;
    typeName: string;
    price: {
        hourlyRate: number;
        dailyRate: number;
    };
    limit: number;
}

interface CartStore {
    typeRooms: CartItem[];
    addToCart: (
        typeId: string,
        numberOfRooms: number,
        typeName: string,
        price: {
            hourlyRate: number;
            dailyRate: number;
        },
        limit: number,
    ) => void;
    removeFromCart: (typeId: string) => void;
    clearCart: () => void;
}
export const useCartStore = create(
    persist<CartStore>(
        (set, get) => ({
            typeRooms: [], // Giỏ hàng ban đầu

            // Thêm hoặc cập nhật item trong giỏ hàng
            addToCart: (typeId, numberOfRooms, typeName, price, limit) => {
                const { typeRooms } = get();
                const existingIndex = typeRooms.findIndex(
                    (item) => item.typeId === typeId,
                );

                if (existingIndex !== -1) {
                    // Nếu item đã tồn tại, cập nhật số lượng phòng
                    const updatedRooms = [...typeRooms];
                    updatedRooms[existingIndex].numberOfRooms = numberOfRooms;
                    set({ typeRooms: updatedRooms });
                } else {
                    // Nếu chưa tồn tại, thêm mới
                    set({
                        typeRooms: [
                            ...typeRooms,
                            { typeId, numberOfRooms, typeName, price, limit },
                        ],
                    });
                }
            },

            // Xóa item khỏi giỏ hàng
            removeFromCart: (typeId) => {
                const { typeRooms } = get();
                set({
                    typeRooms: typeRooms.filter(
                        (item) => item.typeId !== typeId,
                    ),
                });
            },

            // Xóa toàn bộ giỏ hàng
            clearCart: () => {
                set({ typeRooms: [] });
            },
        }),
        {
            name: "cart",
            storage: createJSONStorage(() => localStorage),
        },
    ),
);
