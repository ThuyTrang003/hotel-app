import { SigninForm } from "@/features/auth/components/signin-form";
import { AuthLayout } from "@/features/auth/layout/auth.layout";

export default function VerifyEmailPage() {
    return (
        <div className="flex h-full flex-col items-center justify-center">
            <AuthLayout
                title="Login"
                subTitle="Enter your username and password to continue."
                isSignin={true}
            >
                <SigninForm />
            </AuthLayout>
        </div>
    );
}
