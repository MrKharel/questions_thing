"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "@/features/auth/auth-actions";

const ClassesPage = () => {
  return (
    <Button
      onClick={async (e: any) => {
        e.preventDefault();
        await signOut();
      }}
      className={"w-fit"}
    >
      SignOut
    </Button>
  );
};

export default ClassesPage;
