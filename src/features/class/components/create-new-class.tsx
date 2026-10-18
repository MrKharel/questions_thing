"use client";

import { BookIcon } from "lucide-react";
import { useState } from "react";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Form,
  FormContent,
  FormTitle,
  FormInput,
  FormTextarea,
  FormDescription,
  FormInputLabel,
  FormGroup,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import { useProfileQuery } from "@/hooks/use-profile";

type Visibility = "private" | "public";
type MaxMembers = 15 | 30 | 50;

const visibilityItems: { value: Visibility; label: string }[] = [
  { value: "private", label: "Private" },
  { value: "public", label: "Public" },
];
const maxMembersItems: { value: MaxMembers; label: string }[] = [
  { value: 15, label: "15 members" },
  { value: 30, label: "30 members" },
  { value: 50, label: "50 members" },
];
const yesNoItems: { value: boolean; label: string }[] = [
  { value: true, label: "Yes" },
  { value: false, label: "No" },
];

type Formdata = {
  subject: string;
  description: string;
};
type Config = {
  visibility: Visibility;
  members_can_see_each_other: boolean;
  max_members: MaxMembers;
  students_can_comment: boolean;
};

const CreateNewClass = () => {
  const profileQuery = useProfileQuery();

  const [formdata, setFormata] = useState<Formdata>({ subject: "", description: "" });
  const [config, setConfig] = useState<Config>({
    visibility: "private",
    members_can_see_each_other: true,
    max_members: 15,
    students_can_comment: true,
  });

  return (
    <Form className="my-16 px-4 md:px-0 max-w-lg">
      <FormContent className="gap-4">
        <FormTitle className="self-start">Create New Class</FormTitle>

        <div className="flex gap-4 items-center">
          <div className="flex flex-col gap-1">
            <FormInputLabel>Owner *</FormInputLabel>
            <div className="flex gap-2 items-center px-2 py-0.5 border border-border rounded-md h-9">
              <Avatar size={"sm"}>
                <AvatarImage src={profileQuery.data?.avatar ?? ""} className={"bg-background"}></AvatarImage>
                <AvatarFallback className={"bg-background"}>
                  {profileQuery.data?.username.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <p className="text-foreground/80 font-medium">{profileQuery.data?.username}</p>
            </div>
          </div>
          <FormInput
            icon={BookIcon}
            label="Subject *"
            placeholder={"Mathematics 101"}
            value={formdata.subject}
            onChange={(e) => setFormata((prev) => ({ ...prev, subject: e.target.value }))}
          />
        </div>

        <FormTextarea
          label="Description *"
          placeholder="This class teaches the mathematics and has 101 courses inside it."
          value={formdata.description}
          onChange={(e) => setFormata((prev) => ({ ...prev, description: e.target.value }))}
          showWordCount
        />

        {/* The form groups, or the configurations of the class */}
        <FormTitle className="self-start mt-6">Configurations</FormTitle>

        <FormGroup className="flex flex-row justify-between items-center">
          <div>
            <FormLabel>Visibility *</FormLabel>
            <FormDescription>
              {config.visibility === "private"
                ? "Only the invited ones and class memebers can view the class details"
                : "All users can see the class, and request to join"}
            </FormDescription>
          </div>
          <Select
            items={visibilityItems}
            value={config.visibility}
            onValueChange={(e) => setConfig((prev) => ({ ...prev, visibility: e ?? "private" }))}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {visibilityItems.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </FormGroup>

        <FormGroup>
          <div className="flex justify-between items-center gap-2">
            <div>
              <FormLabel>Max Members *</FormLabel>
              <FormDescription>Total members allowed in the car including you</FormDescription>
            </div>
            <Select
              items={maxMembersItems}
              value={config.max_members}
              onValueChange={(e) => setConfig((prev) => ({ ...prev, max_members: e ?? 15 }))}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {maxMembersItems.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-between items-center gap-2 border-t border-border mt-2 pt-2">
            <div>
              <FormLabel>Members can see each other</FormLabel>
              <FormDescription>
                Members {config.members_can_see_each_other ? "can" : "cannot"} all the members who are in part
                of the class.
              </FormDescription>
            </div>
            <Select
              items={yesNoItems}
              value={config.members_can_see_each_other}
              onValueChange={(e) => setConfig((prev) => ({ ...prev, members_can_see_each_other: e ?? true }))}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {yesNoItems.map((item) => (
                    <SelectItem key={String(item.value)} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-between items-center gap-2 border-t border-border mt-2 pt-2">
            <div>
              <FormLabel>Students can comment</FormLabel>
              <FormDescription>
                Students {config.students_can_comment ? "can" : "cannot"} comment on assignments
              </FormDescription>
            </div>
            <Select
              items={yesNoItems}
              value={config.students_can_comment}
              onValueChange={(e) => setConfig((prev) => ({ ...prev, students_can_comment: e ?? true }))}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {yesNoItems.map((item) => (
                    <SelectItem key={String(item.value)} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </FormGroup>

        <Button className={"w-full md:w-fit self-center md:self-end"}>Create new class</Button>
      </FormContent>
    </Form>
  );
};

export { CreateNewClass };
