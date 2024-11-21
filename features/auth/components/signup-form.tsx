"use client";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

import { IconInput, RightIcon } from "@/components/icon-input";
import { CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { AuthDTO } from "../utils/auth-validate";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorField } from "@/components/error-field";

export function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showconfirmPass, setShowconfirmPass] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthDTO.Signup>({
    resolver: zodResolver(AuthDTO.signupSchema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });
  return (
    <form onSubmit={onSubmit}>
      <CardContent className="flex flex-col">
        <div className=" space-y-1">
          <Label htmlFor="fullName">Name</Label>
          <Input {...register("fullName")} placeholder="Enter your full name" />
        </div>
        {errors.fullName && <ErrorField>{errors.fullName.message}</ErrorField>}

        <div className=" space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input
            {...register("email")}
            placeholder="Enter your email address"
          />
        </div>
        {errors.email && <ErrorField>{errors.email.message}</ErrorField>}

        <div className=" space-y-1">
          <Label htmlFor="password">Password</Label>
          <IconInput
            {...register("password")}
            placeholder="Enter your password"
            className="pr-10"
            type={showPassword ? "text" : "password"}
          >
            <RightIcon>
              <button
                className=" text-gray-500"
                type="button"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
                //disabled={isPending}
              >
                {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
              </button>
            </RightIcon>
          </IconInput>
        </div>
        {errors.password && <ErrorField>{errors.password.message}</ErrorField>}

        <div className=" space-y-1">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <IconInput
            {...register("confirmPassword")}
            placeholder="Enter your password"
            className="pr-10"
            type={showconfirmPass ? "text" : "password"}
          >
            <RightIcon>
              <button
                className=" text-gray-500"
                type="button"
                onClick={() => {
                  setShowconfirmPass(!showconfirmPass);
                }}
                //disabled={isPending}
              >
                {showconfirmPass ? <EyeOff size={22} /> : <Eye size={22} />}
              </button>
            </RightIcon>
          </IconInput>
        </div>
        {errors.confirmPassword && (
          <ErrorField>{errors.confirmPassword.message}</ErrorField>
        )}
      </CardContent>
      <CardContent className="flex flex-col space-y-4">
        <Button>Sign in</Button>
      </CardContent>
    </form>
  );
}