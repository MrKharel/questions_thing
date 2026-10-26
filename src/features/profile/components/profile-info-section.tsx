"use client";

import Link from "next/link";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CalendarIcon, Loader2Icon, MailIcon, MapPinIcon, ShieldCheckIcon, UserIcon } from "lucide-react";
import { useProfileQueryByUsername, useProfileMutation } from "@/hooks/use-profile";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { FormInput, FormTextarea } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";

import type { Profile } from "@/actions/profile";
import type { SubmitEvent } from "react";

const DATE_FMT = new Intl.DateTimeFormat("en-US", {
	year: "numeric",
	month: "short",
	day: "numeric",
});

function formatDate(value: string | Date | null | undefined): string | null {
	if (!value) return null;
	const date = value instanceof Date ? value : new Date(value);
	return Number.isNaN(date.getTime()) ? null : DATE_FMT.format(date);
}

export function ProfileInfoSection({ username }: { username: string }) {
	const searchParams = useSearchParams().get("profile");
	const { data: profile, isLoading } = useProfileQueryByUsername(username);

	if (isLoading) return <>loading</>;
	if (!profile) return <>no user found. 404</>;

	return (
		<div className="w-full md:max-w-[300px]">
			<Avatar className="size-60 mb-2">
				<AvatarImage src={profile.avatar ?? "/default-avatar.jfif"} />
			</Avatar>

			{searchParams === "edit" ? <EditProfile profile={profile} /> : <ViewProfile profile={profile} />}
		</div>
	);
}

function ViewProfile({ profile }: { profile: Profile }) {
	const isDeleted = Boolean(profile.deletedAt);
	const joinedAt = formatDate(profile.createdAt);

	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col gap-1">
				<div>
					<h3 className="text-xl text-foreground">{profile.displayName ?? profile.username}</h3>
					<p className="text-foreground/70 text-lg">@{profile.username}</p>
				</div>

				{profile.preferredRole && (
					<Badge variant="secondary" className="self-start gap-1">
						<ShieldCheckIcon size={12} />
						{profile.preferredRole}
					</Badge>
				)}
			</div>

			{isDeleted && (
				<div className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive">
					This account has been deleted
					{profile.deletedAt ? ` on ${formatDate(profile.deletedAt)}` : ""}.
				</div>
			)}

			{profile.bio && (
				<div className="text-xs">
					<p className="text-foreground/80">{profile.bio}</p>
				</div>
			)}

			<div className="flex flex-col gap-2">
				{[
					{ icon: MapPinIcon, label: profile.location },
					{ icon: MailIcon, label: profile.email },
					{ icon: CalendarIcon, label: joinedAt ? `Joined ${joinedAt}` : null },
				].map(({ icon: Icon, label }, i) => {
					if (!label) return null;
					return (
						<div key={i} className="flex gap-2 items-center text-foreground/80 text-xs">
							<Icon size={16} />
							{label}
						</div>
					);
				})}
			</div>

			{!isDeleted && (
				<Button variant="outline" className="bg-muted" nativeButton={false} render={<Link href="?profile=edit" />}>
					Edit Profile
				</Button>
			)}
		</div>
	);
}

function EditProfile({ profile }: { profile: Profile }) {
	const profileMutation = useProfileMutation();
	const router = useRouter();

	const [formdata, setFormdata] = useState({
		displayName: profile.displayName ?? "",
		bio: profile.bio ?? "",
		location: profile.location ?? "",
	});
	const [error, setError] = useState<null | string>(null);

	const isDirty =
		formdata.displayName !== (profile.displayName ?? "") ||
		formdata.bio !== (profile.bio ?? "") ||
		formdata.location !== (profile.location ?? "");

	function handleSubmit(e: SubmitEvent<HTMLFormElement>): void {
		e.preventDefault();
		if (!isDirty) return;
		setError(null);
		profileMutation.mutate({
			displayName: formdata.displayName,
			bio: formdata.bio,
			location: formdata.location,
		});
		if (profileMutation.error) {
			setError(error);
		}
		profileMutation.isPending && router.push(`/u/${profile.username}`);
	}

	return (
		<div className="flex flex-col gap-4">
			{/* Readonly identity info (id / email / createdAt / updatedAt) */}
			<div className="flex flex-col gap-1 rounded-md border border-border bg-muted/40 p-3 text-xs text-foreground/70">
				<div className="flex items-center gap-2">
					<UserIcon size={14} />
					<span className="truncate">ID: {profile.id}</span>
				</div>
				<div className="flex items-center gap-2">
					<MailIcon size={14} />
					<span className="truncate">{profile.email}</span>
				</div>
				<div className="flex items-center gap-2">
					<CalendarIcon size={14} />
					<span>Joined {formatDate(profile.createdAt) ?? "—"}</span>
				</div>
				{profile.updatedAt && (
					<div className="flex items-center gap-2">
						<CalendarIcon size={14} />
						<span>Updated {formatDate(profile.updatedAt)}</span>
					</div>
				)}
			</div>

			<form onSubmit={handleSubmit} className="flex flex-col gap-4">
				<FormInput
					value={formdata.displayName}
					onChange={(e) => setFormdata((prev) => ({ ...prev, displayName: e.target.value }))}
					placeholder="Display Name"
					label={<>Name</>}
				/>

				<FormTextarea
					value={formdata.bio}
					onChange={(e) => setFormdata((prev) => ({ ...prev, bio: e.target.value }))}
					placeholder="I am having fun. Nothing more."
					label={<>Bio ({formdata.bio.length}/250)</>}
					maxLength={500}
				/>

				<FormInput
					value={formdata.location}
					onChange={(e) => setFormdata((prev) => ({ ...prev, location: e.target.value }))}
					icon={MapPinIcon}
					placeholder="The World"
					label="Location"
				/>

				{error && <p className="text-xs text-destructive">{error}</p>}

				<div className="flex flex-col gap-1">
					<Button type="submit" disabled={!isDirty || profileMutation.isPending} className="relative">
						{profileMutation.isPending && <Loader2Icon className="size-4 animate-spin absolute top-1/2 -translate-y-1/2 right-2" />}
						Save
					</Button>
					<Button variant="outline" className="bg-muted" nativeButton={false} render={<Link href={`/u/${profile.username}`} />}>
						Back
					</Button>
				</div>
			</form>
		</div>
	);
}
