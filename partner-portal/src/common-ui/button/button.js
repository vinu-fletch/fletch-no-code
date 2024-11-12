// common-ui/button/Button.js

import React from 'react';
import { Button as ChakraButton } from '@chakra-ui/react';

const Button = ({ variant = "primary", children, bg, color, ...props }) => {
  const buttonStyles = {
    primary: {
      bg: bg || "primary.500",
      color: color || "secondary.500",
      _hover: {
        bg: `${bg || "primary.500"}CC`, // Slightly darkened hover effect
      },
    },
    secondary: {
      bg: bg || "secondary.500",
      color: color || "primary.500",
      _hover: {
        bg: `${bg || "secondary.500"}CC`, // Slightly darkened hover effect
      },
    },
  };

  return (
    <ChakraButton {...buttonStyles[variant]} {...props}>
      {children}
    </ChakraButton>
  );
};

export default Button;