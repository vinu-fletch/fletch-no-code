import React from "react";
import {
  Box,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Switch,
  Select,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
const TextFieldProperties = ({
  handleInputChange,
  handleCheckboxChange,
  fieldAttributes,
  handleStyleChange,
}) => {
  return (
    <Box>
      <Accordion allowToggle defaultIndex={[0]}>
        {/* Basic Settings */}
        <AccordionItem border={"none"}>
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

              <FormControl isRequired>
                <FormLabel>Placeholder</FormLabel>
                <Input
                  name="placeholder"
                  value={fieldAttributes.placeholder || ""}
                  onChange={handleInputChange}
                  bg="gray.700"
                  color="white"
                />
              </FormControl>

              <FormControl display="flex" alignItems="center" isRequired>
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
                <FormLabel>Width</FormLabel>
                <Input
                  name="width"
                  value={fieldAttributes.style?.width || ""}
                  onChange={handleStyleChange}
                  placeholder="e.g., 100%, 200px"
                  bg="gray.700"
                  color="white"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Height</FormLabel>
                <Input
                  name="height"
                  value={fieldAttributes.style?.height || ""}
                  onChange={handleStyleChange}
                  placeholder="e.g., auto, 50px"
                  bg="gray.700"
                  color="white"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Background Color</FormLabel>
                <Input
                  name="backgroundColor"
                  value={fieldAttributes.style?.backgroundColor || ""}
                  onChange={handleStyleChange}
                  placeholder="e.g., #ffffff"
                  bg="gray.700"
                  color="white"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Text Color</FormLabel>
                <Input
                  name="textColor"
                  value={fieldAttributes.style?.textColor || ""}
                  onChange={handleStyleChange}
                  placeholder="e.g., #000000"
                  bg="gray.700"
                  color="white"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Placeholder Position</FormLabel>
                <Select
                  name="placeholderPosition"
                  value={fieldAttributes.style?.placeholderPosition || ""}
                  onChange={handleStyleChange}
                  placeholder="Select position"
                  bg="gray.700"
                  color="white"
                >
                  <option value="inside">Inside Input</option>
                  <option value="onInput">On Input</option>
                  <option value="floating">Floating Label</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Border Radius</FormLabel>
                <Input
                  name="borderRadius"
                  value={fieldAttributes.style?.borderRadius || ""}
                  onChange={handleStyleChange}
                  placeholder="e.g., 4px, 50%"
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

export default TextFieldProperties;
