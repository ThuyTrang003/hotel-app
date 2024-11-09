import { Skeleton } from "@/components/ui/skeleton";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function TableSkeleton() {
    return (
        <div className="h-full w-full space-y-10">
            {/* Table Skeleton */}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            <Skeleton className="h-6 w-full" />
                        </TableHead>
                        <TableHead>
                            <Skeleton className="h-6 w-full" />
                        </TableHead>
                        <TableHead>
                            <Skeleton className="h-6 w-full" />
                        </TableHead>
                        <TableHead>
                            <Skeleton className="h-6 w-full" />
                        </TableHead>
                        <TableHead>
                            <Skeleton className="h-6 w-full" />
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {[...Array(7)].map((_, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <Skeleton className="h-4 w-full" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-4 w-full" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-4 w-full" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-4 w-full" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-4 w-full" />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
