import {
  Box,
  Input,
  Select,
  Textarea,
  FormControl,
  FormLabel,
  VStack,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
  Button,
  HStack,
  Flex,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { usePartnerStore } from "../store";

const GlobalCustomization = () => {
  const partnerDraft = usePartnerStore((state) => state.partnerDraft);
  const partnerData = usePartnerStore((state) => state.partnerData);
  const updatePartnerDraft = usePartnerStore((state) => state.updatePartnerDraft);
  const savePartnerDraft = usePartnerStore((state) => state.savePartnerDraft);
  const discardPartnerDraft = usePartnerStore((state) => state.discardPartnerDraft);

  const config = partnerDraft?.config || {};

  const [logoLink, setLogoLink] = useState("");
  const [logoWidth, setLogoWidth] = useState("");
  const [logoHeight, setLogoHeight] = useState("");
  const [logoAlignment, setLogoAlignment] = useState("center");
  const [footerText, setFooterText] = useState("");
  const [layoutPercentage, setLayoutPercentage] = useState(60);
  const [fontFamily, setFontFamily] = useState("");

  useEffect(() => {
    if (partnerDraft && partnerDraft.config) {
      const config = partnerDraft.config;

      setLogoLink(config.header_config?.logo_link || "");
      setLogoWidth(config.header_config?.logo_width || "");
      setLogoHeight(config.header_config?.logo_height || "");
      setLogoAlignment(config.header_config?.logo_alignment || "center");
      setFooterText(config.footer_config?.footer_text || "");
      setLayoutPercentage(config.layout_config?.layout_percentage || 60);
      setFontFamily(config.global_config?.font_family || "Arial");
    }
  }, [partnerData]);

  const hasUnsavedChanges = JSON.stringify(partnerData) !== JSON.stringify(partnerDraft);

  return (
    <Box p={8} bg="black" minHeight="100vh">
      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Heading>Global Customization</Heading>
        {hasUnsavedChanges && (
          <HStack spacing={4}>
            <Button colorScheme="green" onClick={() => savePartnerDraft(false)}>
              Save
            </Button>
            <Button colorScheme="blue" onClick={() => savePartnerDraft(true)}>
              Save as New Version
            </Button>
            <Button colorScheme="red" onClick={discardPartnerDraft}>
              Discard
            </Button>
          </HStack>
        )}
      </Flex>

      <Box bg="black" p={6} rounded="md" shadow="md">
        <Accordion allowMultiple>
          {/* Global Settings */}
          <AccordionItem size="lg">
            <AccordionButton>
              <Box flex="1" textAlign="left" fontWeight="bold">
                Global Settings
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <VStack spacing={4} align="stretch">
                <FormControl>
                  <FormLabel>Font Family</FormLabel>
                  <Select
                    value={fontFamily}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFontFamily(value);
                      updatePartnerDraft({
                        config: {
                          global_config: {
                            ...config.global_config,
                            font_family: value,
                          },
                        },
                      });
                    }}
                  >
                    <option value="Arial">Arial</option>
                    <option value="Roboto">Roboto</option>
                    <option value="Open Sans">Open Sans</option>
                    <option value="Lato">Lato</option>
                    <option value="Montserrat">Montserrat</option>
                  </Select>
                </FormControl>
              </VStack>
            </AccordionPanel>
          </AccordionItem>

          {/* Header Config */}
          <AccordionItem mt={4}>
            <AccordionButton>
              <Box flex="1" textAlign="left" fontWeight="bold">
                Header Configuration
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <VStack spacing={4} align="stretch">
                <FormControl>
                  <FormLabel>Logo Link (URL)</FormLabel>
                  <Input
                    type="text"
                    value={logoLink}
                    onChange={(e) => {
                      const value = e.target.value;
                      setLogoLink(value);
                      updatePartnerDraft({
                        config: {
                          header_config: {
                            ...config.header_config,
                            logo_link: value,
                          },
                        },
                      });
                    }}
                  />
                </FormControl>
                <HStack spacing={4}>
                  <FormControl>
                    <FormLabel>Logo Width (px)</FormLabel>
                    <Input
                      type="number"
                      value={logoWidth}
                      onChange={(e) => {
                        const value = e.target.value;
                        setLogoWidth(value);
                        updatePartnerDraft({
                          config: {
                            header_config: {
                              ...config.header_config,
                              logo_width: value,
                            },
                          },
                        });
                      }}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Logo Height (px)</FormLabel>
                    <Input
                      type="number"
                      value={logoHeight}
                      onChange={(e) => {
                        const value = e.target.value;
                        setLogoHeight(value);
                        updatePartnerDraft({
                          config: {
                            header_config: {
                              ...config.header_config,
                              logo_height: value,
                            },
                          },
                        });
                      }}
                    />
                  </FormControl>
                </HStack>
                <FormControl>
                  <FormLabel>Logo Alignment</FormLabel>
                  <Select
                    value={logoAlignment}
                    onChange={(e) => {
                      const value = e.target.value;
                      setLogoAlignment(value);
                      updatePartnerDraft({
                        config: {
                          header_config: {
                            ...config.header_config,
                            logo_alignment: value,
                          },
                        },
                      });
                    }}
                  >
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                  </Select>
                </FormControl>
              </VStack>
            </AccordionPanel>
          </AccordionItem>

          {/* Footer Config */}
          <AccordionItem mt={4}>
            <AccordionButton>
              <Box flex="1" textAlign="left" fontWeight="bold">
                Footer Configuration
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <FormControl>
                <FormLabel>Footer Text (HTML)</FormLabel>
                <Textarea
                  value={footerText}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFooterText(value);
                    updatePartnerDraft({
                      config: {
                        footer_config: {
                          ...config.footer_config,
                          footer_text: value,
                        },
                      },
                    });
                  }}
                  placeholder="Enter footer HTML"
                />
              </FormControl>
            </AccordionPanel>
          </AccordionItem>

          {/* Layout Config */}
          <AccordionItem mt={4}>
            <AccordionButton>
              <Box flex="1" textAlign="left" fontWeight="bold">
                Layout Configuration
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <FormControl>
                <FormLabel>Layout Width (%)</FormLabel>
                <Slider
                  value={layoutPercentage}
                  min={60}
                  max={90}
                  step={10}
                  onChange={(val) => {
                    setLayoutPercentage(val);
                    updatePartnerDraft({
                      config: {
                        layout_config: {
                          ...config.layout_config,
                          layout_percentage: val,
                        },
                      },
                    });
                  }}
                >
                  <SliderTrack bg="gray.200">
                    <SliderFilledTrack bg="blue.500" />
                  </SliderTrack>
                  <SliderThumb boxSize={6}>
                    <Box color="blue.500" />
                  </SliderThumb>
                </Slider>
                <Text mt={2}>{layoutPercentage}%</Text>
              </FormControl>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    </Box>
  );
};

export default GlobalCustomization;