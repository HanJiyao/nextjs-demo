"use client";

// import { useState, useEffect } from "react";
// import { createNote, getUserNotes, Note } from "@/lib/notes";
// import Link from "next/link";
// import {useTranslations} from 'next-intl';

// import { getAuthenticatedAppForUser as getUser} from "@/lib/firebase/serverApp";
import { useTranslations } from "next-intl";
export default function Home() {
  const t = useTranslations('appHostingTest');
  return (
    <div className="h-[calc(100vh-58px)] flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">{t('helloWorld')}</h1>
    </div>
  );
}
