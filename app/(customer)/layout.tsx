
import { Footer } from "@/features/layout-customer/footer";
import NavBar from "@/features/layout-customer/navbar";

export default function HoomLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="text-tertiary flex min-h-screen flex-col overflow-x-hidden bg-white antialiased">
            <NavBar />
            {/* Ensure main takes up remaining space */}
            <main className="flex-grow">{children}</main>
            {/* Footer will stay at the bottom */}
            <Footer />
        </div>
    );
}

