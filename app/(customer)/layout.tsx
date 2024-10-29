import { Footer } from "@/features/layout-customer/footer";
import { NavBar } from "@/features/layout-customer/navbar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="text-tertiary overflow-x-hidden bg-white antialiased">
            <NavBar />
            {children}
            <Footer />
        </div>
    );
}
