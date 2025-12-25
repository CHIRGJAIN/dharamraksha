"use client";

import { ReactNode, useEffect } from "react";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/hooks/use-theme";
import { useLayoutStore } from "@/stores/layout-store";

type Props = {
  children: ReactNode;
};

export const AppProviders = ({ children }: Props) => {
  const theme = useLayoutStore((s) => s.theme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <ThemeProvider>
      {children}
      <Toaster
        richColors
        position="top-center"
        toastOptions={{
          style: {
            borderRadius: 16,
            border: "1px solid var(--border-subtle)",
            background: "var(--surface-primary)",
            color: "var(--ink-primary)",
          },
        }}
      />
    </ThemeProvider>
  );
};
