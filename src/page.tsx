"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormContent,
  FormHeader,
  FormTitle,
  FormInput,
} from "./components/ui/form";

const Login = () => {
  const [formdata, setFormdata] = useState({ email: "", password: "" });
  const [formstate, setFormstate] = useState({
    isLoading: false,
    error: null as null | string,
  });

  return (
    <Form className="max-w-sm self-center bg-transparent border-0">
      <FormHeader>
        <FormTitle>Log into vercel</FormTitle>
      </FormHeader>

      <FormContent>
        <FormInput
          type="email"
          placeholder="you@emample.com"
          label="Email"
          autoComplete="email"
          value={formdata.email}
          onChange={(e) =>
            setFormdata((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        <FormInput
          type="password"
          placeholder="*******"
          label="Password"
          value={formdata.password}
          onChange={(e) =>
            setFormdata((prev) => ({ ...prev, password: e.target.value }))
          }
        />

        <Button>Sign Up</Button>
      </FormContent>
    </Form>
  );
};

export default Login;
