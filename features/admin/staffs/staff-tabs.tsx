import { ShiftsTable } from "./shifts-table";
import { StaffsTable } from "./staffs-table";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function StaffTabs() {
    return (
        <Tabs defaultValue="staffs" className="w-full">
            <TabsList>
                <TabsTrigger value="schedules">Work schedules</TabsTrigger>
                <TabsTrigger value="staffs">Staffs</TabsTrigger>
                <TabsTrigger value="shifts">Shifts</TabsTrigger>
            </TabsList>
            <TabsContent value="schedules">
                {/* <TypeRoomsTable /> */}
            </TabsContent>
            <TabsContent value="staffs">
                <StaffsTable />
            </TabsContent>
            <TabsContent value="shifts">
                <ShiftsTable />
            </TabsContent>
        </Tabs>
    );
}
