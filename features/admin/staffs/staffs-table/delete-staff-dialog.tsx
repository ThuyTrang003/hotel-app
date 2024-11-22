import { Staff } from "./staffs-columns";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useUpdateStaff } from "@/hooks/staffs-hook/useStaffs";

import { AlertDialogSection } from "@/components/alert-dialog-section";

interface DeleteStaffDialogProps {
    children: React.ReactNode;
    staff: Staff;
}
export function DeleteStaffDialog({ children, staff }: DeleteStaffDialogProps) {
    const { mutate: deleteStaff } = useUpdateStaff();
    const payload = {
        email: null,
        phoneNumber: null,
        status: false,
    };
    const queryClient = useQueryClient();

    const handleDeleteStaff = () => {
        deleteStaff(
            { id: staff.id, data: payload },
            {
                onSuccess: () => {
                    toast("Delete staff successfully!");
                    queryClient.invalidateQueries({
                        queryKey: ["getAllStaffs"],
                    });
                },
                onError: () => {
                    toast("Delete staff failed!");
                },
            },
        );
    };

    return (
        <AlertDialogSection
            title="Confirm delete staff"
            description={`Are you sure you want to delete account's ${staff.fullName}?`}
            cancelButtonContent="No"
            actionButtonContent="Yes"
            handleAction={handleDeleteStaff}
        >
            {children}
        </AlertDialogSection>
    );
}
