"use client";

const script = `try {var t = localStorage.getItem("theme");var dark = t === "dark" || (t !== "light" && window.matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark", dark);} catch (e) {}`;

export function ThemeScript() {
  return (
    <script
      suppressHydrationWarning
      type={typeof window === "undefined" ? undefined : "application/json"}
      dangerouslySetInnerHTML={{ __html: script }}
    />
  );
}
