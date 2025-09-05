import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  fullWidth?: boolean;
}

/**
 * 재사용 가능한 Input 컴포넌트
 * @example
 * <Input 
 *   type="text" 
 *   placeholder="Enter text" 
 *   value={value}
 *   onChange={(e) => setValue(e.target.value)} 
 * />
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, fullWidth = true, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "px-3 py-2 rounded-lg transition-colors",
          "bg-white dark:bg-gray-800",
          "border",
          error 
            ? "border-red-300 dark:border-red-700 focus:border-red-500"
            : "border-gray-300 dark:border-gray-700 focus:border-blue-500/50",
          "text-gray-900 dark:text-gray-200",
          "focus:ring-2",
          error 
            ? "focus:ring-red-500/20"
            : "focus:ring-blue-500/20",
          "focus:outline-none",
          fullWidth && "w-full",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;