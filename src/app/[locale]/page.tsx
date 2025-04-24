'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { createNote, getUserNotes, Note } from '@/app/lib/notes';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Home() {
  const { user, loading, signInWithGoogle, logout } = useAuth();
  const [content, setContent] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      console.log('User ID:', user.uid); // Verify UID
      const unsubscribe = getUserNotes(user.uid, (notes) => {
        console.log('Received notes:', notes);
        setNotes(notes);
      });
      return () => unsubscribe();
    } else {
      setNotes([]);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    try {
      await createNote(user.uid, content, file || undefined);
      setContent('');
      setFile(null);
      setError(null);
    } catch (err) {
      setError('Failed to create note');
      console.error(err);
    }
  };
  const t = useTranslations('testNotes');

  if (loading) return <div>Loading...</div>;
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Notes App</h1>
        {user ? (
          <>
            <div className="mb-4">
              <p>Welcome, {user.displayName}</p>
              <button
                onClick={logout}
                className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Sign Out
              </button>
            </div>
            <form onSubmit={handleSubmit} className="mb-4">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your note..."
                className="w-full p-2 border rounded mb-2"
                required
              />
              <input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="mb-2"
              />
              {error && <p className="text-red-500 mb-2">{error}</p>}
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                {t('addNote')}
              </button>
            </form>
            <div>
              <h2 className="text-xl font-semibold mb-2">Your Notes</h2>
              {notes.length === 0 ? (
                <p>No notes yet.</p>
              ) : (
                <ul className="space-y-2">
                  {notes.map((note) => (
                    <li key={note.id} className="p-4 bg-gray-50 rounded shadow">
                      <p>{note.content}</p>
                      {note.fileUrl && (
                        <a
                          href={note.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline"
                        >
                          View File
                        </a>
                      )}
                      <p className="text-sm text-gray-500">
                        {new Date(note.createdAt).toLocaleString()}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        ) : (
          <div className="flex flex-col space-y-4">
            <button
              onClick={signInWithGoogle}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Sign in with Google
            </button>
            <Link
              href="/auth/login"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-center"
            >
              Log in with Email
            </Link>
            <Link
              href="/auth/register"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-center"
            >
              Register with Email
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}