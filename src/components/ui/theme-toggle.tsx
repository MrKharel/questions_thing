"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "./button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="w-8 h-8" />;

  return (
    <Button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")} //
      variant="outline"
      className="p-2 rounded-md"
    >
      {theme === "dark" ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
}
