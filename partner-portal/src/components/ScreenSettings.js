import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Select,
  Button,
  HStack,
} from "@chakra-ui/react";
import { ChromePicker } from "react-color";
import ScreenRuleConfig from "./rules/screen-rules-config";


export const ScreenSettings = ({ screens, activeScreenIndex, onUpdateScreen }) => {
  const [showColorPicker, setShowColorPicker] = useState({ background: false, heading: false, description: false });
  
  const [isAddingRule, setIsAddingRule] = useState(false);
  const [editingRuleIndex, setEditingRuleIndex] = useState(null);

  const activeScreen = screens[activeScreenIndex];
  const screenConfig = activeScreen?.screen_config || {};
  const sectionRules = screenConfig.rules || [];

  const toggleColorPicker = (key) => {
    setShowColorPicker((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <Box p={4} bg="background.dark" color="text.primary" width="100%">
      <Accordion allowMultiple>
        {/* Existing AccordionItem for Screen Settings */}
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Screen Settings
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <VStack spacing={4} align="stretch">
              {/* Screen Heading */}
              <FormControl>
                <FormLabel>Screen Heading (Optional)</FormLabel>
                <Input
                  value={screenConfig.heading || ""}
                  onChange={(e) => {
                    const updatedScreens = [...screens];
                    updatedScreens[activeScreenIndex].screen_config = {
                      ...screenConfig,
                      heading: e.target.value,
                    };
                    onUpdateScreen(updatedScreens);
                  }}
                  bg="background.dark"
                  borderColor="primary.200"
                  color="text.primary"
                  _placeholder={{ color: "text.secondary" }}
                  _hover={{ borderColor: "primary.100" }}
                  _focus={{ borderColor: "primary.100" }}
                />
              </FormControl>

              {/* Screen Heading Color */}
              <FormControl>
                <FormLabel>Screen Heading Color (Optional)</FormLabel>
                <Box position="relative">
                  <Box
                    onClick={() => toggleColorPicker("heading")}
                    bg={screenConfig.heading_color || "primary.200"}
                    color="text.primary"
                    p={2}
                    borderRadius="md"
                    cursor="pointer"
                  >
                    {screenConfig.heading_color || "Select Color"}
                  </Box>
                  {showColorPicker.heading && (
                    <Box mt={2} position="absolute" zIndex="2">
                      <Box
                        position="fixed"
                        top="0"
                        left="0"
                        right="0"
                        bottom="0"
                        onClick={() => toggleColorPicker("heading")}
                      />
                      <ChromePicker
                        color={screenConfig.heading_color || "#ffffff"}
                        onChangeComplete={(color) => {
                          const updatedScreens = [...screens];
                          updatedScreens[activeScreenIndex].screen_config = {
                            ...screenConfig,
                            heading_color: color.hex,
                          };
                          onUpdateScreen(updatedScreens);
                        }}
                        disableAlpha
                      />
                    </Box>
                  )}
                </Box>
              </FormControl>

              {/* Font Size and Font Weight for Heading */}
              <FormControl>
                <FormLabel>Heading Font Size</FormLabel>
                <Select
                  value={screenConfig.heading_font_size || "large"}
                  onChange={(e) => {
                    const updatedScreens = [...screens];
                    updatedScreens[activeScreenIndex].screen_config = {
                      ...screenConfig,
                      heading_font_size: e.target.value,
                    };
                    onUpdateScreen(updatedScreens);
                  }}
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Heading Font Weight</FormLabel>
                <Select
                  value={screenConfig.heading_font_weight || "normal"}
                  onChange={(e) => {
                    const updatedScreens = [...screens];
                    updatedScreens[activeScreenIndex].screen_config = {
                      ...screenConfig,
                      heading_font_weight: e.target.value,
                    };
                    onUpdateScreen(updatedScreens);
                  }}
                >
                  <option value="light">Light</option>
                  <option value="normal">Normal</option>
                  <option value="bold">Bold</option>
                </Select>
              </FormControl>

              {/* Screen Description */}
              <FormControl>
                <FormLabel>Screen Description</FormLabel>
                <Input
                  value={screenConfig.description || ""}
                  onChange={(e) => {
                    const updatedScreens = [...screens];
                    updatedScreens[activeScreenIndex].screen_config = {
                      ...screenConfig,
                      description: e.target.value,
                    };
                    onUpdateScreen(updatedScreens);
                  }}
                  bg="background.dark"
                  borderColor="primary.200"
                  color="text.primary"
                  _placeholder={{ color: "text.secondary" }}
                  _hover={{ borderColor: "primary.100" }}
                  _focus={{ borderColor: "primary.100" }}
                />
              </FormControl>

              {/* Screen Description Color */}
              <FormControl>
                <FormLabel>Description Color (Optional)</FormLabel>
                <Box position="relative">
                  <Box
                    onClick={() => toggleColorPicker("description")}
                    bg={screenConfig.description_color || "primary.200"}
                    color="text.primary"
                    p={2}
                    borderRadius="md"
                    cursor="pointer"
                  >
                    {screenConfig.description_color || "Select Color"}
                  </Box>
                  {showColorPicker.description && (
                    <Box mt={2} position="absolute" zIndex="2">
                      <Box
                        position="fixed"
                        top="0"
                        left="0"
                        right="0"
                        bottom="0"
                        onClick={() => toggleColorPicker("description")}
                      />
                      <ChromePicker
                        color={screenConfig.description_color || "#ffffff"}
                        onChangeComplete={(color) => {
                          const updatedScreens = [...screens];
                          updatedScreens[activeScreenIndex].screen_config = {
                            ...screenConfig,
                            description_color: color.hex,
                          };
                          onUpdateScreen(updatedScreens);
                        }}
                        disableAlpha
                      />
                    </Box>
                  )}
                </Box>
              </FormControl>

              {/* Background Color */}
              <FormControl>
                <FormLabel>Background Color (Optional)</FormLabel>
                <Box position="relative">
                  <Box
                    onClick={() => toggleColorPicker("background")}
                    bg={screenConfig.background_color || "background.dark"}
                    color="text.primary"
                    p={2}
                    borderRadius="md"
                    cursor="pointer"
                  >
                    {screenConfig.background_color || "Select Color"}
                  </Box>
                  {showColorPicker.background && (
                    <Box mt={2} position="absolute" zIndex="2">
                      <Box
                        position="fixed"
                        top="0"
                        left="0"
                        right="0"
                        bottom="0"
                        onClick={() => toggleColorPicker("background")}
                      />
                      <ChromePicker
                        color={screenConfig.background_color || "#ffffff"}
                        onChangeComplete={(color) => {
                          const updatedScreens = [...screens];
                          updatedScreens[activeScreenIndex].screen_config = {
                            ...screenConfig,
                            background_color: color.hex,
                          };
                          onUpdateScreen(updatedScreens);
                        }}
                        disableAlpha
                      />
                    </Box>
                  )}
                </Box>
              </FormControl>

              {/* Continue Button Text */}
              <FormControl>
                <FormLabel>Continue Button Text</FormLabel>
                <Input
                  value={screenConfig.continue_button_text || ""}
                  onChange={(e) => {
                    const updatedScreens = [...screens];
                    updatedScreens[activeScreenIndex].screen_config = {
                      ...screenConfig,
                      continue_button_text: e.target.value,
                    };
                    onUpdateScreen(updatedScreens);
                  }}
                  bg="background.dark"
                  borderColor="primary.200"
                  color="text.primary"
                  _placeholder={{ color: "text.secondary" }}
                  _hover={{ borderColor: "primary.100" }}
                  _focus={{ borderColor: "primary.100" }}
                />
              </FormControl>
            </VStack>
          </AccordionPanel>
        </AccordionItem>

        {/* New AccordionItem for Section Rules */}
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Section Rules
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            {isAddingRule || editingRuleIndex !== null ? (
              <ScreenRuleConfig
                initialRule={editingRuleIndex !== null ? sectionRules[editingRuleIndex] : null}
                onSave={(rule) => {
                  const updatedScreens = [...screens];
                  const updatedRules = [...sectionRules];

                  if (editingRuleIndex !== null) {
                    // Editing an existing rule
                    updatedRules[editingRuleIndex] = rule;
                  } else {
                    // Adding a new rule
                    updatedRules.push(rule);
                  }

                  updatedScreens[activeScreenIndex].screen_config = {
                    ...screenConfig,
                    rules: updatedRules,
                  };

                  onUpdateScreen(updatedScreens);

                  // Reset states
                  setIsAddingRule(false);
                  setEditingRuleIndex(null);
                }}
                onCancel={() => {
                  setIsAddingRule(false);
                  setEditingRuleIndex(null);
                }}
              />
            ) : (
              <>
                <VStack spacing={4} align="stretch">
                  {sectionRules.length > 0 ? (
                    sectionRules.map((rule, index) => (
                      <Box key={index} p={4} bg="gray.700" borderRadius="md">
                        {/* Display rule details */}
                        <Box>
                          <strong>Trigger:</strong> {rule.trigger}
                        </Box>
                        <Box>
                          <strong>Type:</strong> {rule.type}
                        </Box>
                        {/* You can display more details or actions here */}

                        {/* Buttons to edit or delete the rule */}
                        <HStack spacing={2} mt={2}>
                          <Button
                            size="sm"
                            onClick={() => {
                              setEditingRuleIndex(index);
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            colorScheme="red"
                            onClick={() => {
                              // Delete the rule
                              const updatedScreens = [...screens];
                              const updatedRules = sectionRules.filter((_, i) => i !== index);
                              updatedScreens[activeScreenIndex].screen_config = {
                                ...screenConfig,
                                rules: updatedRules,
                              };
                              onUpdateScreen(updatedScreens);
                            }}
                          >
                            Delete
                          </Button>
                        </HStack>
                      </Box>
                    ))
                  ) : (
                    <Box>No rules defined.</Box>
                  )}

                  {/* Button to add a new rule */}
                  <Button
                    variant="outline"
                    colorScheme="primary"
                    onClick={() => {
                      setIsAddingRule(true);
                    }}
                  >
                    Add Rule
                  </Button>
                </VStack>
              </>
            )}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};