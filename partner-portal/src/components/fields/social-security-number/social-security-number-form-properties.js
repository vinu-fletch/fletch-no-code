import React, { useState, useEffect } from "react";
import {
  Box,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Switch,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Button,
} from "@chakra-ui/react";

const SocialSecurityNumberProperties = ({
  handleInputChange,
  handleCheckboxChange,
  fieldAttributes,
}) => {
  return (
    <Box>
      <Accordion allowToggle defaultIndex={[0]}>
        {/* Basic Settings */}
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left" fontWeight="bold">
              Basic Settings
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <VStack spacing={3} align="stretch">
              <FormControl isRequired>
                <FormLabel>Form Name</FormLabel>
                <Input
                  name="name"
                  value={fieldAttributes.name || ""}
                  onChange={handleInputChange}
                  bg="gray.700"
                  color="white"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Label</FormLabel>
                <Input
                  name="label"
                  value={fieldAttributes.label || ""}
                  onChange={handleInputChange}
                  bg="gray.700"
                  color="white"
                />
              </FormControl>

              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">Required</FormLabel>
                <Switch
                  name="required"
                  isChecked={fieldAttributes.required || false}
                  onChange={handleCheckboxChange}
                  colorScheme="primary"
                />
              </FormControl>
            </VStack>
          </AccordionPanel>
        </AccordionItem>

        {/* Styles */}
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left" fontWeight="bold">
              Styles
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <VStack spacing={3} align="stretch">
              <FormControl>
                <FormLabel>Height of Individual Fields</FormLabel>
                <Input
                  name="fieldHeight"
                  value={fieldAttributes.fieldHeight || ""}
                  onChange={handleInputChange}
                  placeholder="e.g., 50px"
                  bg="gray.700"
                  color="white"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Width of Individual Fields</FormLabel>
                <Input
                  name="fieldWidth"
                  value={fieldAttributes.fieldWidth || ""}
                  onChange={handleInputChange}
                  placeholder="e.g., 50px"
                  bg="gray.700"
                  color="white"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Border Radius</FormLabel>
                <Input
                  name="borderRadius"
                  value={fieldAttributes.borderRadius || ""}
                  onChange={handleInputChange}
                  placeholder="e.g., 4px, 50%"
                  bg="gray.700"
                  color="white"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Border Color</FormLabel>
                <Input
                  name="borderColor"
                  value={fieldAttributes.borderColor || ""}
                  onChange={handleInputChange}
                  placeholder="e.g., #000000"
                  bg="gray.700"
                  color="white"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Background Color for All Fields</FormLabel>
                <Input
                  name="backgroundColor"
                  value={fieldAttributes.backgroundColor || ""}
                  onChange={handleInputChange}
                  placeholder="e.g., #ffffff"
                  bg="gray.700"
                  color="white"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Input Text Color</FormLabel>
                <Input
                  name="inputTextColor"
                  value={fieldAttributes.inputTextColor || ""}
                  onChange={handleInputChange}
                  placeholder="e.g., #000000"
                  bg="gray.700"
                  color="white"
                />
              </FormControl>
            </VStack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

export default SocialSecurityNumberProperties;
