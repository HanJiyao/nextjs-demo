import { db, storage } from './firebase';
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  QuerySnapshot,
} from 'firebase/firestore';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

export interface Note {
  id: string;
  content: string;
  fileUrl?: string;
  createdAt: string;
  userId: string;
}

/**
 * Creates a new note in the Firestore 'notes' collection, optionally uploading a file to Storage.
 * @param userId The authenticated user's ID.
 * @param content The note's content.
 * @param file Optional file to upload.
 */
export const createNote = async (userId: string, content: string, file?: File): Promise<void> => {
  try {
    if (!userId) {
      throw new Error('User ID is required');
    }
    if (!content.trim()) {
      throw new Error('Note content cannot be empty');
    }

    const notesCollection = collection(db, 'notes');
    const newNote: Omit<Note, 'id'> = {
      content,
      createdAt: new Date().toISOString(),
      userId,
    };

    if (file) {
      const filePath = `files/${userId}/${Date.now()}_${file.name}`;
      const fileStorageRef = storageRef(storage, filePath);
      await uploadBytes(fileStorageRef, file);
      newNote.fileUrl = await getDownloadURL(fileStorageRef);
    }

    await addDoc(notesCollection, newNote);
    console.log('Note created successfully');
  } catch (error) {
    console.error('Error creating note:', error);
    throw error;
  }
};

/**
 * Retrieves notes for a specific user from the Firestore 'notes' collection in real-time.
 * @param userId The authenticated user's ID.
 * @param callback Function to handle the retrieved notes.
 * @returns Unsubscribe function to stop the listener.
 */
export const getUserNotes = (
  userId: string,
  callback: (notes: Note[]) => void
): (() => void) => {
  try {
    if (!userId) {
      console.error('Invalid userId:', userId);
      callback([]);
      return () => {};
    }

    const q = query(collection(db, 'notes'), where('userId', '==', userId));
    const unsubscribe = onSnapshot(
      q,
      (snapshot: QuerySnapshot) => {
        const notes: Note[] = [];
        snapshot.forEach((doc) => {
          notes.push({ id: doc.id, ...doc.data() } as Note);
        });
        callback(notes);
      },
      (error) => {
        console.error('onSnapshot error:', error);
        callback([]);
      }
    );

    return unsubscribe;
  } catch (error) {
    console.error('Error setting up notes listener:', error);
    callback([]);
    return () => {};
  }
};