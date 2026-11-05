"use client";

import { useState } from "react";

import Link from "next/link";
import { Loader2Icon } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Field, FieldLabel, FieldDescription, FieldSet, FieldError } from "@/components/ui/field";
import { toast } from "@/components/ui/toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { signup } from "../_actions/signup";

function SignupForm() {
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setIsLoading(true);
      const signupSuccessful = await signup(formdata);
      if (signupSuccessful) {
        toast.add({ description: "Signup Successful. Check your email.", type: "success" });
      }
    } catch {
      toast.add({ description: "Unexpected Error Occurred. Please try again.", type: "error" });
    } finally {
      setIsLoading(false);
    }
  }

  function showToast() {
    const id = toast.add({
      title: "Event created",
      description: "Sunday, December 3 at 9:00 AM",
      actionProps: {
        children: "Undo",
        onClick() {
          toast.close(id);
        },
      },
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Signup Form</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldSet>
            <Field>
              <FieldLabel htmlFor="email">Email *</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="you@gmail.com"
                value={formdata.email}
                onChange={(e) => setFormdata((prev) => ({ ...prev, email: e.target.value }))}
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Password *</FieldLabel>
              <Input
                id="password"
                type="password"
                placeholder="very-strong-password"
                minLength={8}
                value={formdata.password}
                onChange={(e) => setFormdata((prev) => ({ ...prev, password: e.target.value }))}
                required
              />
              <FieldDescription>Password must be atleast 8 characters long</FieldDescription>
            </Field>

            <Button className="relative" disabled={isLoading} type="submit">
              {isLoading && <Loader2Icon className="animate-spin size-4 absolute top-1/2 -translate-y-1/2 right-2" />}
              Create Account{" "}
            </Button>
            <FieldLabel className="self-center">
              Don't have an account yet ?!
              <Link className="link" href="login">
                Login
              </Link>
            </FieldLabel>
          </FieldSet>
        </form>
      </CardContent>
    </Card>
  );
}

export { SignupForm };
