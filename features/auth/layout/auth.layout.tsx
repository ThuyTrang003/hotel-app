import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { OauthButton } from "@/features/auth/components/oauth";
import Link from "next/link";

interface AuthLayoutProps {
  title: string;
  subTitle?: string;
  isSignin?: boolean;
  children?: React.ReactNode;
}
export function AuthLayout({
  children,
  title,
  isSignin,
  subTitle,
}: AuthLayoutProps) {
  const footerLink = isSignin
    ? {
        title: "Don't have an account?",
        href: "/signup",
        text: "Register",
      }
    : {
        title: "Already have an account?",
        href: "/signin",
        text: "Sign In",
      };

  return (
    <Card className="border-0 w-[400px]">
      <CardHeader>
        <CardTitle className="text-3xl">{title} </CardTitle>
        <CardDescription>{subTitle}</CardDescription>
      </CardHeader>
      {children}
      <OauthButton />
      <CardDescription className=" flex justify-center text-base">
        <span className="text-gray-500">{footerLink.title}</span>
        <Link
          href={footerLink.href}
          className="hover:underline font-semibold text-black"
        >
          {" "}
          {footerLink.text}
        </Link>
      </CardDescription>
    </Card>
  );
}
