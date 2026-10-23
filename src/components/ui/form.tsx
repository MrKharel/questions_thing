"use client";
import { useState } from "react";
import { cn } from "cn";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Input } from "./input";
import { Textarea } from "./textarea";
import type { ComponentProps, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

export const Form = ({ className, ...rest }: ComponentProps<"div">) => (
	<div
		className={cn("w-screen max-w-xs self-center flex flex-col gap-6 items-center justify-center", className)}
		{...rest}
	/>
);

export const FormHeader = ({ className, ...rest }: ComponentProps<"div">) => (
	<header className={cn("flex flex-col items-center gap-1.5 self-center *:text-center", className)} {...rest} />
);

export const FormContent = ({ className, ...rest }: ComponentProps<"form">) => (
	<form className={cn("flex flex-col gap-3 w-full", className)} {...rest} />
);

export const FormInput = ({
	label,
	icon: Icon,
	type,
	className,
	...rest
}: ComponentProps<typeof Input> & { label?: ReactNode; icon?: LucideIcon }) => {
	const [showPassword, setShowPassword] = useState(false);
	const [isFocussed, setIsFocussed] = useState(false);

	return (
		<div className="flex flex-col gap-1">
			{label && <FormInputsLabel className="flex justify-between">{label}</FormInputsLabel>}

			<div className="relative">
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
					className={cn(Icon && "pl-6", type === "password" && "pr-6", className)}
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
						)}>
						{showPassword ? <EyeIcon size={16} /> : <EyeOffIcon size={16} />}
					</button>
				)}
			</div>
		</div>
	);
};

export const FormTextarea = ({
	label,
	className,
	...rest
}: ComponentProps<typeof Textarea> & { label?: ReactNode }) => {
	return (
		<div className="flex flex-col gap-1">
			{label && <FormInputsLabel className="flex justify-between">{label}</FormInputsLabel>}

			<div>
				<Textarea className={cn("", className)} {...rest} />
			</div>
		</div>
	);
};

export const FormTitle = ({ className, ...rest }: ComponentProps<"h2">) => (
	<h2 className={cn("text-2xl font-bold text-foreground tracking-tight", className)} {...rest} />
);

export const FormDescription = ({ className, ...rest }: ComponentProps<"p">) => (
	<p className={cn("text-muted-foreground", className)} {...rest} />
);

export const FormInputsLabel = ({ className, ...rest }: ComponentProps<"label">) => (
	<label className={cn("text-sm text-bold text-foreground/89 tracking-wide", className)} {...rest} />
);
