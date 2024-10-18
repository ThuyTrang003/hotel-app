"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function BeforeLogin() {
  return (
    <div className="space-x-2">
      <Button
        variant="secondary"
        className="rounded-full text-black bg-transparent px-6"
      >
        Log in
      </Button>
      <Button className="rounded-full px-6">Sign up</Button>
    </div>
  );
}

export function AfterLogin() {
  return (
    <div className="space-x-4 flex">
      <Button className="rounded-full">Booking</Button>
      <Link href="/">
        <Image
          src="/user.svg"
          className="text-black"
          alt="user"
          width={40}
          height={40}
        />
      </Link>
    </div>
  );
}

export function Action() {
  const [isSignin, setIsSignin] = useState(true);
  return <>{isSignin ? <AfterLogin /> : <BeforeLogin />}</>;
}
