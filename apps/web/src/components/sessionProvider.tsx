"use client";

import { SessionProvider as Provider } from "next-auth/react";

export function SessionProvider({ children }: any) {
  return <Provider>{children}</Provider>;
}
