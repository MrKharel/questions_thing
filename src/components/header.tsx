"use client";

import Link from "next/link";
import { InboxIcon } from "lucide-react";
import { cn } from "cn";

import { useProfileQuery } from "@/hooks/use-profile";

import { Button } from "./ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "./ui/input";

import type { ComponentProps } from "react";

type HeaderProps = ComponentProps<"div"> & {};

const Header = ({ className, ...rest }: HeaderProps) => {
	return (
		<header className={cn("flex justify-between items-center h-10 px-2 sm:px-4 bg-sidebar", className)} {...rest}>
			<div>
				<Breadcrumbs />
			</div>

			<div className="flex items-center gap-2 [&>a]:px-2 [&>button]:px-2 [&>a]:size-8">
				<Input className={"h-8 bg-muted/70 border border-border"} placeholder="Ctrl + K :: Search" />
				<Button variant="outline" nativeButton={false} render={<Link href="/inbox" />}>
					<InboxIcon size={16} />
				</Button>
				<Profile />
			</div>
		</header>
	);
};

const Profile = () => {
	const { data: profile } = useProfileQuery();

	return (
		<div>
			<Avatar className="size-9 bg-transparent">
				<AvatarImage src={profile?.avatar ?? "/default-image.jfif"}></AvatarImage>
				<AvatarFallback>{profile?.username.slice(0, 2)}</AvatarFallback>
			</Avatar>
		</div>
	);
};

const Breadcrumbs = () => {
	return <div></div>;
};

export { Header };
