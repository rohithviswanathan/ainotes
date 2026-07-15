import { Box } from "@mui/material";
import type { ReactNode } from "react";

interface MainLayoutProps {
  sidebar: ReactNode;
  editor: ReactNode;
}

export default function MainLayout({
  sidebar,
  editor,
}: MainLayoutProps) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        pt: "88px", // Space for fixed navbar
        px: 3,
        pb: 3,
        overflow: "hidden",
        background:
          "radial-gradient(circle at top left, rgba(99,102,241,.08), transparent 28%), radial-gradient(circle at bottom right, rgba(34,197,94,.06), transparent 28%), #020617",
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            md: "row",
          },
          gap: 3,
          height: "100%",
        }}
      >
        {/* Sidebar */}
        <Box
         sx={{
          display: {
            xs: "none",
            md: "block",
          },
          width: 340,
          flexShrink: 0,
         }}
        >
          {sidebar}
        </Box>

        {/* Editor */}
        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            height: "100%",
          }}
        >
          {editor}
        </Box>
      </Box>
    </Box>
  );
}