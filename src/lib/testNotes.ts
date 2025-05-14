"server-only";
import { adminDb } from "./firebase/admin";

interface Note {
  id: string;
  createdAt: string;
  content: string;
  fileUrl?: string;
}

export async function getAllNotes() {
  const notes = await adminDb.collection("notes").get();
  return notes.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
}

export async function createNote(newNote: Note) {
  const note = await adminDb.collection("notes").add(newNote);
  return note.id;
}

export async function deleteNote(noteId: string) {
  await adminDb.collection("notes").doc(noteId).delete();
}

