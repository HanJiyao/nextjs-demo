"use client";
import { useEffect } from "react";
import { onIdTokenChanged } from "@/lib/firebase/auth";
import { setCookie, deleteCookie } from "cookies-next";
import { User } from "firebase/auth";

export function useUserSession(initialUser: User | null) {
  useEffect(() => {
    return onIdTokenChanged(async (user) => {
      if (user) {
        const idToken = await user.getIdToken();
        await setCookie("__session", idToken);
      } else {
        await deleteCookie("__session");
      }
      if (initialUser?.uid === user?.uid) {
        return;
      }
      window.location.reload();
    });
  }, [initialUser]);

  return initialUser;
}