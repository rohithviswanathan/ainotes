import {
  Box,
  Divider,
  Paper,
  Typography,
} from "@mui/material";

import type { Note } from "../../types";
import NoteItem from "./NoteItem";
//import SearchBar from "../common/SearchBar";

interface SidebarProps {
  notes: Note[];
  search: string;
  selectedNoteId: string | null;
  onSearchChange: (value: string) => void;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function Sidebar({
  notes,
  //search,
  selectedNoteId,
  //onSearchChange,
  onSelect,
  onDelete,
}: SidebarProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        width: 320,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        overflow: "hidden",
        background: "#0F172A",
      }}
    >
      <Box
        sx={{
          p: 2.5,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
          }}
        >
          Notes
        </Typography>

        {/* <SearchBar
            value={search}
            placeholder="Search notes..."
            onChange={onSearchChange}
        /> */}
      </Box>

      <Divider />

      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 2,
        }}
      >
        {notes.length === 0 ? (
          <Typography
            sx={{
              color: "text.secondary",
              textAlign: "center",
              mt: 6,
            }}
          >
            No notes found
          </Typography>
        ) : (
          notes.map((note) => (
            <NoteItem
              key={note.id}
              note={note}
              selected={selectedNoteId === note.id}
              onClick={() => onSelect(note.id)}
              onDelete={() => onDelete(note.id)}
            />
          ))
        )}
      </Box>
    </Paper>
  );
}