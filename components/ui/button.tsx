import React from "react";
import { cn } from "@/utils/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: `
    bg-blue-50 hover:bg-blue-100
    dark:bg-blue-500/20 dark:hover:bg-blue-500/30
    text-blue-600 dark:text-blue-400
    border border-blue-200 dark:border-blue-500/20
  `,
  secondary: `
    bg-gray-50 hover:bg-gray-100
    dark:bg-gray-700/50 dark:hover:bg-gray-700
    text-gray-700 dark:text-gray-300
    border border-gray-300 dark:border-gray-600
  `,
  ghost: `
    bg-transparent hover:bg-gray-100
    dark:hover:bg-gray-700/30
    text-gray-700 dark:text-gray-300
    border border-transparent
  `,
  danger: `
    bg-red-50 hover:bg-red-100
    dark:bg-red-500/20 dark:hover:bg-red-500/30
    text-red-600 dark:text-red-400
    border border-red-200 dark:border-red-500/20
  `,
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2",
  lg: "px-6 py-3 text-lg",
};

/**
 * 재사용 가능한 Button 컴포넌트
 * @example
 * <Button variant="primary" size="md" onClick={handleClick}>
 *   Click me
 * </Button>
 */
export default function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  isLoading = false,
  className = "",
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20",
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && "w-full",
        (disabled || isLoading) && "opacity-50 cursor-not-allowed",
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <svg
            className="animate-spin h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
}