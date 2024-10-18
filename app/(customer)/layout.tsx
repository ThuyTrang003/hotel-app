import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-white text-tertiary overflow-x-hidden antialiased`}
      >
        <NavBar />
        {children}
        <Footer/>
      </body>
    </html>
  );
}
