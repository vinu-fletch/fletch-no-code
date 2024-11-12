// components/Footer.js
import React from 'react';
import { Box } from '@chakra-ui/react';

const Footer = ({ footerText, bgColor, color }) => {
  return (
    <Box
      as="footer"
      mt={4}
      p={4}
      bg={bgColor}
      color={color}
      width="100%"
    >
      <div dangerouslySetInnerHTML={{ __html: footerText }} />
    </Box>
  );
};

export default Footer;