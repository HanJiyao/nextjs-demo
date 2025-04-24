"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, googleProvider } from "../lib/firebase";
import {
  getRedirectResult,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
  linkWithCredential,
  EmailAuthProvider,
  signInWithPopup,
  AuthError,
} from "firebase/auth";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Handle redirect result after Google sign-in (for redirect flows)
  useEffect(() => {
    console.log("Checking redirect result");
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          console.log("Redirect sign-in successful:", {
            uid: result.user.uid,
            displayName: result.user.displayName,
          });
          setUser(result.user);
        } else {
          console.log("No redirect result available");
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error("Unknown error:", error);
        }
      } finally {
        console.log("Redirect result processing complete, loading:", false);
        setLoading(false);
      }
    };

    handleRedirectResult();
  }, []);

  // Monitor authentication state
  useEffect(() => {
    console.log("Setting up onAuthStateChanged listener");
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        console.log(
          "Auth state changed:",
          user ? { uid: user.uid, displayName: user.displayName } : "No user"
        );
        setUser(user);
        setLoading(false);
      },
      (error) => {
        console.error("onAuthStateChanged error:", error);
        setLoading(false);
      }
    );
    return () => {
      console.log("Cleaning up onAuthStateChanged listener");
      unsubscribe();
    };
  }, []);

  const signInWithGoogle = async () => {
    try {
      console.log("Initiating Google popup sign-in");
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Google sign-in successful:", {
        uid: result.user.uid,
        displayName: result.user.displayName,
      });
      setUser(result.user);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("Unknown error:", error);
      }
      throw error;
    }
  };

  const signUpWithEmail = async (email: string, password: string) => {
    try {
      // Validate inputs
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error("Invalid email format");
      }
      if (!password || password.length < 6) {
        throw new Error("Password must be at least 6 characters");
      }
      console.log(
        "Initiating email registration:",
        email,
        "Password length:",
        password.length
      );
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Email registration successful:", userCredential.user.uid);
      setUser(userCredential.user);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Sign-up error:", {
          code: (error as AuthError).code,
          message: error.message,
          details: error,
        });
        if ((error as AuthError).code === "auth/email-already-in-use") {
          console.log("Email already in use, checking sign-in methods");
          try {
            console.log("Email linked to Google, initiating Google sign-in");
            const credential = EmailAuthProvider.credential(email, password);
            const result = await signInWithPopup(auth, googleProvider);
            if (result.user) {
              console.log("Linking email credential to Google account");
              await linkWithCredential(result.user, credential);
              console.log("Email credential linked successfully");
              setUser(result.user);
            } else {
              throw new Error("Google sign-in failed, no user returned.");
            }
          } catch (linkError: unknown) {
            console.error("Error linking account:", linkError);
            throw linkError;
          }
        } else {
          throw error;
        }
      }
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      console.log("Initiating email sign-in:", email);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Email sign-in successful:", userCredential.user.uid);
      setUser(userCredential.user);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("Unknown error:", error);
      }
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      console.log("Signed out successfully");
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signInWithGoogle,
        signUpWithEmail,
        signInWithEmail,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
