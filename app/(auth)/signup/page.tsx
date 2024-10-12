import { AuthLayout } from "@/features/auth/layout/auth.layout";
import { SignupForm } from "@/features/auth/components/signup-form";

export default function SigninPage() {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <AuthLayout
        title="Create your account"
        subTitle="Sign up to access."
        isSignin={false}
      >
        <SignupForm />
      </AuthLayout>
    </div>
  );
}
