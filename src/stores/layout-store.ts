"use client";

import { create } from "zustand";
import { ThemeMode } from "@/lib/types";

type LayoutState = {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
};

export const useLayoutStore = create<LayoutState>((set) => ({
  theme: "light",
  setTheme: (theme) => set({ theme }),
}));
