"use client";

import { useState } from "react";

export const useMockApi = <T,>(fn: () => T, delay = 300) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<T | null>(null);
  const run = async () => {
    setLoading(true);
    await new Promise((res) => setTimeout(res, delay));
    const value = fn();
    setResult(value);
    setLoading(false);
    return value;
  };
  return { loading, result, run };
};
