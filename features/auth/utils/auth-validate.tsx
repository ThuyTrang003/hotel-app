import { z } from "zod";

// Định nghĩa schema cho User, nhiều thông tin khác
const UserSchema = z.object({
  fullName: z.string().min(3, "Username must be at least 3 characters long"),
  email: z.string().email("Invalid email"),
  phoneNumber: z.string(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(255, "Password must not be more than 255 characters long"),
});

// Định nghĩa AuthDTO với các schema cho đăng nhập và đăng ký
export class AuthDTO {
  private static baseSchema = UserSchema.pick({
    fullName: true,
    email: true,
    password: true,
  }).extend({
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters long"),
  });

  public static signinSchema = this.baseSchema.omit({
    //loại trừ
    fullName: true,
    confirmPassword: true,
  });

  public static signupSchema = this.baseSchema.refine(
    (data) => data.password === data.confirmPassword,
    {
      path: ["confirmPassword"],
      message: "Passwords must match",
    }
  );

  public static usernameSchema = this.baseSchema.pick({
    fullName: true,
  });
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace AuthDTO {
  export type Signin = z.infer<typeof AuthDTO.signinSchema>;
  export type Signup = z.infer<typeof AuthDTO.signupSchema>;
  export type Username = z.infer<typeof AuthDTO.usernameSchema>;
}
