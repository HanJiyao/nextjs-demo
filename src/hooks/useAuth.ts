import { login, signInWithGoogle, signUpWithEmail } from "@/lib/firebase/auth";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

type loginInput = {
  email: string;
  password: string;
};

type registerInput = {
  username: string;
  email: string;
  password: string;
};

export const useAuth = () => {
  const [error, setError] = useState<string | null>(null);

  const signUpMutation = useMutation({
    mutationFn: (input: registerInput) =>
      signUpWithEmail(input.username, input.email, input.password),
    onSuccess: () => {
      window.location.href = "/community";
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  const loginMutation = useMutation({
    mutationFn: (input: loginInput) => login(input.email, input.password),
    onSuccess: () => {
      window.location.href = "/community";
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  const loginWithGoogleMutation = useMutation({
    mutationFn: signInWithGoogle,
    onSuccess: () => {
      window.location.href = "/community";
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  return {
    loginWithGoogleMutation,
    signUpMutation,
    loginMutation,
    error,
  };
};
