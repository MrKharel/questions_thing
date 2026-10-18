"use client";

import { useState } from "react";
import { cn } from "cn";
import { EyeIcon, EyeOffIcon } from "lucide-react";

import { Input } from "./input";
import { Textarea } from "./textarea";

import type { LucideIcon } from "lucide-react";
import type { ComponentProps } from "react";

export const Form = ({ className, ...rest }: ComponentProps<"div">) => {
  return (
    <section
      className={cn("flex flex-col gap-6 self-center w-screen sm:w-full max-w-screen sm:max-w-md", className)}
      {...rest}
    />
  );
};

export const FormHeader = ({ className, ...rest }: ComponentProps<"header">) => {
  return <header className={cn("text-center", className)} {...rest} />;
};

export const FormContent = ({ className, ...rest }: ComponentProps<"form">) => {
  return <form className={cn("flex flex-col gap-2", className)} {...rest} />;
};

type FormInputProps = ComponentProps<"input"> & {
  label?: string;
  icon?: LucideIcon;
};

export const FormInput = ({
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
    <div className="w-full *:w-full">
      {label && <FormInputLabel htmlFor={id}>{label}</FormInputLabel>}
      <div className="relative">
        {Icon && <Icon size={16} className={cn("absolute top-1/2 -translate-y-1/2 left-2")} />}
        <Input
          id={id}
          type={type === "password" && showPassword ? "text" : type}
          value={value}
          onChange={onChange}
          className={cn("w-full", type === "password" && "pr-8", Icon && "pl-8", className)}
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

type FormTextareaProps = ComponentProps<typeof Textarea> & {
  label?: string;
  icon?: LucideIcon;
  showWordCount?: boolean;
};

export const FormTextarea = ({
  label,
  showWordCount,
  icon: Icon,
  id,
  className,
  maxLength = 250,
  value,
  ...rest
}: FormTextareaProps) => {
  return (
    <div className="flex flex-col gap-1.5">
      {(label || showWordCount) && (
        <div className="flex justify-between">
          {label && <FormInputLabel htmlFor={id}>{label}</FormInputLabel>}
          {showWordCount && (
            <FormInputLabel htmlFor={id}>
              {String(value)!.length} / {maxLength}
            </FormInputLabel>
          )}
        </div>
      )}
      <div className="relative">
        {Icon && <Icon className="absolute top-1/2 -translate-y-1/2 left-2" size={16} />}
        <Textarea className={cn(Icon && "pl-8", className)} value={value} maxLength={maxLength} {...rest} />
      </div>
    </div>
  );
};

export const FormError = ({ className, ...rest }: ComponentProps<"p">) => {
  return <p className={cn("text-sm text-destructive/80 self-center my-2", className)} {...rest} />;
};

export const FormTitle = ({ className, ...rest }: ComponentProps<"h2">) => {
  return <h2 className={cn("font-serif tracking-tighter text-2xl self-center", className)} {...rest} />;
};

export const FormDescription = ({ className, ...rest }: ComponentProps<"p">) => {
  return <p className={cn("text-foreground/60 text-sm", className)} {...rest} />;
};

export const FormGroup = ({ className, ...rest }: ComponentProps<"div">) => {
  return <div className={cn("rounded-md px-3 py-3 border border-border", className)} {...rest} />;
};

export const FormLabel = ({ className, ...rest }: ComponentProps<"label">) => {
  return (
    <label className={cn("text-foreground/92 font-medium text-sm tracking-wide", className)} {...rest} />
  );
};

/* -------------------------- SHARED ------------------------------------ */
export const FormInputLabel = ({ className, ...rest }: ComponentProps<"label">) => {
  return <label className={cn("text-xs text-foreground/80 font-bold", className)} {...rest} />;
};
