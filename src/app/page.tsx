"use client";

import { Button } from "@/components/ui/button";

import { signout } from "@/features/auth/";

export default function HomePage() {
  return (
    <Button onClick={signout} className="w-fit">
      Signout
    </Button>
  );
}
