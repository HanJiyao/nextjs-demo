import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged as _onAuthStateChanged,
  onIdTokenChanged as _onIdTokenChanged,
  User,
  signInWithEmailAndPassword,
  AuthError,
  createUserWithEmailAndPassword,
  updateProfile,
  EmailAuthProvider,
  linkWithCredential,
} from "firebase/auth";

import { auth } from "@/lib/firebase/clientApp";

export function onAuthStateChanged(cb: (user: User | null) => void) {
  return _onAuthStateChanged(auth, cb);
}

export function onIdTokenChanged(cb: (user: User | null) => void) {
  return _onIdTokenChanged(auth, cb);
}

export async function login(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error signing in with email", error);
    throw error;
  }
}

export async function signUpWithEmail(displayName: string, email: string, password: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, {
      displayName: displayName
    });
    return userCredential.user;
  } catch (error) {
    if ((error as AuthError).code === 'auth/email-already-in-use') {
      const credential = EmailAuthProvider.credential(email, password);
      const currentUser = auth.currentUser;
      if (currentUser) {
        try {
          const result = await linkWithCredential(currentUser, credential);
          await updateProfile(result.user, {
            displayName: displayName
          });
          return result.user;
        } catch (linkError) {
          console.error("Error linking email/password to existing account", linkError);
          throw linkError;
        }
      } else {
        try {
          await signInWithGoogle();
          const newCurrentUser = auth.currentUser;
          if (newCurrentUser) {
            if (newCurrentUser.email?.toLowerCase() !== email.toLowerCase()) {
              await signOut();
              throw new Error("Google account email does not match sign-up email");
            }
            const result = await linkWithCredential(newCurrentUser, credential);
            await updateProfile(result.user, {
              displayName: displayName
            });
            return result.user;
          }
          throw new Error("Failed to sign in with Google");
        } catch (googleError) {
          console.error("Error during Google sign in", googleError);
          throw googleError;
        }
      }
    }
    console.error("Error signing up with email", error);
    throw error;
  }
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google", error);
    throw error;
  }
}

export async function signOut() {
  try {
    return auth.signOut();
  } catch (error) {
    console.error("Error signing out with Google", error);
  }
}