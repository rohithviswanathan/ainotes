import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",

    primary: {
      main: "#6366F1",
    },

    secondary: {
      main: "#22C55E",
    },

    background: {
      default: "#020617",
      paper: "#0F172A",
    },

    text: {
      primary: "#F8FAFC",
      secondary: "#94A3B8",
    },

    divider: "rgba(255,255,255,0.08)",
  },

  typography: {
    fontFamily:
      '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',

    h4: {
      fontWeight: 700,
      fontSize: "2rem",
    },

    h5: {
      fontWeight: 600,
    },

    h6: {
      fontWeight: 600,
    },

    subtitle1: {
      fontWeight: 600,
    },

    body1: {
      lineHeight: 1.8,
      fontSize: "1rem",
    },

    body2: {
      color: "#94A3B8",
    },
  },

  shape: {
    borderRadius: 16,
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: "#020617",
        },

        "*::-webkit-scrollbar": {
          width: "8px",
          height: "8px",
        },

        "*::-webkit-scrollbar-track": {
          background: "transparent",
        },

        "*::-webkit-scrollbar-thumb": {
          background: "#334155",
          borderRadius: "999px",
        },

        "*::-webkit-scrollbar-thumb:hover": {
          background: "#475569",
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: "#0F172A",
          border: "1px solid rgba(255,255,255,.08)",
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 14,

          backgroundColor: "rgba(255,255,255,.02)",

          transition: "all .2s",

          "&:hover": {
            backgroundColor: "rgba(255,255,255,.03)",
          },

          "&.Mui-focused": {
            backgroundColor: "rgba(255,255,255,.04)",
          },
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,

          textTransform: "none",

          fontWeight: 600,

          paddingInline: 18,

          transition: ".25s",

          "&:hover": {
            transform: "translateY(-1px)",
          },
        },
      },
    },

    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 14,

          transition: ".2s",

          "&:hover": {
            backgroundColor: "rgba(99,102,241,.12)",
          },

          "&.Mui-selected": {
            background:
              "linear-gradient(90deg, rgba(99,102,241,.18), rgba(34,197,94,.10))",

            "&:hover": {
              background:
                "linear-gradient(90deg, rgba(99,102,241,.22), rgba(34,197,94,.14))",
            },
          },
        },
      },
    },
  },
});

export default theme;