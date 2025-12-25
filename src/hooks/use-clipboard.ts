"use client";

import { useState } from "react";
import { copyToClipboard } from "@/lib/utils";

export const useClipboard = () => {
  const [copied, setCopied] = useState(false);
  const copy = async (text: string) => {
    await copyToClipboard(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };
  return { copied, copy };
};
