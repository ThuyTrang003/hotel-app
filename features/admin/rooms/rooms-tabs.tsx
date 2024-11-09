import { RoomsTable } from "./rooms-table";
import { TypeRoomsTable } from "./types-table";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function RoomsTabs() {
    return (
        <Tabs defaultValue="rooms" className="w-full">
            <TabsList>
                <TabsTrigger value="rooms">Rooms</TabsTrigger>
                <TabsTrigger value="typeRoom">Type room</TabsTrigger>
            </TabsList>
            <TabsContent value="rooms">
                <RoomsTable />
            </TabsContent>
            <TabsContent value="typeRoom">
                <TypeRoomsTable />
            </TabsContent>
        </Tabs>
    );
}
