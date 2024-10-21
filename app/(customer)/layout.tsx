import { Footer } from "@/features/layout-customer/footer";
import { NavBar } from "@/features/layout-customer/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white text-tertiary overflow-x-hidden antialiased">
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
