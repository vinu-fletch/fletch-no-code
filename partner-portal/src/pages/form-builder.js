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
  useDisclosure,
} from "@chakra-ui/react";
import FieldSidebar from "../components/FieldSidebar";
import Canvas from "../components/Canvas";
import BottomTabs from "../components/BottomTabs";
import Layout from "../components/Layout";
import { ChromePicker } from "react-color";
import Head from "next/head";
import { usePartnerStore } from "../store";
import {ConfirmationModal} from "../components/modal/ConfirmationModal";

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
  const [selectedField, setSelectedField] = useState(null);
  const [dataCollectionEnabled, setDataCollectionEnabled] = useState(true);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const partnerData = usePartnerStore((state) => state.partnerData);
  const updateCategoryStatus = usePartnerStore(
    (state) => state.updateCategoryStatus
  );

  const dataCollectionCategory = partnerData?.categories?.find(
    (category) => category.name === "Data Collection"
  );

  useEffect(() => {
    const currentIndex = activeScreenIndex + 1;
    const totalScreens = screens.length;
    const progressValue = (currentIndex / totalScreens) * 100;
    setProgress(progressValue);
  }, [activeScreenIndex, screens]);

  useEffect(() => {
    if (dataCollectionCategory) {
      setDataCollectionEnabled(dataCollectionCategory.is_active);
    }
  }, [dataCollectionCategory]);

  const handleFieldSelect = (field) => {
    setSelectedField(field);
  };

  const handleSaveField = (fieldAttributes) => {
    const updatedScreens = [...screens];
    updatedScreens[activeScreenIndex].fields.push({
      ...selectedField,
      attributes: fieldAttributes,
    });
    setScreens(updatedScreens);
    setSelectedField(null);
  };

  const fontLink = `https://fonts.googleapis.com/css2?family=${globalSettings.font?.replace(
    " ",
    "+"
  )}&display=swap`;

  const handleDataCollectionToggle = (value) => {
    const newValue = value === "enable";
    if (newValue !== dataCollectionEnabled) {
      onOpen();
    }
  };

  const confirmToggleDataCollection = () => {
    updateCategoryStatus(partnerData.id,"Data Collection", !dataCollectionEnabled);
    setDataCollectionEnabled(!dataCollectionEnabled);
    onClose();
  };

  return (
    <Layout>
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

        {globalSettings.progressBar && (
          <Progress
            value={progress}
            size="sm"
            colorScheme="primary"
            hasStripe
            isAnimated
          />
        )}

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

        <Flex flex="1">
          <Box flex="1" p={4} border="1px solid" borderColor="gray.300" m={4}>
            <Canvas
              screens={screens}
              activeScreenIndex={activeScreenIndex}
              globalSettings={globalSettings}
            />
          </Box>

          <FieldSidebar
            selectedField={selectedField}
            onFieldSelect={handleFieldSelect}
            onSaveField={handleSaveField}
            onCancel={() => setSelectedField(null)}
          />
        </Flex>

        <BottomTabs
          screens={screens}
          setScreens={setScreens}
          activeScreenIndex={activeScreenIndex}
          setActiveScreenIndex={setActiveScreenIndex}
        />

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

      <ConfirmationModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={confirmToggleDataCollection}
        title="Confirm Action"
        description={`Are you sure you want to ${
          dataCollectionEnabled ? "disable" : "enable"
        } Data Collection?`}
      />
    </Layout>
  );
};

export default FormBuilderPage;