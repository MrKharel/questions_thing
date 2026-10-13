"use client";

import { useEffect } from "react";

import type { ReactNode } from "react";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    const root = document.documentElement;
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const isDark = stored === "dark" || (!stored && prefersDark);
    root.classList.toggle("dark", isDark);
  }, []);

  return <>{children}</>;
};
