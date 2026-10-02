"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn } from "cn";

type ChildrenProps = { children: React.ReactNode };

const FormWrapper = ({ children }: ChildrenProps) => (
	<section className="self-center w-fit max-w-sm pt-30 sm:pt-40 lg:pt-45 flex flex-col items-center gap-8">
		{children}
		<p className="text-xs text-foreground/70 [&>a]:text-foreground/92">
			You must agree with <Link href="terms">terms & conditions</Link> to
			continue
		</p>
	</section>
);

const FormHeader = ({ children }: ChildrenProps) => (
	<header className="flex items-center justify-between w-screen max-w-screen fixed top-0 left-0 px-4 md:px-12 py-3">
		{children}
	</header>
);

const FormTitle = ({ children }: ChildrenProps) => (
	<h2 className="w-fit font-heading text-2xl tracking-tight text-foreground text-center">
		{children}
	</h2>
);

type FormContentProps = React.ComponentProps<"form">;

const FormContent = ({ className, children, ...rest }: FormContentProps) => (
	<form className={cn("flex w-full flex-col gap-4", className)} {...rest}>
		{children}
	</form>
);

const FormFooter = ({
	className,
	children,
	...rest
}: React.ComponentProps<"div">) => (
	<div className={cn("flex flex-col gap-3 pt-2", className)} {...rest}>
		{children}
	</div>
);

const FormError = ({ children }: ChildrenProps) => (
	<p
		role="alert"
		className="text-xs text-foreground/70 [&>a]:text-foreground [&>a]:underline"
	>
		{children}
	</p>
);

type FormInputProps = Omit<
	React.ComponentProps<typeof Input>,
	"value" | "onChange" | "type"
> & {
	type: "email" | "password" | "text";
	value: string;
	handleChange: React.Dispatch<React.SetStateAction<string>>;
	label?: string;
	icon?: LucideIcon;
};

const FormInput = ({
	type,
	value,
	handleChange,
	label,
	icon: Icon,
	className,
	id,
	...rest
}: FormInputProps) => {
	const [showPassword, setShowPassword] = useState(false);
	const generatedId = useId();
	const inputId = id ?? generatedId;
	const isPassword = type === "password";

	return (
		<div className="flex flex-col gap-1">
			{label && (
				<label htmlFor={inputId} className="text-sm text-foreground/75">
					{label}
				</label>
			)}

			<div className="relative">
				{Icon && (
					<Icon
						size={16}
						aria-hidden="true"
						className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2"
					/>
				)}

				<Input
					{...rest}
					id={inputId}
					type={isPassword && showPassword ? "text" : type}
					value={value}
					onChange={(e) => handleChange(e.target.value)}
					className={cn(Icon && "pl-8", isPassword && "pr-8", className)}
				/>

				{isPassword && (
					<button
						type="button"
						onClick={() => setShowPassword((prev) => !prev)}
						aria-label={showPassword ? "Hide password" : "Show password"}
						aria-pressed={showPassword}
						className="absolute right-2 top-1/2 -translate-y-1/2 text-foreground/60 hover:text-foreground"
					>
						{showPassword ? <EyeIcon size={16} /> : <EyeOffIcon size={16} />}
					</button>
				)}
			</div>
		</div>
	);
};

export {
	FormWrapper,
	FormHeader,
	FormContent,
	FormFooter,
	FormTitle,
	FormError,
	FormInput,
};
