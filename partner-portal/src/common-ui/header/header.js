
import React from 'react';
import { Flex, Image } from '@chakra-ui/react';

const Header = ({ logoLink, logoWidth, logoHeight, logoAlignment, bgColor }) => {
  return (
    <Flex
      as="header"
      justifyContent={logoAlignment}
      alignItems="center"
      p={4}
      bg={bgColor}
      width="100%"
    >
      {logoLink && (
        <Image
          src={logoLink}
          alt="Logo"
          width={`${logoWidth}px`}
          height={`${logoHeight}px`}
          objectFit="contain"
        />
      )}
    </Flex>
  );
};

export default Header;