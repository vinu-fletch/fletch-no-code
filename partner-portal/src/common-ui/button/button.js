import React from 'react';
import { Button as ChakraButton, useTheme } from '@chakra-ui/react';

const Button = ({ variant = "primary", children, ...props }) => {
  const theme = useTheme();
  const buttonColors = theme.colors.button || {};

  const padding = theme.spacing.padding.button || "medium";

  // Padding mapping for button sizes
  const paddingMapping = {
    small: { px: 6, py: 4 },   
    medium: { px: 12, py: 6 },
    large: { px: 24, py: 8 },
  };

  // Get padding size based on provided padding prop or default to medium
  const buttonPadding = paddingMapping[padding] || paddingMapping.medium;

  const buttonStyles = {
    primary: {
      bg: buttonColors.primary || "blue.500",
      color: "white",
      _hover: {
        bg: `${buttonColors.primary}CC`,
      },
      borderRadius: "md",   // Set border radius for a rounded rectangular look
      ...buttonPadding,
    },
    secondary: {
      bg: buttonColors.secondary || "gray.500",
      color: "white",
      _hover: {
        bg: `${buttonColors.secondary}CC`,
      },
      borderRadius: "md",   // Consistent border radius for secondary
      ...buttonPadding,
    },
  };

  return (
    <ChakraButton {...buttonStyles[variant]} {...props}>
      {children}
    </ChakraButton>
  );
};

export default Button;