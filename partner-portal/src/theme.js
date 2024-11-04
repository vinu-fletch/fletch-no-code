// theme.js
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    primary: {
      100: "#b3ecff", // Lightest shade
      200: "#4dd0ff", // Medium shade
      300: "#0088cc", // Darkest shade
    },
    secondary: {
      100: "#ffb3cf", // Lightest shade
      200: "#ff4d8c", // Medium shade
      300: "#e00050", // Darkest shade
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
    md: "16px", // Default font size
    lg: "18px",
    xl: "24px",
  },
  space: {
    px: "1px",
    0: "0",
    1: "4px",
    2: "8px",
    3: "12px",
    4: "16px", // Default spacing
    5: "20px",
    6: "24px",
    8: "32px",
    10: "40px",
  },
  radii: {
    none: "0",
    sm: "2px",
    md: "4px", // Default border radius
    lg: "8px",
    full: "9999px",
  },
});

export default theme;