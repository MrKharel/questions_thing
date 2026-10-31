"use client";

import { useState } from "react";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Form,
  FormHeader,
  FormTitle,
  FormContent,
  FormFooter,
  FormInput,
  FormTextarea,
  FormInputsLabel,
} from "@/components/ui/form";

function CreateClass() {
  const [formdata, setFormdata] = useState({
    title: "",
    description: null as string | null,
  });

  return (
    <Form className="self-center mt-20">
      <FormHeader>
        <FormTitle>Create new class</FormTitle>
      </FormHeader>

      <FormContent>
        <div className="flex items-center gap-4 w-full">
          <div className="flex flex-col gap-1">
            <FormInputsLabel>Created By</FormInputsLabel>
            <div className="h-8 rounded border bg-input/50 px-1 flex items-center">
              <Avatar size="sm">
                <AvatarImage src={""}></AvatarImage>
              </Avatar>
            </div>
          </div>
          <FormInput label={<>Title *</>} className="w-full" />
        </div>

        <FormTextarea label={<>Description</>} />
      </FormContent>

      <FormFooter>
        <Button
          variant="outline"
          nativeButton={false}
          render={<Link href="/" />}
        >
          Back to Home
        </Button>
        <Button>Create a class</Button>
      </FormFooter>
    </Form>
  );
}

export { CreateClass };
