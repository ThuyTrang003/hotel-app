import { PromotionsTable } from "./promotions-table/all-promotions-table";
import { AvailableTable } from "./promotions-table/available-table";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function PromotionTabs() {
    return (
        <Tabs defaultValue="available" className="w-full">
            <TabsList>
                <TabsTrigger value="available">
                    Promotions available
                </TabsTrigger>
                <TabsTrigger value="all">All promotions</TabsTrigger>
            </TabsList>
            <TabsContent value="available">
                <AvailableTable />
            </TabsContent>
            <TabsContent value="all">
                <PromotionsTable />
            </TabsContent>
        </Tabs>
    );
}
