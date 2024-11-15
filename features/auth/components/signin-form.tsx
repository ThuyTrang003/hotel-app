"use client";

import { AuthDTO, Signin } from "../utils/auth-validate";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useSignin } from "@/hooks/auth-hook/useAuth";

import { useUserAccount } from "@/stores/user-account/store-user-account";

import { ErrorField } from "@/components/error-field";
import { IconInput, RightIcon } from "@/components/icon-input";
import { Button } from "@/components/ui/button";
import { CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SigninForm() {
    const { setUserAccount } = useUserAccount();
    const router = useRouter();
    const { mutate: signinMutate, isPending } = useSignin();

    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Signin>({
        resolver: zodResolver(AuthDTO.signinSchema),
    });

    const onSubmit = handleSubmit((data) => {
        signinMutate(data, {
            onSuccess: (res) => {
                toast("Signin successfully!");
                if (res.role === "Customer") {
                    router.replace("/");
                } else {
                    router.replace("/admin/dashboard");
                }
                setUserAccount(res.user_id, res.role);
            },
            onError: (message) => {
                toast("Signin failed! " + message);
            },
        });
    });
    return (
        <form onSubmit={onSubmit}>
            <CardContent className="flex flex-col">
                <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        {...register("email")}
                        placeholder="Enter your mail address"
                        disabled={isPending}
                    />
                </div>
                {errors.email && (
                    <ErrorField>{errors.email.message}</ErrorField>
                )}

                <div className="space-y-1">
                    <Label htmlFor="password">Password</Label>
                    <IconInput
                        {...register("password")}
                        placeholder="Enter your password"
                        className="pr-10"
                        type={showPassword ? "text" : "password"}
                        disabled={isPending}
                    >
                        <RightIcon>
                            <button
                                className="text-gray-500"
                                type="button"
                                onClick={() => {
                                    setShowPassword(!showPassword);
                                }}
                                disabled={isPending}
                            >
                                {showPassword ? (
                                    <EyeOff size={22} />
                                ) : (
                                    <Eye size={22} />
                                )}
                            </button>
                        </RightIcon>
                    </IconInput>
                </div>
                {errors.password && (
                    <ErrorField>{errors.password.message}</ErrorField>
                )}

                <CardDescription className="flex cursor-pointer justify-end text-black hover:underline">
                    Forgot password ?
                </CardDescription>
            </CardContent>
            <CardContent className="flex flex-col space-y-4">
                <Button disabled={isPending}>Sign in</Button>
            </CardContent>
        </form>
    );
}
