import NavBar from "@/features/home/components/navbar";
import Footer from "@/features/home/components/footer";


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
