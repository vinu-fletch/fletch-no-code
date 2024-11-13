// components/Footer.js
import React from 'react';
import { Box } from '@chakra-ui/react';

const Footer = ({ footerText, bgColor, color }) => {
  return (
    <Box
    mt="-8"
      as="footer"
      p={4}
      bg={bgColor}
      color={color}
      width="100%"
      margin="auto"
      textAlign="center"
    >
      <div dangerouslySetInnerHTML={{ __html: footerText }} />
    </Box>
  );
};

export default Footer;