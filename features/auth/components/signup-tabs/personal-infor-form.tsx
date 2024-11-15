"use client";

import { PersonalInfor, UserDTO } from "../../../../utils/user-validate";
import { IInfor } from "../../types/infor-type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { useSignup } from "@/hooks/auth-hook/useAuth";
import { useGetAllCustomers } from "@/hooks/customers-hook/useCustomers";

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
    const [defaultValues, setDefaultValues] = useState({});
    const [phone, setPhone] = useState("");
    const {
        register,
        handleSubmit,
        setValue,
        control,
        formState: { errors },
    } = useForm<PersonalInfor>({
        resolver: zodResolver(UserDTO.personalInforSchema),
    });

    // const { data: customerByPhone, isSuccess } = useGetAllCustomers({
    //     phone: phone,
    //     page: 1,
    //     size: 1,
    // });

    // useEffect(() => {
    //     if (isSuccess) {
    //         setValue("fullName", customerByPhone.data.fullName);
    //         setValue("gender", customerByPhone.data.gender);
    //         setValue("dateOfBirth", customerByPhone.data.birthDate);
    //     }
    // }, [customerByPhone]);

    const { mutate: signupMutate, isPending } = useSignup();

    const onSubmit = handleSubmit((data) => {
        setSignupData({ ...signupData, ...data });
        const payload = { ...signupData, role: "Customer" };
        signupMutate(payload, {
            onSuccess: () => {
                toast("Signup successfully!");
            },
            onError: (message) => {
                toast.error("Error: " + message);
            },
        });
    });
    return (
        <form onSubmit={onSubmit}>
            <CardContent className="flex flex-col">
                <div className="space-y-1">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                        {...register("phoneNumber")}
                        type="tel"
                        placeholder="Enter your phone number"
                        onBlur={(e) => setPhone(e.target.value)}
                    />
                </div>
                {errors.phoneNumber && (
                    <ErrorField>{errors.phoneNumber.message}</ErrorField>
                )}
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
            </CardContent>
            <CardContent className="flex flex-col space-y-4">
                <Button disabled={isPending}>Sign up</Button>
            </CardContent>
        </form>
    );
}
