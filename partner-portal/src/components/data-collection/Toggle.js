import React from 'react';
import {
  Flex,
  Box,
  Heading,
  FormControl,
  RadioGroup,
  Radio,
  HStack,
  useDisclosure
} from "@chakra-ui/react";

import { ConfirmationModal } from '../modal/ConfirmationModal';

export const DataCollectionToggle = ({dataCollectionEnabled, confirmToggleDataCollection, handleDataCollectionToggle}) => {
   const { isOpen, onOpen, onClose } = useDisclosure();

     return (
        <>
        <Box bg="primary.300" color="text.primary" p={4}>
          <Flex alignItems="center" justifyContent="space-around">
            <Flex alignItems="center">
              <Heading minW="400px" mr={12} size="lg">
                Data Collection
              </Heading>
            </Flex>

            <FormControl as="fieldset" display="flex" alignItems="center">
              <RadioGroup
                value={dataCollectionEnabled ? "enable" : "disable"}
                onChange={handleDataCollectionToggle}
              >
                <HStack spacing="24px">
                  <Radio value="enable">Enable</Radio>
                  <Radio value="disable">Disable</Radio>
                </HStack>
              </RadioGroup>
            </FormControl>
          </Flex>
        </Box>

        </>
     )
}