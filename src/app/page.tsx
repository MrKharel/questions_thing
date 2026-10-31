"use client";
import { Button } from "@/components/ui/button";
import { signout } from "@/modules/auth";

const Landing_Page = () => {
  return (
    <Button onClick={signout} className={"w-fit"}>
      Signout, okay?
    </Button>
  );
};

export default Landing_Page;
