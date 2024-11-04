// theme.js
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    primary: {
      50: "#e3f2f9",
      100: "#c5e4f3",
      // ...more shades
      900: "#0c2461",
    },
    secondary: {
      50: "#ffe3ec",
      // ...more shades
      900: "#620e23",
    },
    text: {
      primary: "#000000",
      secondary: "#555555",
    },
    background: {
      light: "#ffffff",
      dark: "#f0f0f0",
    },
  },
  fonts: {
    heading: "Arial, sans-serif",
    body: "Verdana, sans-serif",
  },
  fontSizes: {
    xs: "12px",
    sm: "14px",
    // ...more sizes
    xl: "24px",
  },
  space: {
    px: "1px",
    0: "0",
    // ...more spacing
    10: "2.5rem",
  },
  radii: {
    none: "0",
    sm: "2px",
    // ...more radii
    lg: "8px",
  },
});

export default theme;