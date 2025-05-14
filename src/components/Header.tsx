"use client";
import Link from "next/link";
import Image from "next/image";
import {
  signInWithGoogle,
  signOut,
} from "@/lib/firebase/auth";
import { User } from "firebase/auth";
import { useUserSession } from "@/hooks/useUserSession";

export default function Header({ initialUser }: { initialUser: User | null }) {
  const user = useUserSession(initialUser);
  const handleSignOut = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    signOut();
  };

  const handleSignIn = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    signInWithGoogle();
  };

  return (
    <header>
      <Link href="/" className="logo">
        MIKO TEST
      </Link>
      {user ? (
        <>
          <div className="flex items-center gap-4">
            <Image
              className="profileImage"
              src={user.photoURL || "/profile.svg"}
              alt={user.email || "User profile"}
              width={32}
              height={32}
            />
            <span>{user.displayName}</span>
            <button
              onClick={handleSignOut}
              className="ml-2 p-1 hover:bg-gray-100 rounded-full"
              title="Logout"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </button>
          </div>
        </>
      ) : (
          <a href="#" onClick={handleSignIn}>
            <div className="flex items-center gap-4">
              <Image
                src="/profile.svg"
                alt="A placeholder user image"
                width={32}
                height={32}
            />
            <span>Sign In with Google</span>
          </div>
        </a>
      )}
    </header>
  );
}
