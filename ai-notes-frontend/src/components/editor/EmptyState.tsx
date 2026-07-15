import {
  Box,
  Button,
  Paper,
  Typography,
} from "@mui/material";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";

interface EmptyStateProps {
  onCreateNote: () => void;
}

export default function EmptyState({
  onCreateNote,
}: EmptyStateProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        flex: 1,
        height: "100%",
        borderRadius: 4,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(180deg,#111827 0%,#0F172A 100%)",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          maxWidth: 420,
          px: 4,
        }}
      >
        <Box
          sx={{
            width: 90,
            height: 90,
            borderRadius: "50%",
            mx: "auto",
            mb: 3,

            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            background:
              "linear-gradient(135deg,#6366F1,#22C55E)",

            boxShadow:
              "0 20px 50px rgba(99,102,241,.30)",
          }}
        >
          <DescriptionRoundedIcon
            sx={{
              fontSize: 42,
              color: "#fff",
            }}
          />
        </Box>

        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: 1.5,
          }}
        >
          No Note Selected
        </Typography>

        <Typography
          sx={{
            color: "text.secondary",
            mb: 4,
            lineHeight: 1.8,
          }}
        >
          Select a note from the sidebar or create a new one
          to start writing.
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddRoundedIcon />}
          onClick={onCreateNote}
          sx={{
            px: 3,
            py: 1.2,

            borderRadius: 999,

            background:
              "linear-gradient(90deg,#6366F1,#22C55E)",

            "&:hover": {
              background:
                "linear-gradient(90deg,#5B5CF6,#16A34A)",
            },
          }}
        >
          Create Note
        </Button>
      </Box>
    </Paper>
  );
}