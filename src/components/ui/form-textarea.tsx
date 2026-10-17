"use client";

import { cn } from "cn";

import { Textarea } from "./textarea";

import type { ComponentProps } from "react";
import type { LucideIcon } from "lucide-react";

type FormTextareaProps = ComponentProps<typeof Textarea> & {
  label?: string;
  icon?: LucideIcon;
};

export const FormTextarea = ({
  label,
  icon: Icon,
  className,
  ...rest
}: FormTextareaProps) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs text-foreground/80">{label}</label>

      <div className="relative">
        {Icon && (
          <Icon
            className="absolute top-1/2 -translate-y-1/2 left-2"
            size={16}
          />
        )}

        <Textarea className={cn(Icon && "pl-8", className)} {...rest} />
      </div>
    </div>
  );
};
