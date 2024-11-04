// components/ThemeSettings.js
import { useState } from "react";
import { Box, Input, Button } from "@chakra-ui/react";
import { ChromePicker } from "react-color";

const ThemeSettings = ({ theme, setTheme }) => {
  const [color, setColor] = useState(theme.colors.primary[500]);

  const handleColorChange = (newColor) => {
    setColor(newColor.hex);
  };

  const applyTheme = () => {
    setTheme({
      ...theme,
      colors: {
        ...theme.colors,
        primary: {
          ...theme.colors.primary,
          500: color,
        },
      },
    });
  };

  return (
    <Box p={4}>
      <ChromePicker color={color} onChangeComplete={handleColorChange} />
      <Button mt={4} onClick={applyTheme}>
        Apply Theme
      </Button>
    </Box>
  );
};

export default ThemeSettings;