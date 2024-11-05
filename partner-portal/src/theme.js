// theme.js
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    primary: {
      100: "#4a5568",
      200: "#2d3748",
      300: "#1a202c", 
    },
    secondary: {
      100: "#718096",
      200: "#4a5568",
      300: "#2d3748",
    },
    text: {
      primary: "#ffffff",
      secondary: "#a0aec0",
    },
    background: {
      light: "#1a202c",
      dark: "#171923", 
      semi: "#2e2432"
    },
  },
  fonts: {
    heading: "Arial, sans-serif",
    body: "Verdana, sans-serif",
  },
  fontSizes: {
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "18px",
    xl: "24px",
  },
  space: {
    px: "1px",
    0: "0",
    1: "4px",
    2: "8px",
    3: "12px",
    4: "16px",
    5: "20px",
    6: "24px",
    8: "32px",
    10: "40px",
  },
  radii: {
    none: "0",
    sm: "2px",
    md: "4px",
    lg: "8px",
    full: "9999px",
  },
});

export default theme;