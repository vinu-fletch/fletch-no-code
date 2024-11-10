// components/ToggleComponent.js

import React from 'react';
import {
  Flex,
  Box,
  Heading,
  FormControl,
  RadioGroup,
  Radio,
  HStack,
} from "@chakra-ui/react";

export const CategoryToggle = ({ title, isEnabled, onToggle }) => {
  return (
    <Box bg="primary.300" color="text.primary" p={4}>
      <Flex alignItems="center" justifyContent="space-around">
        <Flex alignItems="center">
          <Heading minW="400px" mr={12} size="lg">
            {title}
          </Heading>
        </Flex>

        <FormControl as="fieldset" display="flex" alignItems="center">
          <RadioGroup
            value={isEnabled ? "enable" : "disable"}
            onChange={onToggle}
          >
            <HStack spacing="24px">
              <Radio value="enable">Enable</Radio>
              <Radio value="disable">Disable</Radio>
            </HStack>
          </RadioGroup>
        </FormControl>
      </Flex>
    </Box>
  );
};