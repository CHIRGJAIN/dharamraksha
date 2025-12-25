"use client";

import { toast } from "sonner";

export const useToast = () => {
  return {
    toast,
    success: (message: string) => toast.success(message),
    info: (message: string) => toast(message),
    warn: (message: string) => toast.warning(message),
  };
};
