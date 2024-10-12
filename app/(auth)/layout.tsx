export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="bg-white flex justify-between h-screen w-screen">
      <section className="w-1/2 h-screen">{children}</section>
      <div className=" m-2 bg-black w-1/2 rounded-xl"></div>
    </main>
  );
}
