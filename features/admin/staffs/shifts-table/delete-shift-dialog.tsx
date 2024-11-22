import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useDeleteShiftById } from "@/hooks/staffs-hook/useShifts";

import { AlertDialogSection } from "@/components/alert-dialog-section";

interface DeleteShiftDialogProps {
    children: React.ReactNode;
    shiftId: string;
    shiftName: string;
}
export function DeleteShiftDialog({
    children,
    shiftId,
    shiftName,
}: DeleteShiftDialogProps) {
    const { mutate: deleteShift } = useDeleteShiftById();

    const queryClient = useQueryClient();

    const handleDeleteShift = () => {
        deleteShift(shiftId, {
            onSuccess: () => {
                toast("Delete shift successfully!");
                queryClient.invalidateQueries({
                    queryKey: ["getAllShifts"],
                });
            },
            onError: () => {
                toast("Delete shift failed!");
            },
        });
    };

    return (
        <AlertDialogSection
            title="Confirm delete shift"
            description={`Are you sure you want to delete shift ${shiftName}?`}
            cancelButtonContent="No"
            actionButtonContent="Yes"
            handleAction={handleDeleteShift}
        >
            {children}
        </AlertDialogSection>
    );
}
