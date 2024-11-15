import { RoomsTable } from "./rooms-table";
import { TypeRoomsTable } from "./types-table";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function RoomsTabs() {
    return (
        <Tabs defaultValue="typeRoom" className="w-full">
            <TabsList>
                <TabsTrigger value="typeRoom">Type room</TabsTrigger>
                <TabsTrigger value="rooms">Rooms</TabsTrigger>
            </TabsList>
            <TabsContent value="typeRoom">
                <TypeRoomsTable />
            </TabsContent>
            <TabsContent value="rooms">
                <RoomsTable />
            </TabsContent>
        </Tabs>
    );
}
