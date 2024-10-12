"use client";
import { CardContent } from "@/components/ui/card";
import { FaGoogle, FaGithub } from "react-icons/fa";
export function OauthButton() {
  const handleSignIn = () => {};
  const handleSignInGithub = () => {};
  return (
    <CardContent className="items-center ">
      <div className="flex w-full items-center">
        <div className="h-0.5 grow bg-gray-400"></div>
        <span className="px-4 text-gray-500">Or login with</span>
        <div className="h-0.5 grow bg-gray-400"></div>
      </div>
      <div className="flex space-x-4 justify-center">
        <button onClick={handleSignIn}>
          <FaGoogle size={35} />
        </button>
        <button onClick={handleSignInGithub}>
          <FaGithub size={35} />
        </button>
      </div>
    </CardContent>
  );
}
