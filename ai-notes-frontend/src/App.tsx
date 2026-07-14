import { useEffect, useMemo, useState } from "react";
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} from "./api/notes";
import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  Toolbar,
  Typography,
  Paper,
  Button,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import type { Note } from "./types";

// Custom MUI theme for premium dark look
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#6366F1", // indigo
    },
    secondary: {
      main: "#22C55E", // green
    },
    background: {
      default: "#020617",
      paper: "#020617",
    },
  },
  shape: {
    borderRadius: 14,
  },
  typography: {
    fontFamily:
      '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
});

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

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

  const handleUpdateSelectedNote = async (
    changes: Partial<Note>
  ) => {
    if (!selectedNote) return;

    const updatedNote = {
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

  useEffect(() => {
    loadNotes();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="static"
        elevation={0}
        sx={{
          background: "linear-gradient(90deg, #4F46E5, #22C55E)",
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: 600 }}
          >
            AI Notes
          </Typography>
          <Button
            color="inherit"
            startIcon={<AddIcon />}
            onClick={handleAddNote}
            sx={{
              textTransform: "none",
              fontWeight: 500,
              borderRadius: 999,
              px: 2.5,
              backgroundColor: "rgba(15,23,42,0.24)",
              "&:hover": {
                backgroundColor: "rgba(15,23,42,0.4)",
              },
            }}
          >
            New Note
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 3 }}>
        <Box sx={{ display: "flex", gap: 2.5, height: "calc(100vh - 120px)" }}>
          {/* Left: Notes list panel */}
          <Paper
            elevation={0}
            sx={{
              width: "30%",
              minWidth: 260,
              display: "flex",
              flexDirection: "column",
              borderRadius: 3,
              border: "1px solid rgba(148, 163, 184, 0.24)",
              background:
                "linear-gradient(145deg, rgba(15,23,42,0.9), rgba(15,23,42,0.98))",
              backdropFilter: "blur(12px)",
            }}
          >
            <Box sx={{ p: 2 }}>
              <TextField
                fullWidth
                size="small"
                label="Search notes"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Box>
            <Divider />
            <Box sx={{ overflowY: "auto", flexGrow: 1 }}>
              {filteredNotes.length === 0 ? (
                <Typography
                  variant="body2"
                  sx={{ p: 2.5, color: "text.secondary" }}
                >
                  No notes yet. Click <b>New Note</b> to start capturing ideas.
                </Typography>
              ) : (
                <List>
                  {filteredNotes.map((note) => (
                    <ListItem
                      key={note.id}
                      disablePadding
                      secondaryAction={
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => handleDeleteNote(note.id)}
                          sx={{
                            color: "rgba(148,163,184,0.9)",
                            "&:hover": { color: "#F97373" },
                            transition: "color 0.2s ease-out",
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      }
                    >
                      <ListItemButton
                        selected={note.id === selectedNoteId}
                        onClick={() => setSelectedNoteId(note.id)}
                        sx={{
                          borderRadius: 2,
                          mx: 1,
                          my: 0.5,
                          transition:
                            "background-color 0.15s ease-out, transform 0.1s ease-out",
                          "&.Mui-selected": {
                            background:
                              "linear-gradient(90deg, rgba(99,102,241,0.32), rgba(34,197,94,0.24))",
                          },
                          "&:hover": {
                            backgroundColor: "rgba(30,64,175,0.35)",
                            transform: "translateY(-1px)",
                          },
                        }}
                      >
                       <ListItemText
                          primary={
                            <Typography variant="subtitle2" noWrap>
                              {note.title || "Untitled"}
                            </Typography>
                          }
                          secondary={
                            <Typography variant="caption" sx={{ color: "rgba(148,163,184,0.85)" }}>
                              {new Date(note.createdAt).toLocaleString()}
                            </Typography>
                          }
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              )}
            </Box>
          </Paper>

          {/* Right: Editor panel */}
          <Paper
            elevation={0}
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              borderRadius: 3,
              border: "1px solid rgba(148, 163, 184, 0.24)",
              background:
                "radial-gradient(circle at top left, rgba(99,102,241,0.24), transparent 50%), radial-gradient(circle at bottom right, rgba(34,197,94,0.18), transparent 55%), linear-gradient(145deg, rgba(15,23,42,0.96), rgba(15,23,42,0.98))",
              backdropFilter: "blur(18px)",
            }}
          >
            {selectedNote ? (
              <Box
                sx={{
                  p: 3,
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  gap: 2,
                }}
              >
                <TextField
                  label="Title"
                  variant="outlined"
                  value={selectedNote.title}
                  onChange={(e) =>
                    handleUpdateSelectedNote({ title: e.target.value })
                  }
                  fullWidth
                  sx={{
                    "& .MuiInputBase-input": {
                      fontSize: 20,
                      fontWeight: 600,
                    },
                  }}
                />
                <TextField
                  label="Content"
                  variant="outlined"
                  value={selectedNote.content}
                  onChange={(e) =>
                    handleUpdateSelectedNote({ content: e.target.value })
                  }
                  multiline
                  minRows={12}
                  maxRows={28}
                  fullWidth
                  sx={{
                    "& .MuiInputBase-input": {
                      fontFamily: "inherit",
                      lineHeight: 1.6,
                    },
                  }}
                />
                <Box
                  sx={{
                    mt: "auto",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="caption" color="text.secondary">
                    Created:{" "}
                    {new Date(selectedNote.createdAt).toLocaleString()}
                  </Typography>
                </Box>
              </Box>
            ) : (
              <Box
                sx={{
                  p: 3,
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  gap: 1.5,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: "rgba(226,232,240,0.9)",
                    fontWeight: 500,
                    mb: 0.5,
                  }}
                >
                  Welcome to AI Notes
                </Typography>
                <Typography
                  color="text.secondary"
                  align="center"
                >
                  Start by creating a new note or selecting an existing one.
                </Typography>
              </Box>
            )}
          </Paper>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;