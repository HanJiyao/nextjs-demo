import { ref, push, onValue, DataSnapshot } from 'firebase/database';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { database, storage } from './firebase';

export interface Note {
  id: string;
  content: string;
  fileUrl?: string;
  createdAt: string;
  userId: string;
}

export const createNote = async (userId: string, content: string, file?: File): Promise<void> => {
  const notesRef = ref(database, 'notes');
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

  await push(notesRef, newNote);
};

export const getUserNotes = (userId: string, callback: (notes: Note[]) => void) => {
  const notesRef = ref(database, 'notes');
  onValue(notesRef, (snapshot: DataSnapshot) => {
    const data = snapshot.val();
    const notes: Note[] = [];
    for (const id in data) {
      if (data[id].userId === userId) {
        notes.push({ id, ...data[id] });
      }
    }
    callback(notes);
  });
};