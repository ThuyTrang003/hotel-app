import { SigninForm } from "@/features/auth/components/signin-form";
import { AuthLayout } from "@/features/auth/layout/auth.layout";

export default function SigninPage() {
  return (
    <div className="flex flex-col justify-center items-center h-full">
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
