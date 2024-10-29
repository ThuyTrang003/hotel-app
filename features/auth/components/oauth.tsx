"use client";

import { FaGoogle } from "react-icons/fa";

import { CardContent } from "@/components/ui/card";

export function OauthButton() {
    const handleSignIn = () => {};
    return (
        <CardContent className="items-center">
            <div className="flex w-full items-center">
                <div className="h-0.5 grow bg-gray-400"></div>
                <span className="px-4 text-gray-500">Or login with</span>
                <div className="h-0.5 grow bg-gray-400"></div>
            </div>
            <div className="flex justify-center space-x-4">
                <button onClick={handleSignIn}>
                    <FaGoogle size={35} />
                </button>
            </div>
        </CardContent>
    );
}
