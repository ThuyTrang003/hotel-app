import { BookingsTable } from "./booking-schedule.tsx";
import { OverOccupancyChargeTable } from "./over-occupancy-charges";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function BookingTabs() {
    return (
        <Tabs defaultValue="bookingSchedule" className="w-full">
            <TabsList>
                <TabsTrigger value="bookingSchedule">
                    Booking Schedule
                </TabsTrigger>
                <TabsTrigger value="OverOccupancyCharge">
                    Over Occupancy Charge
                </TabsTrigger>
            </TabsList>
            <TabsContent value="bookingSchedule">
                <BookingsTable />
            </TabsContent>
            <TabsContent value="OverOccupancyCharge">
                <OverOccupancyChargeTable />
            </TabsContent>
        </Tabs>
    );
}
