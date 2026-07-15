import { useEffect, useMemo, useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import EmptyState from "./components/editor/EmptyState";
import type { Note } from "./types";

import Navbar from "./components/layout/Navbar";
import MainLayout from "./components/layout/MainLayout";
import Sidebar from "./components/sidebar/SideBar";
import Editor from "./components/editor/Editor";

import Drawer from "@mui/material/Drawer";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} from "./api/notes";

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const selectedNote = useMemo(
    () => notes.find((n) => n.id === selectedNoteId) || null,
    [notes, selectedNoteId]
  );

  const filteredNotes = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return notes;
    return notes.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.content.toLowerCase().includes(q)
    );
  }, [notes, search]);

  const handleAddNote = async () => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      title: "Untitled note",
      content: "",
      createdAt: new Date().toISOString(),
    };

    try {
      await createNote(newNote);

      await loadNotes();

      setSelectedNoteId(newNote.id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteNote = async (id: string) => {
    try {
      await deleteNote(id);

      await loadNotes();

      if (selectedNoteId === id) {
        setSelectedNoteId(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateNote = async (
    changes: Partial<Note>
  ) => {
    if (!selectedNote) return;

    const updatedNote: Note = {
      ...selectedNote,
      ...changes,
    };

    try {
      await updateNote(updatedNote.id, updatedNote);

      setNotes((prev) =>
        prev.map((note) =>
          note.id === updatedNote.id
            ? updatedNote
            : note
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const loadNotes = async () => {
    try {
      const data = await getNotes();
      setNotes(data);
    } catch (error) {
      console.error(error);
    }
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    loadNotes();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Navbar
        onNewNote={handleAddNote}
        search={search}
        onSearchChange={setSearch}
        onMenuClick={() => setMobileOpen(true)}
      />

      <MainLayout
        sidebar={
          isMobile ? null : (
            <Sidebar
              notes={filteredNotes}
              search={search}
              selectedNoteId={selectedNoteId}
              onSearchChange={setSearch}
              onSelect={setSelectedNoteId}
              onDelete={handleDeleteNote}
            />
          )
        }
        editor={
          selectedNote ? (
            <Editor
              note={selectedNote}
              onUpdate={handleUpdateNote}
            />
          ) : (
            <EmptyState
              onCreateNote={handleAddNote}
            />
          )
        }
      />

      <Drawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        sx={{
          width: 320,
          background: "#020617",
        }}
      >
      <Sidebar
        notes={filteredNotes}
        search={search}
        selectedNoteId={selectedNoteId}
        onSearchChange={setSearch}
        onSelect={(id) => {
          setSelectedNoteId(id);
          setMobileOpen(false);
        }}
        onDelete={handleDeleteNote}
      />
      </Drawer>

    </ThemeProvider>
  );
}

export default App;