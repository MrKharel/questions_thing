"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  // Force next-themes to use application/json type on the client,
  // which tricks React into ignoring the executable script warning.
  const scriptProps = typeof window === "undefined" ? undefined : ({ type: "application/json" } as const);

  return (
    <NextThemesProvider {...props} scriptProps={scriptProps}>
      {children}
    </NextThemesProvider>
  );
}

export { ThemeProvider };
