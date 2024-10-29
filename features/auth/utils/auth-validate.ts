import { z } from "zod";

// Định nghĩa schema cho User, nhiều thông tin khác
const UserSchema = z.object({
    fullName: z
        .string()
        .min(3, "fullname must be at least 3 characters long")
        .max(30, "fullname must not be more than 30 characters long"),
    email: z.string().email("Invalid email"),
    phoneNumber: z.string().regex(/^(03|05|07|08|09)\d{8}$/, {
        message: "Invalid phone number format",
    }),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters long")
        .max(255, "Password must not be more than 255 characters long")
        .refine(
            (value) => {
                // Kiểm tra có ít nhất 1 chữ cái viết hoa
                const hasUpperCase = /[A-Z]/.test(value);
                // Kiểm tra có ít nhất 1 chữ cái viết thường
                const hasLowerCase = /[a-z]/.test(value);
                // Kiểm tra có ít nhất 1 số
                const hasNumber = /\d/.test(value);

                return hasUpperCase && hasLowerCase && hasNumber;
            },
            {
                message:
                    "Password must have contains at least 1 upcase letter, 1 number and 1 lowercase letter",
            },
        ),
    gender: z.enum(["Male", "Female"], {
        required_error: "Gender is required",
    }),
    dateOfBirth: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date format",
    }), // Kiểm tra định dạng ngày hợp lệ
});

// Định nghĩa AuthDTO với các schema cho đăng nhập và đăng ký
export class AuthDTO {
    public static signinSchema = UserSchema.pick({
        email: true,
        password: true,
    });

    public static accountInforSchema = UserSchema.pick({
        email: true,
        password: true,
    })
        .extend({
            confirmPassword: z
                .string()
                .min(6, "Password must be at least 6 characters long"),
        })
        .refine((data) => data.password === data.confirmPassword, {
            path: ["confirmPassword"],
            message: "Passwords must match",
        });

    public static personalInforSchema = UserSchema.pick({
        fullName: true,
        phoneNumber: true,
        gender: true,
        dateOfBirth: true,
    });

    public static fullNameSchema = UserSchema.pick({
        fullName: true,
    });
}

export type Signin = z.infer<typeof AuthDTO.signinSchema>;
export type AccountInfor = z.infer<typeof AuthDTO.accountInforSchema>;
export type PersonalInfor = z.infer<typeof AuthDTO.personalInforSchema>;
export type FullName = z.infer<typeof AuthDTO.fullNameSchema>;
