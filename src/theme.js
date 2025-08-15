import { createTheme } from "@mui/material/styles";

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            background: { default: "#f4f6fa" },
            primary: { main: "#075e54" },
            secondary: { main: "#25d366" },
          }
        : {
            background: { default: "#121212" },
            primary: { main: "#25d366" },
            secondary: { main: "#075e54" },
          }),
    },
    shape: { borderRadius: 16 },
    components: {
      MuiCard: { styleOverrides: { root: { transition: "transform 0.2s" } } },
    },
  });
