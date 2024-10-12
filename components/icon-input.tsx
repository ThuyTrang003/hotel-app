import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

interface IconProps {
  children: React.ReactNode;
}
function LeftIcon({ children }: IconProps) {
  return (
    <div className="item-center absolute left-3 top-1/2 z-10 flex -translate-y-1/2 transform justify-center">
      {children}
    </div>
  );
}

function RightIcon({ children }: IconProps) {
  return (
    <div className="item-center absolute right-3 top-1/2 flex -translate-y-1/2 transform justify-center">
      {children}
    </div>
  );
}
const inputVariants = cva(
  " flex text-black w-full rounded-md border border-input bg-background py-2  ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
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

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const IconInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, customSize, children, ...props }, ref) => {
    const leftIcon = React.Children.toArray(children).find(
      (child) => React.isValidElement(child) && child.type === LeftIcon
    );
    const rightIcon = React.Children.toArray(children).find(
      (child) => React.isValidElement(child) && child.type === RightIcon
    );
    return (
      <div className="relative">
        {leftIcon}
        <input
          type={type}
          className={cn(inputVariants({ className, customSize }))}
          ref={ref}
          {...props}
        />
        {rightIcon}
      </div>
    );
  }
);
IconInput.displayName = "IconInput";

export { IconInput, LeftIcon, RightIcon };
