import React from "react";
import { cn } from "@/utils/cn";

interface FormFieldProps {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
  labelClassName?: string;
  children: React.ReactNode;
  showCharCount?: boolean;
  currentLength?: number;
  maxLength?: number;
}

/**
 * Form 필드를 위한 Wrapper 컴포넌트
 * Label, Input/TextArea, Error/Hint 메시지를 통합 관리
 * @example
 * <FormField 
 *   label="Email" 
 *   error={emailError}
 *   required
 * >
 *   <Input type="email" value={email} onChange={handleChange} />
 * </FormField>
 */
export default function FormField({
  label,
  error,
  hint,
  required,
  className,
  labelClassName,
  children,
  showCharCount,
  currentLength,
  maxLength,
}: FormFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <div className="flex justify-between items-center">
          <label 
            className={cn(
              "block text-sm font-medium",
              "text-gray-700 dark:text-gray-300",
              labelClassName
            )}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
          {showCharCount && maxLength && (
            <span className="text-xs text-gray-400">
              {currentLength || 0}/{maxLength}
            </span>
          )}
        </div>
      )}
      
      {children}
      
      {error && (
        <p className="text-xs text-red-500 mt-1">{error}</p>
      )}
      
      {hint && !error && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{hint}</p>
      )}
    </div>
  );
}