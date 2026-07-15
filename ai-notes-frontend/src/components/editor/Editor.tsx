import {
  Box,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import type { Note } from "../../types";

interface EditorProps {
  note: Note | null;
  onUpdate: (changes: Partial<Note>) => void;
}

export default function Editor({
  note,
  onUpdate,
}: EditorProps) {
  if (!note) return null;

  const wordCount =
    note.content.trim() === ""
      ? 0
      : note.content.trim().split(/\s+/).length;

  const characterCount = note.content.length;

  return (
    <Paper
      elevation={0}
      sx={{
        flex: 1,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        overflow: "hidden",
        background:
          "linear-gradient(180deg,#111827 0%,#0F172A 100%)",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          px: 4,
          py: 3,
        }}
      >
        <TextField
          multiline
          fullWidth
          variant="standard"
          placeholder="Untitled Note"
          value={note.title}
          onChange={(e) =>
            onUpdate({
              title: e.target.value,
            })
          }
          slotProps={{
            input: {
              disableUnderline: true,
            },
          }}
          sx={{
            mb: 1,

            "& .MuiInputBase-input": {
              fontSize: {xs: 28, sm: 34},
              fontWeight: 700,
              color: "#ffffff",
              padding: 0,
              lineHeight: 1.2,
            },
          }}
        />

        <Typography
          sx={{
            color: "text.secondary",
            fontSize: 13,
          }}
        >
          Created {new Date(note.createdAt).toLocaleString()}
        </Typography>
      </Box>

      <Divider />

      {/* AI Toolbar Placeholder */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
          px: 4,
          py: 2,
          borderBottom: "1px solid rgba(255,255,255,.08)",
        }}
      >
        {[
          "Summarize",
          "Rewrite",
          "Improve",
          "Translate",
          "Generate Title",
        ].map((item) => (
          <Box
            key={item}
            sx={{
              px: 2,
              py: 0.8,
              borderRadius: "999px",
              border: "1px solid rgba(255,255,255,.08)",
              background: "rgba(255,255,255,.03)",
              color: "text.secondary",
              fontSize: 13,
              cursor: "not-allowed",
              transition: ".2s",

              "&:hover": {
                background: "rgba(99,102,241,.12)",
              },
            }}
          >
            ✨ {item}
          </Box>
        ))}
      </Box>

      {/* Editor */}
      <Box
        sx={{
          flex: 1,
          px: 4,
          py: 3,
          overflowY: "auto",
        }}
      >
        <TextField
          multiline
          fullWidth
          variant="standard"
          placeholder="Start writing..."
          value={note.content}
          onChange={(e) =>
            onUpdate({
              content: e.target.value,
            })
          }
          slotProps={{
            input: {
              disableUnderline: true,
            },
          }}
          sx={{
            width: "100%",

            "& .MuiInputBase-root": {
              alignItems: "flex-start",
            },

            "& .MuiInputBase-input": {
              fontSize: 17,
              lineHeight: 1.9,
              color: "#E2E8F0",
            },

            "& textarea": {
              minHeight: "60vh !important",
              resize: "none",
            },
          }}
        />
      </Box>

      <Divider />

      {/* Footer */}
      <Box
        sx={{
          px: 4,
          py: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Typography
          sx={{
            color: "text.secondary",
            fontSize: 13,
          }}
        >
          Words: {wordCount}
        </Typography>

        <Typography
          sx={{
            color: "text.secondary",
            fontSize: 13,
          }}
        >
          Characters: {characterCount}
        </Typography>

        <Typography
          sx={{
            color: "text.secondary",
            fontSize: 13,
          }}
        >
          Saved locally
        </Typography>
      </Box>
    </Paper>
  );
}