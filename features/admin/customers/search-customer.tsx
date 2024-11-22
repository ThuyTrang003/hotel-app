import { CustomerDialog } from "./customer-dialog";
import DetailCustomer from "./detail-customer";

import { useGetAllCustomers } from "@/hooks/customers-hook/useCustomers";

import { Button } from "@/components/ui/button";

interface SearchCustomerProps {
    phoneNumber: string;
    setUserId: (userId: string) => void;
}
export function SearchCustomer({
    phoneNumber,
    setUserId,
}: SearchCustomerProps) {
    const { data: customerByPhone, isPending } = useGetAllCustomers({
        page: 1,
        size: 1,
        phone: phoneNumber,
    });
    console.log(customerByPhone?.data[0]);

    if (isPending) {
        return;
    }
    if (customerByPhone && customerByPhone.metadata.totalElements !== 0) {
        setUserId(customerByPhone.data[0].id);
    } else setUserId("");
    return (
        <div>
            {customerByPhone.metadata.totalElements !== 0 ? (
                <DetailCustomer detailInfor={customerByPhone.data[0]} />
            ) : (
                <>
                    <CustomerDialog>
                        <Button>Add customer</Button>
                    </CustomerDialog>
                </>
            )}
        </div>
    );
}
