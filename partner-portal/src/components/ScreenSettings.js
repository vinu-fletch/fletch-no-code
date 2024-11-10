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
  useDisclosure,
} from "@chakra-ui/react";
import { ChromePicker } from "react-color";

export const ScreenSettings = ({ screens, activeScreenIndex, onUpdateScreen }) => {
  const [showColorPicker, setShowColorPicker] = useState(false);

  // Extract screen_config from the active screen
  const activeScreen = screens[activeScreenIndex];
  const screenConfig = activeScreen?.screen_config || {};

  return (
    <Box p={4} bg="background.dark" color="text.primary" width="100%">
      <Accordion allowMultiple>
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Screen Settings
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <VStack spacing={4} align="stretch">
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

              <FormControl>
                <FormLabel>Background Color (Optional)</FormLabel>
                <Box position="relative">
                  <Box
                    onClick={() => setShowColorPicker(!showColorPicker)}
                    bg={screenConfig.background_color || "background.dark"}
                    color="text.primary"
                    p={2}
                    borderRadius="md"
                    cursor="pointer"
                  >
                    {screenConfig.background_color || "Select Color"}
                  </Box>
                  {showColorPicker && (
                    <Box mt={2} position="absolute" zIndex="2">
                      <Box
                        position="fixed"
                        top="0"
                        left="0"
                        right="0"
                        bottom="0"
                        onClick={() => setShowColorPicker(false)}
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
      </Accordion>
    </Box>
  );
};