import { Box, InputBase, Typography } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

interface SearchBarProps {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

export default function SearchBar({
  value,
  placeholder = "Search...",
  onChange,
}: SearchBarProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,

        width: "100%",

        px: 2,
        py: 1.2,

        borderRadius: 999,

        background: "rgba(255,255,255,.04)",

        border: "1px solid rgba(255,255,255,.08)",

        transition: ".25s",

        "&:hover": {
          background: "rgba(255,255,255,.06)",
        },

        "&:focus-within": {
          border: "1px solid #6366F1",

          boxShadow: "0 0 0 4px rgba(99,102,241,.12)",
        },
      }}
    >
      <SearchRoundedIcon
        sx={{
          color: "text.secondary",
          fontSize: 20,
        }}
      />

      <InputBase
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        sx={{
          flex: 1,

          color: "#fff",

          fontSize: 14,

          "& input::placeholder": {
            color: "#94A3B8",

            opacity: 1,
          },
        }}
      />

      <Typography
        sx={{
          px: 1,

          py: .3,

          borderRadius: 1,

          fontSize: 11,

          color: "text.secondary",

          background: "rgba(255,255,255,.04)",

          border: "1px solid rgba(255,255,255,.06)",

          userSelect: "none",
        }}
      >
        Ctrl K
      </Typography>
    </Box>
  );
}