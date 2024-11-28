import { useUserAccount } from "@/stores/user-account/store-user-account";

export const isAdmin = () => {
    const role = useUserAccount.getState().userAccount.role;
    if (role !== "Admin") {
        return false;
    } else return true;
};
