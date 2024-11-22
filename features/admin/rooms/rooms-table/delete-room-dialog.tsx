import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useUpdateRoom } from "@/hooks/rooms-hook/useRooms";

import { AlertDialogSection } from "@/components/alert-dialog-section";

interface DeleteRoomDialogProps {
    children: React.ReactNode;
    roomId: string;
    roomNumber: string;
}
export function DeleteRoomDialog({
    children,
    roomId,
    roomNumber,
}: DeleteRoomDialogProps) {
    const { mutate: deleteRoom } = useUpdateRoom();
    const payload = {
        status: false,
    };
    const queryClient = useQueryClient();

    const handleDeleteRoom = () => {
        deleteRoom(
            { id: roomId, data: payload },
            {
                onSuccess: () => {
                    toast("Delete room successfully!");
                    queryClient.invalidateQueries({
                        queryKey: ["getAllRooms"],
                    });
                },
                onError: () => {
                    toast("Delete room failed!");
                },
            },
        );
    };

    return (
        <AlertDialogSection
            title="Confirm delete room"
            description={`Are you sure you want to delete room ${roomNumber}?`}
            cancelButtonContent="No"
            actionButtonContent="Yes"
            handleAction={handleDeleteRoom}
        >
            {children}
        </AlertDialogSection>
    );
}
