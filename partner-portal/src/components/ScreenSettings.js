import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Select,
  Button,
  HStack,
} from "@chakra-ui/react";
import { ChromePicker } from "react-color";
import ScreenRuleConfig from "./rules/screen-rules-config";
import Elements from "./Elements";

export const ScreenSettings = ({
  screens,
  activeScreenIndex,
  onUpdateScreen,
  selectedField,
  onFieldSelect,
  onSaveField,
  onCancel,
  showFieldModal,
}) => {
  const [showColorPicker, setShowColorPicker] = useState({
    background: false,
    heading: false,
    description: false,
  });

  const [isAddingRule, setIsAddingRule] = useState(false);
  const [editingRuleIndex, setEditingRuleIndex] = useState(null);
  const [menuSelected, setMenuSelected] = useState("settings");

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
    <Box
      p={4}
      color="text.primary"
      width="100%"
      overflowY="scroll"
      maxHeight="100vh"
    >
      <HStack
        pb={2}
        borderBottom="1px solid"
        borderColor="gray.300"
        mb={4}
        justifyContent="space-around"
      >
        <Box
          textAlign="left"
          onClick={() => {
            setMenuSelected("settings");
          }}
          cursor="pointer"
          textDecoration={menuSelected === "settings" ? "underline" : "none"}
          mr={4}
        >
          Settings
        </Box>
        <Box
          textAlign="left"
          onClick={() => {
            setMenuSelected("elements");
          }}
          cursor="pointer"
          textDecoration={menuSelected === "elements" ? "underline" : "none"}
          ml={4}
        >
          Elements
        </Box>
      </HStack>
      {menuSelected === "settings" ? (
        <>
          <VStack spacing={4} align="stretch">
            {/* Screen Heading */}
            <FormControl>
              <FormLabel>Screen Heading</FormLabel>
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
              <FormLabel>Screen Heading Color</FormLabel>
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
              <FormLabel>Screen Heading Font Size</FormLabel>
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
              <FormLabel>Screen Heading Font Weight</FormLabel>
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
              <FormLabel>Screen Description Color</FormLabel>
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

            {/* Font Size and Font Weight for Description */}
            <FormControl>
              <FormLabel>Screen Description Font Size</FormLabel>
              <Select
                value={screenConfig.description_font_size || "large"}
                onChange={(e) => {
                  const updatedScreens = [...screens];
                  updatedScreens[activeScreenIndex].screen_config = {
                    ...screenConfig,
                    description_font_size: e.target.value,
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
              <FormLabel>Screen Description Font Weight</FormLabel>
              <Select
                value={screenConfig.description_font_weight || "normal"}
                onChange={(e) => {
                  const updatedScreens = [...screens];
                  updatedScreens[activeScreenIndex].screen_config = {
                    ...screenConfig,
                    description_font_weight: e.target.value,
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
              <FormLabel>Screen Sub Description</FormLabel>
              <Input
                value={screenConfig.sub_description || ""}
                onChange={(e) => {
                  const updatedScreens = [...screens];
                  updatedScreens[activeScreenIndex].screen_config = {
                    ...screenConfig,
                    sub_description: e.target.value,
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
              <FormLabel>Screen Description Color</FormLabel>
              <Box position="relative">
                <Box
                  onClick={() => toggleColorPicker("sub_description")}
                  bg={screenConfig.description_color || "primary.200"}
                  color="text.primary"
                  p={2}
                  borderRadius="md"
                  cursor="pointer"
                >
                  {screenConfig.sub_description_color || "Select Color"}
                </Box>
                {showColorPicker.sub_description && (
                  <Box mt={2} position="absolute" zIndex="2">
                    <Box
                      position="fixed"
                      top="0"
                      left="0"
                      right="0"
                      bottom="0"
                      onClick={() => toggleColorPicker("sub_description")}
                    />
                    <ChromePicker
                      color={screenConfig.sub_description_color || "#ffffff"}
                      onChangeComplete={(color) => {
                        const updatedScreens = [...screens];
                        updatedScreens[activeScreenIndex].screen_config = {
                          ...screenConfig,
                          sub_description_color: color.hex,
                        };
                        onUpdateScreen(updatedScreens);
                      }}
                      disableAlpha
                    />
                  </Box>
                )}
              </Box>
            </FormControl>

            {/* Font Size and Font Weight for Sub Description */}
            <FormControl>
              <FormLabel>Screen Sub Description Font Size</FormLabel>
              <Select
                value={screenConfig.sub_description_font_size || "large"}
                onChange={(e) => {
                  const updatedScreens = [...screens];
                  updatedScreens[activeScreenIndex].screen_config = {
                    ...screenConfig,
                    sub_description_font_size: e.target.value,
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
              <FormLabel>Screen Sub Description Font Weight</FormLabel>
              <Select
                value={screenConfig.sub_description_font_weight || "normal"}
                onChange={(e) => {
                  const updatedScreens = [...screens];
                  updatedScreens[activeScreenIndex].screen_config = {
                    ...screenConfig,
                    sub_description_font_weight: e.target.value,
                  };
                  onUpdateScreen(updatedScreens);
                }}
              >
                <option value="light">Light</option>
                <option value="normal">Normal</option>
                <option value="bold">Bold</option>
              </Select>
            </FormControl>

            {/* Next Button */}
            <FormControl>
              <FormLabel>Next Button</FormLabel>
              <Input
                value={screenConfig.next_button || ""}
                onChange={(e) => {
                  const updatedScreens = [...screens];
                  updatedScreens[activeScreenIndex].screen_config = {
                    ...screenConfig,
                    next_button: e.target.value,
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

            {/* Next Button Primary Color */}
            <FormControl>
              <FormLabel>Next Button Primary Color</FormLabel>
              <Box position="relative">
                <Box
                  onClick={() => toggleColorPicker("next_button_primary")}
                  bg={screenConfig.next_button_primary_color || "primary.200"}
                  color="text.primary"
                  p={2}
                  borderRadius="md"
                  cursor="pointer"
                >
                  {screenConfig.next_button_primary_color || "Select Color"}
                </Box>
                {showColorPicker.next_button_primary && (
                  <Box mt={2} position="absolute" zIndex="2">
                    <Box
                      position="fixed"
                      top="0"
                      left="0"
                      right="0"
                      bottom="0"
                      onClick={() => toggleColorPicker("next_button_primary")}
                    />
                    <ChromePicker
                      color={
                        screenConfig.next_button_primary_color || "#ffffff"
                      }
                      onChangeComplete={(color) => {
                        const updatedScreens = [...screens];
                        updatedScreens[activeScreenIndex].screen_config = {
                          ...screenConfig,
                          next_button_primary_color: color.hex,
                        };
                        onUpdateScreen(updatedScreens);
                      }}
                      disableAlpha
                    />
                  </Box>
                )}
              </Box>
            </FormControl>

            {/* Next Button Secondary Color */}
            <FormControl>
              <FormLabel>Next Button Secondary Color</FormLabel>
              <Box position="relative">
                <Box
                  onClick={() => toggleColorPicker("next_button_secondary")}
                  bg={screenConfig.next_button_secondary_color || "primary.200"}
                  color="text.primary"
                  p={2}
                  borderRadius="md"
                  cursor="pointer"
                >
                  {screenConfig.next_button_secondary_color || "Select Color"}
                </Box>
                {showColorPicker.next_button_secondary && (
                  <Box mt={2} position="absolute" zIndex="2">
                    <Box
                      position="fixed"
                      top="0"
                      left="0"
                      right="0"
                      bottom="0"
                      onClick={() => toggleColorPicker("next_button_secondary")}
                    />
                    <ChromePicker
                      color={
                        screenConfig.next_button_secondary_color || "#ffffff"
                      }
                      onChangeComplete={(color) => {
                        const updatedScreens = [...screens];
                        updatedScreens[activeScreenIndex].screen_config = {
                          ...screenConfig,
                          next_button_secondary_color: color.hex,
                        };
                        onUpdateScreen(updatedScreens);
                      }}
                      disableAlpha
                    />
                  </Box>
                )}
              </Box>
            </FormControl>

            {/* Font Size and Font Weight for Next Button */}
            <FormControl>
              <FormLabel>Next Button Font Size</FormLabel>
              <Select
                value={screenConfig.next_button_font_size || "large"}
                onChange={(e) => {
                  const updatedScreens = [...screens];
                  updatedScreens[activeScreenIndex].screen_config = {
                    ...screenConfig,
                    next_button_font_size: e.target.value,
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
              <FormLabel>Next Button Font Weight</FormLabel>
              <Select
                value={screenConfig.next_button_font_weight || "normal"}
                onChange={(e) => {
                  const updatedScreens = [...screens];
                  updatedScreens[activeScreenIndex].screen_config = {
                    ...screenConfig,
                    next_button_font_weight: e.target.value,
                  };
                  onUpdateScreen(updatedScreens);
                }}
              >
                <option value="light">Light</option>
                <option value="normal">Normal</option>
                <option value="bold">Bold</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Next Button Border Radius</FormLabel>
              <Input
                value={screenConfig.next_button_border_radius || ""}
                onChange={(e) => {
                  const updatedScreens = [...screens];
                  updatedScreens[activeScreenIndex].screen_config = {
                    ...screenConfig,
                    next_button_border_radius: e.target.value,
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

            {/* Back Button */}
            <FormControl>
              <FormLabel>Back Button</FormLabel>
              <Input
                value={screenConfig.back_button || ""}
                onChange={(e) => {
                  const updatedScreens = [...screens];
                  updatedScreens[activeScreenIndex].screen_config = {
                    ...screenConfig,
                    back_button: e.target.value,
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

            {/* Back Button Primary Color */}
            <FormControl>
              <FormLabel>Back Button Primary Color</FormLabel>
              <Box position="relative">
                <Box
                  onClick={() => toggleColorPicker("back_button_primary")}
                  bg={screenConfig.back_button_primary_color || "primary.200"}
                  color="text.primary"
                  p={2}
                  borderRadius="md"
                  cursor="pointer"
                >
                  {screenConfig.back_button_primary_color || "Select Color"}
                </Box>
                {showColorPicker.back_button_primary && (
                  <Box mt={2} position="absolute" zIndex="2">
                    <Box
                      position="fixed"
                      top="0"
                      left="0"
                      right="0"
                      bottom="0"
                      onClick={() => toggleColorPicker("back_button_primary")}
                    />
                    <ChromePicker
                      color={
                        screenConfig.back_button_primary_color || "#ffffff"
                      }
                      onChangeComplete={(color) => {
                        const updatedScreens = [...screens];
                        updatedScreens[activeScreenIndex].screen_config = {
                          ...screenConfig,
                          back_button_primary_color: color.hex,
                        };
                        onUpdateScreen(updatedScreens);
                      }}
                      disableAlpha
                    />
                  </Box>
                )}
              </Box>
            </FormControl>

            {/* Back Button Secondary Color */}
            <FormControl>
              <FormLabel>Back Button Secondary Color</FormLabel>
              <Box position="relative">
                <Box
                  onClick={() => toggleColorPicker("back_button_secondary")}
                  bg={screenConfig.back_button_secondary_color || "primary.200"}
                  color="text.primary"
                  p={2}
                  borderRadius="md"
                  cursor="pointer"
                >
                  {screenConfig.back_button_secondary_color || "Select Color"}
                </Box>
                {showColorPicker.back_button_secondary && (
                  <Box mt={2} position="absolute" zIndex="2">
                    <Box
                      position="fixed"
                      top="0"
                      left="0"
                      right="0"
                      bottom="0"
                      onClick={() => toggleColorPicker("back_button_secondary")}
                    />
                    <ChromePicker
                      color={
                        screenConfig.back_button_secondary_color || "#ffffff"
                      }
                      onChangeComplete={(color) => {
                        const updatedScreens = [...screens];
                        updatedScreens[activeScreenIndex].screen_config = {
                          ...screenConfig,
                          back_button_secondary_color: color.hex,
                        };
                        onUpdateScreen(updatedScreens);
                      }}
                      disableAlpha
                    />
                  </Box>
                )}
              </Box>
            </FormControl>

            {/* Font Size and Font Weight for Back Button */}
            <FormControl>
              <FormLabel>Back Button Font Size</FormLabel>
              <Select
                value={screenConfig.back_button_font_size || "large"}
                onChange={(e) => {
                  const updatedScreens = [...screens];
                  updatedScreens[activeScreenIndex].screen_config = {
                    ...screenConfig,
                    back_button_font_size: e.target.value,
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
              <FormLabel>Back Button Font Weight</FormLabel>
              <Select
                value={screenConfig.back_button_font_weight || "normal"}
                onChange={(e) => {
                  const updatedScreens = [...screens];
                  updatedScreens[activeScreenIndex].screen_config = {
                    ...screenConfig,
                    back_button_font_weight: e.target.value,
                  };
                  onUpdateScreen(updatedScreens);
                }}
              >
                <option value="light">Light</option>
                <option value="normal">Normal</option>
                <option value="bold">Bold</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Back Button Border Radius</FormLabel>
              <Input
                value={screenConfig.back_button_border_radius || ""}
                onChange={(e) => {
                  const updatedScreens = [...screens];
                  updatedScreens[activeScreenIndex].screen_config = {
                    ...screenConfig,
                    back_button_border_radius: e.target.value,
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

            <FormControl>
              <FormLabel>Back Button Position</FormLabel>
              <Select
                value={screenConfig.back_button_position || "normal"}
                onChange={(e) => {
                  const updatedScreens = [...screens];
                  updatedScreens[activeScreenIndex].screen_config = {
                    ...screenConfig,
                    back_button_position: e.target.value,
                  };
                  onUpdateScreen(updatedScreens);
                }}
              >
                <option value="Top">Top</option>
                <option value="Bottom">Bottom</option>
              </Select>
            </FormControl>
            <Box>Screen Rules</Box>
            {isAddingRule || editingRuleIndex !== null ? (
              <ScreenRuleConfig
                initialRule={
                  editingRuleIndex !== null
                    ? sectionRules[editingRuleIndex]
                    : null
                }
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
                              const updatedRules = sectionRules.filter(
                                (_, i) => i !== index
                              );
                              updatedScreens[activeScreenIndex].screen_config =
                                {
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
          </VStack>
        </>
      ) : (
        <>
          <Elements
            onFieldSelect={onFieldSelect}
            activeScreenIndex={activeScreenIndex}
          />
        </>
      )}
    </Box>
  );
};
