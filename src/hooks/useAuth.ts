import { signInWithGoogle } from "@/lib/firebase/auth";
import { useMutation } from "@tanstack/react-query";
import { ApiError } from "@/client/core/ApiError";
import { AxiosError } from "axios";
import { useState } from "react";

export const useAuth = () => {
    const [error, setError] = useState<string | null>(null);

    const loginWithGoogleMutation = useMutation({
        mutationFn: signInWithGoogle,
        onSuccess: () => {
          window.location.href = '/community';
        },
        onError: (err: ApiError) => {
          let errDetail = (err.body as { detail?: string | string[] })?.detail;
    
          if (err instanceof AxiosError || err instanceof Error) {
            errDetail = err.message;
          }
    
          if (Array.isArray(errDetail)) {
            errDetail = "Something went wrong";
          }
    
          setError(errDetail as string);
        },
      });

      return {
        loginWithGoogleMutation,
        error
      };
}