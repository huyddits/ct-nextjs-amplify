"use client";
import React, { JSX, InputHTMLAttributes, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { twMerge } from "tailwind-merge";
import { EyeIcon, EyeOffIcon } from "lucide-react";

interface AppInputProps extends React.HTMLAttributes<HTMLDivElement> {
  id?: string;
  label?: string;
  icon?: JSX.Element;
  required?: boolean;
  password?: boolean;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  errorMessage?: string;
}

export default function AppInput({
  id,
  icon,
  label,
  required,
  password,
  inputProps,
  errorMessage,
  ...containerProps
}: AppInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div
      {...containerProps}
      className={twMerge("space-y-2", containerProps.className)}
    >
      {label && (
        <Label htmlFor={id}>
          {label}
          {required && <span className="text-red-600">*</span>}
        </Label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <Input
          id={id}
          type={password ? (showPassword ? "text" : "password") : "text"}
          className="pl-10"
          {...inputProps}
        />
        {password && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <EyeOffIcon className="icon-input" />
            ) : (
              <EyeIcon className="icon-input" />
            )}
          </button>
        )}
      </div>
      {errorMessage && (
        <div className="-mt-2">
          <span className="error-message">{errorMessage}</span>
        </div>
      )}
    </div>
  );
}
