"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

import type { ReactNode } from "react";

const AuthLayoutComponent = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  return (
    <div className="min-h-screen w-screen flex flex-col">
      <header className="flex justify-between items-center h-16 px-4 w-full max-w-[1200px] self-center">
        <h1 className="font-mono tracking-tight text-lg">QuestionThings</h1>

        {pathname === "/login" ? (
          <Button
            variant="outline"
            size="sm"
            nativeButton={false}
            render={<Link href="/signup" />}
          >
            Sign Up
          </Button>
        ) : pathname === "/signup" ? (
          <Button
            variant="outline"
            size="sm"
            nativeButton={false}
            render={<Link href="/login" />}
          >
            Login
          </Button>
        ) : (
          ""
        )}
      </header>

      <div className="mt-22 self-center w-full max-w-[320px]">{children}</div>

      <p className="text-center self-center text-xs text-foreground/70 mt-4 max-w-[320px] w-full">
        By contuining, you agree to all of our{" "}
        <Link href="/terms" className="text-foreground">
          terms and conditions.
        </Link>
      </p>
    </div>
  );
};

export { AuthLayoutComponent };
