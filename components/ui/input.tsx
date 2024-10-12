import * as React from "react";

import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
const inputVariants = cva(
  "flex text-black w-full rounded-md border border-input bg-background py-2  ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      customSize: {
        default: "h-10 px-3.5 text-base",
        sm: "h-9 rounded-md px-3 text-sm",
        lg: "h-11 rounded-md px-4 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      customSize: "default",
    },
  }
);

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, customSize, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ className, customSize }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
