import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import InputBase from "@mui/material/InputBase";

interface NavbarProps {
  onNewNote: () => void;
  search: string;
  onSearchChange: (value: string) => void;
  onMenuClick: () => void;
}

export default function Navbar({ onNewNote, search, onSearchChange, onMenuClick }: NavbarProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background: "rgba(2, 6, 23, 0.75)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "none",
      }}
    >
      <Toolbar
        sx={{
          minHeight: "72px !important",
          px: {
            xs: 2,
            md: 4,
          },
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >

        {/* Left Section */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            flex: 1,
          }}
        >
          <IconButton
            onClick={isMobile ? onMenuClick : undefined}
            disableRipple={!isMobile}
            sx={{
              p: 0,
              mr: 1,

              "&:hover": {
                background: "transparent",
              },
            }}
          >
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: 2,
                background:
                  "linear-gradient(135deg,#6366F1,#22C55E)",

                display: "flex",
                justifyContent: "center",
                alignItems: "center",

                color: "#fff",

                fontWeight: 700,

                fontSize: 18,

                boxShadow:
                  "0 0 24px rgba(99,102,241,.35)",

                cursor: isMobile ? "pointer" : "default",
              }}
            >
              AI
            </Box>
          </IconButton>

          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                lineHeight: 1.1,
              }}
            >
              AI Notes
            </Typography>

            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
              }}
            >
              Local First AI Workspace
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: {
              xs: "none",
              md: "flex",
            },
            alignItems: "center",
            gap: 1,
            width: 360,
            px: 2,
            py: 1,
            borderRadius: "999px",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            transition: "0.25s",

            "&:hover": {
              background: "rgba(255,255,255,0.06)",
            },

            "&:focus-within": {
              border: "1px solid #6366F1",
              boxShadow: "0 0 0 3px rgba(99,102,241,.15)",
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
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search notes..."
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
        </Box>

        {/* Right Section */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            ml: 3,
          }}
        >
          <Tooltip title="AI Features Coming Soon">
            <IconButton
              sx={{
                width: 42,
                height: 42,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",

                "&:hover": {
                  background: "rgba(99,102,241,0.15)",
                },
              }}
            >
              <AutoAwesomeRoundedIcon />
            </IconButton>
          </Tooltip>

          <Button
            variant="contained"
            startIcon={!isMobile ? <AddRoundedIcon /> : undefined}
            onClick={onNewNote}
            sx={{
              minWidth: isMobile ? 48 : "auto",
              px: isMobile ? 0 : 2.5,
              py: 1,

              borderRadius: 999,

              background:
                "linear-gradient(90deg,#6366F1,#22C55E)",

              "&:hover": {
                background:
                  "linear-gradient(90deg,#5B5CF6,#16A34A)",
              },
            }}
          >
            {isMobile ? <AddRoundedIcon /> : "New Note"}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}