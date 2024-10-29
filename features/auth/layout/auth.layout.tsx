import Link from "next/link";

import { OauthButton } from "@/features/auth/components/oauth";

import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

interface AuthLayoutProps {
    title?: string;
    subTitle?: string;
    isSignin: boolean;
    children: React.ReactNode;
    isOauth?: boolean;
}
export function AuthLayout({
    children,
    title,
    isSignin,
    subTitle,
    isOauth = true,
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
        <Card className="w-[400px] border-0">
            <CardHeader className="pt-0">
                <CardTitle className="text-3xl">{title} </CardTitle>
                <CardDescription>{subTitle}</CardDescription>
            </CardHeader>
            {children}
            {isOauth && <OauthButton />}
            <CardDescription className="flex justify-center text-base">
                <span className="text-gray-500">{footerLink.title}</span>
                <Link
                    href={footerLink.href}
                    className="font-semibold text-black hover:underline"
                >
                    {" "}
                    {footerLink.text}
                </Link>
            </CardDescription>
        </Card>
    );
}
