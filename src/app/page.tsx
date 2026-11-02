"use client";

import { Button } from "@/components/ui/button";

import { signout } from "@/modules/authentication/_actions/signout";

export default function HomePage() {
  return (
    <Button onClick={signout} className="w-fit">
      Signout
    </Button>
  );
}
