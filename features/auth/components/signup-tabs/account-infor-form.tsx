"use client";

import { AccountInfor, UserDTO } from "../../../../utils/user-validate";
import { IInfor } from "../../types/infor-type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { ErrorField } from "@/components/error-field";
import { IconInput, RightIcon } from "@/components/icon-input";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AccountInforFormProp {
    setActiveTab: (value: string) => void;
    setSignupData: (value: IInfor) => void;
}
export function AccountInforForm({
    setActiveTab,
    setSignupData,
}: AccountInforFormProp) {
    const [showPassword, setShowPassword] = useState(false);
    const [showconfirmPass, setShowconfirmPass] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AccountInfor>({
        resolver: zodResolver(UserDTO.accountInforSchema),
    });

    const onSubmit = handleSubmit((data) => {
        setActiveTab("personal");
        setSignupData({ ...data });
    });

    return (
        <form onSubmit={onSubmit}>
            <CardContent className="flex flex-col">
                <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        {...register("email")}
                        placeholder="Enter your email address"
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
                    >
                        <RightIcon>
                            <button
                                className="text-gray-500"
                                type="button"
                                onClick={() => {
                                    setShowPassword(!showPassword);
                                }}
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

                <div className="space-y-1">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <IconInput
                        {...register("confirmPassword")}
                        placeholder="Enter your password"
                        className="pr-10"
                        type={showconfirmPass ? "text" : "password"}
                    >
                        <RightIcon>
                            <button
                                className="text-gray-500"
                                type="button"
                                onClick={() => {
                                    setShowconfirmPass(!showconfirmPass);
                                }}
                            >
                                {showconfirmPass ? (
                                    <EyeOff size={22} />
                                ) : (
                                    <Eye size={22} />
                                )}
                            </button>
                        </RightIcon>
                    </IconInput>
                </div>
                {errors.confirmPassword && (
                    <ErrorField>{errors.confirmPassword.message}</ErrorField>
                )}
            </CardContent>
            <CardContent className="flex flex-col space-y-4">
                <Button>Next</Button>
            </CardContent>
        </form>
    );
}
