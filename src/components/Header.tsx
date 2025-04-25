"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  signInWithGoogle,
  signOut,
  onIdTokenChanged,
} from "@/lib/firebase/auth";
import { User } from "firebase/auth";
import {useTranslations} from 'next-intl';

interface HeaderProps {
  initialUser: User | null;
}

function useUserSession(initialUser: User | null) {
  const [user, setUser] = useState<User | null>(initialUser);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return user;
}

export default function Header({ initialUser }: HeaderProps) {
  const user = useUserSession(initialUser);

  const handleSignOut = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    signOut();
  };

  const handleSignIn = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    signInWithGoogle();
  };
  const t = useTranslations('appHostingTest');

  return (
    <header>
      <Link href="/" className="logo">
        {t('appHostingTest')}
      </Link>
      {user ? (
        <>
          <div className="profile">
            <p>
              <Image
                className="profileImage"
                src={user.photoURL || "/profile.svg"}
                alt={user.email || "User profile"}
                width={32}
                height={32}
              />
              {user.displayName}
            </p>

            <div className="menu">
              <ul>
                {/* <li>{user.displayName}</li>
                <li>
                  <a href="#" onClick={addFakeRestaurantsAndReviews}>
                    Add sample restaurants
                  </a>
                </li> */}
                <li>
                  <a href="#" onClick={handleSignOut}>
                    Sign Out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </>
      ) : (
        <div className="profile">
          <a href="#" onClick={handleSignIn}>
            <Image
              src="/profile.svg"
              alt="A placeholder user image"
              width={32}
              height={32}
            />
            Sign In with Google
          </a>
        </div>
      )}
    </header>
  );
} 