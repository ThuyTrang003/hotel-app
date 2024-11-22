import { Calendar, CirclePercent, Phone, User, Users } from "lucide-react";

import { dateFormatter } from "@/utils/date-formatter";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DetailCustomerProps {
    detailInfor: {
        fullName: string;
        phoneNumber: string;
        gender: string;
        birthDate: string;
        role: string;
        point: number;
    };
}

export default function DetailCustomer({ detailInfor }: DetailCustomerProps) {
    return (
        <Card className="mx-auto w-full">
            <CardHeader className="flex flex-row items-center py-3">
                <div>
                    <CardTitle className="text-2xl">
                        {detailInfor.fullName}
                    </CardTitle>
                </div>
            </CardHeader>
            <CardContent className="flex flex-col">
                <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>Phone Number: {detailInfor.phoneNumber}</span>
                </div>
                <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>Gender: {detailInfor.gender}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>
                        Birth Date: {dateFormatter(detailInfor.birthDate)}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>Type: {detailInfor.role}</span>
                </div>
                <div className="flex items-center gap-2">
                    <CirclePercent className="h-4 w-4 text-muted-foreground" />
                    <span>Point: {detailInfor.point}</span>
                </div>
            </CardContent>
        </Card>
    );
}
