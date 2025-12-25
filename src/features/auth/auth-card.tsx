"use client";

import { FormEvent } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  mode: "login" | "register";
};

export const AuthCard = ({ mode }: Props) => {
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert(`${mode === "login" ? "Logged in" : "Registered"} (mocked)`);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[color:var(--bg-gradient)] px-4">
      <Card className="w-full max-w-md bg-[color:var(--surface-primary)] p-6 shadow-2xl">
        <h1 className="text-2xl font-semibold text-[color:var(--ink-primary)]">
          {mode === "login" ? "Login" : "Create account"}
        </h1>
        <p className="text-sm text-[color:var(--ink-muted)]">
          Secure access to LexLink’s premium legal network.
        </p>
        <form className="mt-4 space-y-3" onSubmit={onSubmit}>
          <Input type="email" placeholder="Work email" required />
          <Input type="password" placeholder="Password" required />
          {mode === "register" && <Input placeholder="Full name" required />}
          <div className="text-xs text-[color:var(--ink-muted)]">
            By continuing you agree to the terms and privacy notice.
          </div>
          <Button className="w-full" size="lg" type="submit">
            {mode === "login" ? "Sign in" : "Create account"}
          </Button>
        </form>
      </Card>
    </div>
  );
};
