"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { status } = useSession();
  const { push } = useRouter();

  useEffect(() => {
    login();
  }, [status]);

  function login() {
    if (status === "loading") return;

    // eslint-disable-next-line no-unused-expressions
    status === "authenticated" ? push("chat") : signIn("keycloak");
  }

  return <></>;
}
