"use client";

import { IInfor } from "../../types/infor-type";
import { AuthDTO, PersonalInfor } from "../../utils/auth-validate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { useSignup } from "@/hooks/auth-hook/useAuth";
import { useGetCustomerById } from "@/hooks/customers-hook/useCustomers";

import { genderType } from "@/types/gender-type";

import { ErrorField } from "@/components/error-field";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface PersonalInforFormProp {
    signupData: IInfor | undefined;
    setSignupData: (value: IInfor) => void;
}
export function PersonalInforForm({
    signupData,
    setSignupData,
}: PersonalInforFormProp) {
    // thay thế bằng customerByEmail
    // const { data: customerById, isSuccess } = useGetCustomerById(
    //     signupData?.email,
    // );
    const [defaultValues, setDefaultValues] = useState({});

    // if (isSuccess) {
    //     setDefaultValues({
    //         fullName: customerById.fullName,
    //         gender: customerById.gender,
    //         dateOfBirth: customerById.birthDate,
    //         phoneNumber: customerById.phoneNumber,
    //     });
    // }
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<PersonalInfor>({
        resolver: zodResolver(AuthDTO.personalInforSchema),
        defaultValues,
    });

    const { mutate: signupMutate, isPending } = useSignup();

    const onSubmit = handleSubmit((data) => {
        setSignupData({ ...signupData, ...data });
        signupMutate(signupData, {
            onSuccess: () => {
                toast("Signup successfully!");
            },
            onError: () => {
                toast.error("Signup failed!");
            },
        });
    });
    return (
        <form onSubmit={onSubmit}>
            <CardContent className="flex flex-col">
                <div className="space-y-1">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                        {...register("fullName")}
                        placeholder="Enter your full name"
                    />
                </div>
                {errors.fullName && (
                    <ErrorField>{errors.fullName.message}</ErrorField>
                )}

                <div className="space-y-1">
                    <Label htmlFor="gender">Gender</Label>
                    <Controller
                        name="gender"
                        control={control}
                        render={({ field }) => (
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}
                            >
                                <SelectTrigger id="gender">
                                    <SelectValue placeholder="Select your gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    {genderType.map((genderValue) => (
                                        <SelectItem
                                            key={genderValue.value}
                                            value={genderValue.value}
                                        >
                                            {genderValue.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    />
                </div>
                {errors.gender && (
                    <ErrorField>{errors.gender.message}</ErrorField>
                )}

                <div className="space-y-1">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input type="date" {...register("dateOfBirth")} />
                </div>
                {errors.dateOfBirth && (
                    <ErrorField>{errors.dateOfBirth.message}</ErrorField>
                )}

                <div className="space-y-1">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                        {...register("phoneNumber")}
                        type="tel"
                        placeholder="Enter your phone number"
                    />
                </div>
                {errors.phoneNumber && (
                    <ErrorField>{errors.phoneNumber.message}</ErrorField>
                )}
            </CardContent>
            <CardContent className="flex flex-col space-y-4">
                <Button disabled={isPending}>Sign in</Button>
            </CardContent>
        </form>
    );
}
