"use client";
import { createContext, useContext, useState } from "react";
import { cn } from "cn";
import { cva } from "class-variance-authority";

import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Input } from "./input";
import { Textarea } from "./textarea";

import type { ComponentProps, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import type { VariantProps } from "class-variance-authority";

const formVariants = cva("flex flex-col gap-6", {
  variants: {
    variant: {
      default: "w-full max-w-md",
      auth: "w-screen max-w-xs self-center items-center",
    },
  },
  defaultVariants: { variant: "default" },
});

type FormVariant = NonNullable<VariantProps<typeof formVariants>["variant"]>;

const FormVariantContext = createContext<FormVariant>("default");

function useFormVariant() {
  return useContext(FormVariantContext);
}

function Form({
  className,
  variant = "default",
  ...rest
}: ComponentProps<"div"> & VariantProps<typeof formVariants>) {
  const resolvedVariant: FormVariant = variant ?? "default";

  return (
    <FormVariantContext.Provider value={resolvedVariant}>
      <div
        className={cn(formVariants({ variant: resolvedVariant, className }))}
        {...rest}
      />
    </FormVariantContext.Provider>
  );
}

function FormHeader({ className, ...rest }: ComponentProps<"header">) {
  const variant = useFormVariant();

  return (
    <header
      className={cn(
        "flex flex-col gap-1.5",
        variant === "auth" &&
          "items-center self-center *:text-center [&>h2]:text-2xl",
        variant === "default" &&
          "items-start self-start *:text-left [&>h2]:text-xl",
        className,
      )}
      {...rest}
    />
  );
}

function FormContent({ className, ...rest }: ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-3 w-full", className)} {...rest} />
  );
}

function FormFooter({ className, ...rest }: ComponentProps<"footer">) {
  const variant = useFormVariant();

  return (
    <footer
      className={cn(
        "flex w-full gap-2",
        variant === "auth" && "flex-col items-center text-center",
        variant === "default" && "items-center justify-end",
        className,
      )}
      {...rest}
    />
  );
}

function FormInput({
  label,
  icon: Icon,
  type,
  className,
  ...rest
}: ComponentProps<typeof Input> & { label?: ReactNode; icon?: LucideIcon }) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocussed, setIsFocussed] = useState(false);

  return (
    <div className="flex flex-col gap-1 w-full flex-1">
      {label && (
        <FormInputsLabel className="flex justify-between">
          {label}
        </FormInputsLabel>
      )}

      <div className="relative w-full *w-full">
        {Icon && (
          <Icon
            size={16}
            className={cn(
              "absolute top-1/2 left-2 -translate-y-1/2 text-foreground/75",
              isFocussed && "text-foreground",
            )}
          />
        )}

        <Input
          type={type === "password" && showPassword === true ? "text" : type}
          className={cn(
            Icon && "pl-6",
            type === "password" && "pr-6",
            className,
          )}
          onMouseEnter={() => setIsFocussed(true)}
          onMouseLeave={() => setIsFocussed(false)}
          onFocus={() => setIsFocussed(true)}
          onBlur={() => setIsFocussed(false)}
          {...rest}
        />

        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className={cn(
              "absolute top-1/2 right-2 -translate-y-1/2 text-foreground/75",
              isFocussed && "text-foreground",
            )}
          >
            {showPassword ? <EyeIcon size={16} /> : <EyeOffIcon size={16} />}
          </button>
        )}
      </div>
    </div>
  );
}

function FormTextarea({
  label,
  className,
  ...rest
}: ComponentProps<typeof Textarea> & { label?: ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <FormInputsLabel className="flex justify-between">
          {label}
        </FormInputsLabel>
      )}

      <div>
        <Textarea className={cn("", className)} {...rest} />
      </div>
    </div>
  );
}

function FormTitle({ className, ...rest }: ComponentProps<"h2">) {
  return (
    <h2 className={cn("font-medium text-foreground", className)} {...rest} />
  );
}

function FormDescription({ className, ...rest }: ComponentProps<"p">) {
  return <p className={cn("text-muted-foreground", className)} {...rest} />;
}

function FormInputsLabel({ className, ...rest }: ComponentProps<"label">) {
  return (
    <label
      className={cn("text-sm text-foreground/89 tracking-wide", className)}
      {...rest}
    />
  );
}

export {
  formVariants,
  useFormVariant,
  Form,
  FormHeader,
  FormContent,
  FormFooter,
  FormInput,
  FormTextarea,
  FormTitle,
  FormDescription,
  FormInputsLabel,
};
