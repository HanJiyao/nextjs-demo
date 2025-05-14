import { NextResponse } from "next/server";
import { getAllNotes, createNote, deleteNote } from "@/lib/testNotes";

export async function GET() {
  try {
    const notes = await getAllNotes();

    return NextResponse.json(
      { message: "Notes fetched successfully", notes },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
} 

export async function POST(request: Request) {
  const { newNote } = await request.json();
  const note = await createNote(newNote);
  return NextResponse.json(note, { status: 201 });
}

export async function DELETE(request: Request) {
  const { noteId } = await request.json();
  await deleteNote(noteId);
  return NextResponse.json({ message: "Note deleted successfully" }, { status: 201 });
}

