
import { Footer } from "@/features/layout-customer/footer";
import { NavBar } from "@/features/layout-customer/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="bg-white text-tertiary overflow-x-hidden antialiased flex flex-col min-h-screen"
      >
        <NavBar />
        {/* Ensure main takes up remaining space */}
        <main className="flex-grow">{children}</main>
        {/* Footer will stay at the bottom */}
        <Footer />
      </body>
    </html>
  );
}
