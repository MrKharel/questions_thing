"use client";

import { useState } from "react";
import { useProfileQuery } from "@/hooks/use-profile";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Form, FormContent, FormFooter, FormHeader, FormInput, FormInputsLabel, FormTextarea, FormTitle } from "@/components/ui/form";

export function CreateNewClass() {
	const { data: profile } = useProfileQuery();

	const [formdata, setFormdata] = useState({
		title: "",
		description: undefined as string | undefined,
	});

	function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
		e.preventDefault();
	}

	return (
		<Form className="mt-20 max-w-md">
			<FormHeader>
				<FormTitle>Create new Class</FormTitle>
			</FormHeader>

			<FormContent onSubmit={handleSubmit}>
				<div className="flex items-center gap-4">
					<div className="flex flex-col">
						<FormInputsLabel>Teacher *</FormInputsLabel>
						<div className="flex gap-1 items-center p-1 px-2 rounded bg-input/50">
							<Avatar size="sm">
								<AvatarImage src={profile!.avatar ?? "/default-avatar.jfif"} />
							</Avatar>
							<p className="text-sm font-bold">{profile!.username}</p>
						</div>
					</div>

					<div className="flex-1">
						<FormInput
							label="Name *"
							placeholder="Mathematics 101"
							value={formdata.title}
							onChange={(e) => setFormdata((prev) => ({ ...prev, title: e.target.value }))}
							required
						/>
					</div>
				</div>

				<FormTextarea
					label="Description"
					placeholder="Mathematics 101"
					maxLength={500}
					value={formdata.description ?? ""}
					onChange={(e) => setFormdata((prev) => ({ ...prev, description: e.target.value }))}
				/>

				<FormFooter>
					<Button type="submit">New Class</Button>
				</FormFooter>
			</FormContent>
		</Form>
	);
}
