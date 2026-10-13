"use client";

import { useState } from "react";
import { cn } from "cn";
import { EyeIcon, EyeOffIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { LucideIcon } from "lucide-react";
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
  onFocus,
  onBlur,
  ...rest
}: FormInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocussed, setIsFocussed] = useState(false);

  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className={cn(
            "text-sm",
            "text-muted-foreground transition-colors ease-in-out",
            isFocussed && "text-foreground",
          )}
        >
          {label}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <Icon
            size={16}
            className={cn(
              "absolute top-1/2 -translate-y-1/2 left-2",
              "text-muted-foreground transition-colors ease-in-out",
              isFocussed && "text-foreground",
            )}
          />
        )}

        <Input
          id={id}
          type={type === "password" && showPassword ? "text" : type}
          value={value}
          onChange={onChange}
          className={cn(
            "text-muted-foreground transition-colors ease-in-out",
            isFocussed && "text-foreground",
            type === "password" && "pr-8",
            Icon && "pl-8",
            className,
          )}
          onFocus={() => setIsFocussed(true)}
          onBlur={() => setIsFocussed(false)}
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

const FormButton = ({ className, ...rest }: ComponentProps<typeof Button>) => {
  return (
    <Button
      type="submit"
      variant={"secondary"}
      className={cn("", className)}
      {...rest}
    />
  );
};

export { FormWrapper, FormHeader, FormContent, FormInput, FormButton };
