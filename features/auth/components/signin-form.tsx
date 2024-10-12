"use client";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";

import { IconInput, RightIcon } from "@/components/icon-input";
import { CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { AuthDTO } from "../utils/auth-validate";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorField } from "@/components/error-field";

export function SigninForm() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthDTO.Signin>({
    resolver: zodResolver(AuthDTO.signinSchema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });
  return (
    <form onSubmit={onSubmit}>
      <CardContent className="flex flex-col">
        <div className=" space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input {...register("email")} placeholder="Enter your mail address" />
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

        <CardDescription className="hover:underline flex justify-end cursor-pointer text-black">
          Forgot password ?
        </CardDescription>
      </CardContent>
      <CardContent className="flex flex-col space-y-4">
        <Button>Sign in</Button>
      </CardContent>
    </form>
  );
}
