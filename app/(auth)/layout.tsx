export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="flex h-screen w-screen justify-between bg-white">
            <section className="h-screen w-1/2">{children}</section>
            <div className="m-2 w-1/2 rounded-xl bg-black"></div>
        </main>
    );
}
