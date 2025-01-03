import Image from "next/image";

import { Footer } from "@/features/customer/layout/footer";
import { Navbar } from "@/features/customer/layout/navbar";
import NavBar from "@/features/layout-customer/navbar";

export default function HoomLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex w-full flex-col">
            {/* <NavBar /> */}
            <Navbar />

            <main className="flex-grow pt-16">{children}</main>
            <Footer />
        </div>
    );
}
