"use client";

import { AuthLayout } from "../../layout/auth.layout";
import { IInfor } from "../../types/infor-type";
import { AccountInforForm } from "./account-infor-form";
import { PersonalInforForm } from "./personal-infor-form";
import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function SignupTabs() {
    const [activeTab, setActiveTab] = useState("account");
    const [signupData, setSignupData] = useState<IInfor>();

    return (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 bg-amber-1/10">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger disabled value="personal">
                    Personal Info
                </TabsTrigger>
            </TabsList>
            <TabsContent value="account">
                <AuthLayout
                    title="Account Information"
                    subTitle="Enter your account details here."
                    isSignin={false}
                >
                    <AccountInforForm
                        setActiveTab={setActiveTab}
                        setSignupData={setSignupData}
                    />
                </AuthLayout>
            </TabsContent>
            <TabsContent value="personal">
                <AuthLayout
                    title="Personal Information"
                    subTitle="Provide your personal details here."
                    isSignin={false}
                    isOauth={false}
                >
                    <PersonalInforForm
                        signupData={signupData}
                        setSignupData={setSignupData}
                    />
                </AuthLayout>
            </TabsContent>
        </Tabs>
    );
}
