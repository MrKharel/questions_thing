"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Suspense, type ReactNode } from "react";

export const AuthLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  console.log({ pathname });

  return (
    <>
      <header className="flex justify-between px-4 sm:px-8 h-14 items-center">
        <section></section>

        <section>
          {pathname === "/signup" ? (
            <Button
              variant="outline"
              nativeButton={false}
              render={<Link href="/login" />}
            >
              Login
            </Button>
          ) : pathname === "/login" ? (
            <Button
              variant="outline"
              nativeButton={false}
              render={<Link href="/signup" />}
            >
              Signup
            </Button>
          ) : (
            <></>
          )}
        </section>
      </header>

      <Form className="mt-20 w-fit" variant="auth">
        <Suspense fallback={<></>}>{children}</Suspense>
        <p className="text-sm font-light text-foreground/60">
          By continuing, you agree to our terms and conditions.
        </p>
      </Form>
    </>
  );
};
