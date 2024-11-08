// pages/form-builder.js

import { useState, useEffect } from "react";
import {
  Flex,
  Box,
  Heading,
  Progress,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  RadioGroup,
  Radio,
  HStack,
} from "@chakra-ui/react";
import FieldSidebar from "../components/FieldSidebar";
import Canvas from "../components/Canvas";
import BottomTabs from "../components/BottomTabs";
import Layout from "../components/Layout";
import { ChromePicker } from "react-color";
import Head from "next/head";

const FormBuilderPage = ({ globalSettings }) => {
  const [screens, setScreens] = useState([
    {
      name: "Screen 1",
      backgroundColor: "",
      heading: "",
      continueButtonText: "",
      fields: [],
    },
  ]);
  const [activeScreenIndex, setActiveScreenIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showColorPicker, setShowColorPicker] = useState(false);

  // State for selected field and its configuration
  const [selectedField, setSelectedField] = useState(null);

  // State for Data Collection enabled/disabled
  const [dataCollectionEnabled, setDataCollectionEnabled] = useState(true);

  // Update progress based on the active screen
  useEffect(() => {
    const currentIndex = activeScreenIndex + 1;
    const totalScreens = screens.length;
    const progressValue = (currentIndex / totalScreens) * 100;
    setProgress(progressValue);
  }, [activeScreenIndex, screens]);

  // Handle selecting a field to add/configure
  const handleFieldSelect = (field) => {
    setSelectedField(field);
  };

  // Handle saving the configured field
  const handleSaveField = (fieldAttributes) => {
    const updatedScreens = [...screens];
    updatedScreens[activeScreenIndex].fields.push({
      ...selectedField,
      attributes: fieldAttributes,
    });
    setScreens(updatedScreens);
    setSelectedField(null); // Reset to "Add Field" view
  };

  // Dynamic font loading
  const fontLink = `https://fonts.googleapis.com/css2?family=${globalSettings.font?.replace(
    " ",
    "+"
  )}&display=swap`;

  return (
    <Layout>
      {/* Dynamic Font */}
      <Head>
        <link rel="stylesheet" href={fontLink} />
        <style>
          {`
            body {
              font-family: '${globalSettings.font || "Arial"}', sans-serif;
            }
          `}
        </style>
      </Head>

      <Flex direction="column" minHeight="100vh">
        {/* Header */}
        <Box bg="primary.300" color="text.primary" p={4}>
          <Flex alignItems="center" justifyContent="space-around">
            <Flex alignItems="center">
              {globalSettings.logoURL && (
                <Box mr={4}>
                  <img
                    src={globalSettings.logoURL}
                    alt="Logo"
                    style={{ height: "40px" }}
                  />
                </Box>
              )}
              <Heading minW="400px" mr={12} size="lg">Data Collection</Heading>
            </Flex>

            {/* Data Collection Radio Button */}
            <FormControl as="fieldset" display="flex" alignItems="center">
              <RadioGroup
                value={dataCollectionEnabled ? "enable" : "disable"}
                onChange={(value) => setDataCollectionEnabled(value === "enable")}
              >
                <HStack spacing="24px">
                  <Radio value="enable">Enable</Radio>
                  <Radio value="disable">Disable</Radio>
                </HStack>
              </RadioGroup>
            </FormControl>
          </Flex>
        </Box>

        {/* Progress Bar */}
        {globalSettings.progressBar && (
          <Progress
            value={progress}
            size="sm"
            colorScheme="primary"
            hasStripe
            isAnimated
          />
        )}

        {/* Screen Settings */}
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
                      value={screens[activeScreenIndex].heading}
                      onChange={(e) => {
                        const updatedScreens = [...screens];
                        updatedScreens[activeScreenIndex].heading = e.target.value;
                        setScreens(updatedScreens);
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
                        bg={
                          screens[activeScreenIndex].backgroundColor ||
                          globalSettings.backgroundColor ||
                          "background.dark"
                        }
                        color="text.primary"
                        p={2}
                        borderRadius="md"
                        cursor="pointer"
                      >
                        {screens[activeScreenIndex].backgroundColor || "Select Color"}
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
                            color={
                              screens[activeScreenIndex].backgroundColor ||
                              globalSettings.backgroundColor ||
                              "#ffffff"
                            }
                            onChangeComplete={(color) => {
                              const updatedScreens = [...screens];
                              updatedScreens[activeScreenIndex].backgroundColor =
                                color.hex;
                              setScreens(updatedScreens);
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
                      value={screens[activeScreenIndex].continueButtonText || ""}
                      onChange={(e) => {
                        const updatedScreens = [...screens];
                        updatedScreens[activeScreenIndex].continueButtonText =
                          e.target.value;
                        setScreens(updatedScreens);
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

        {/* Main Content */}
        <Flex flex="1">
          {/* Canvas on the left with full width */}
          <Box flex="1" p={4} border="1px solid" borderColor="gray.300" m={4}>
            <Canvas
              screens={screens}
              activeScreenIndex={activeScreenIndex}
              globalSettings={globalSettings}
            />
          </Box>

          {/* Field Sidebar on the right */}
          <FieldSidebar
            selectedField={selectedField}
            onFieldSelect={handleFieldSelect}
            onSaveField={handleSaveField}
            onCancel={() => setSelectedField(null)}
          />
        </Flex>

        {/* Bottom Tabs */}
        <BottomTabs
          screens={screens}
          setScreens={setScreens}
          activeScreenIndex={activeScreenIndex}
          setActiveScreenIndex={setActiveScreenIndex}
        />

        {/* Disclaimer */}
        {globalSettings.disclaimer && (
          <Box
            p={4}
            bg="background.dark"
            color="text.secondary"
            textAlign="center"
          >
            {globalSettings.disclaimer}
          </Box>
        )}
      </Flex>
    </Layout>
  );
};

export default FormBuilderPage;