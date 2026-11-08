euse client";

import { useState } from "react";
import { redirect } from "next/navigation";

import Link from "next/link";
import { Loader2Icon } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Field, FieldLabel, FieldDescription, FieldSet, FieldError } from "@/components/ui/field";
import { toast } from "@/components/ui/toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { loginWithEmail } from "../_actions/login";

function LoginForm() {
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    let loginSuccessful = false;

    try {
      setIsLoading(true);
      loginSuccessful = await loginWithEmail(formdata);
      if (loginSuccessful) {
        toast.add({ description: "Login Successful", type: "success" });
      }
    } catch (error) {
      toast.add({ description: typeof error === "string" ? error : "Login Failed Successfully", type: "error" });
    } finally {
      setIsLoading(false);
    }

    if (loginSuccessful) redirect("/onboarding");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Login to QuestionsThing</CardTitle>
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
              <FieldLabel className="justify-between" htmlFor="password">
                Password *
                <Link className="link" href="forgot-password">
                  Forgot Password ?!
                </Link>
              </FieldLabel>
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
              {isLoading && <Loader2Icon className="animate-spin size-4 absolute top-1/2 -translate-y-1/2 right-2" />}Continue to
              Login
            </Button>
            <FieldLabel className="self-center">
              Don't have an account yet ?!
              <Link className="link" href="signup">
                Signup
              </Link>
            </FieldLabel>
          </FieldSet>
        </form>
      </CardContent>
    </Card>
  );
}

export { LoginForm };
