"use client";

import { ReactNode } from "react";
import { useLayoutStore } from "@/stores/layout-store";
import { ThemeMode } from "@/lib/types";

type Props = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: Props) => {
  return <>{children}</>;
};

export const useThemeMode = () => {
  const theme = useLayoutStore((s) => s.theme);
  const setTheme = useLayoutStore((s) => s.setTheme);
  const toggleTheme = () =>
    setTheme(theme === "light" ? ("dark" as ThemeMode) : "light");
  return { theme, setTheme, toggleTheme };
};
