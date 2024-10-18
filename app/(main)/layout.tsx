import { Button } from "@/components/ui/button";
import { SearchBar } from "@/features/search/component/search-bar";
import { Action } from "@/features/shared/navbar.tsx/action";
import Image from "next/image";
import Link from "next/link";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-screen bg-white">
      <div className="h-10 w-full flex justify-between items-center px-8 my-4">
        <Link href="/">
          <Image src="/logoipsum-330.svg" alt="logo" width={150} height={100} />
        </Link>
        <SearchBar />
        <Action />
      </div>
      <div>{children}</div>
    </div>
  );
}
