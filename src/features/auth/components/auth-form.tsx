"use client";

import { useState } from "react";
import { cn } from "cn";
import { EyeIcon, EyeOffIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import type { LucideIcon } from "lucide-react";
import type { ComponentProps } from "react";

const FormWrapper = ({ className, ...props }: ComponentProps<"div">) => {
  return <div className={cn("flex flex-col gap-6", className)} {...props} />;
};

const FormHeader = ({ className, ...props }: ComponentProps<"div">) => {
  return (
    <header
      className={cn(
        "text-center text-2xl tracking-tight font-serif",
        className,
      )}
      {...props}
    />
  );
};

const FormContent = ({ className, ...rest }: ComponentProps<"form">) => {
  return <form className={cn("flex flex-col gap-2", className)} {...rest} />;
};

type FormInputProps = ComponentProps<"input"> & {
  label?: string;
  icon?: LucideIcon;
};

const FormInput = ({
  id,
  type,
  label,
  icon: Icon,
  value,
  onChange,
  className,
  ...rest
}: FormInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      {label && (
        <label htmlFor={id} className={cn("text-sm")}>
          {label}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <Icon
            size={16}
            className={cn("absolute top-1/2 -translate-y-1/2 left-2")}
          />
        )}

        <Input
          id={id}
          type={type === "password" && showPassword ? "text" : type}
          value={value}
          onChange={onChange}
          className={cn(
            type === "password" && "pr-8",
            Icon && "pl-8",
            className,
          )}
          {...rest}
        />

        {type === "password" && (
          <button
            type="button"
            aria-label={showPassword ? "Show Password" : "Hide Password"}
            onClick={() => setShowPassword((prev) => !prev)}
            className={cn("absolute top-1/2 -translate-y-1/2 right-2")}
          >
            {showPassword ? <EyeIcon size={16} /> : <EyeOffIcon size={16} />}
          </button>
        )}
      </div>
    </div>
  );
};

const FormError = ({ className, ...rest }: ComponentProps<"p">) => {
  return (
    <p
      className={cn("text-sm text-destructive self-center my-2", className)}
      {...rest}
    />
  );
};

export {
  FormWrapper,
  FormHeader,
  FormContent,
  FormInput,
  FormError,
  Button as FormButton,
};
