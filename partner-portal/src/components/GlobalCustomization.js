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
import { ChromePicker } from "react-color";

const GlobalCustomization = () => {
  const partnerDraft = usePartnerStore((state) => state.partnerDraft);
  const partnerData = usePartnerStore((state) => state.partnerData);
  const updatePartnerDraft = usePartnerStore((state) => state.updatePartnerDraft);
  const savePartnerDraft = usePartnerStore((state) => state.savePartnerDraft);
  const discardPartnerDraft = usePartnerStore((state) => state.discardPartnerDraft);

  const config = partnerDraft?.config || {};

  // Existing field states
  const [logoLink, setLogoLink] = useState("");
  const [logoWidth, setLogoWidth] = useState("");
  const [logoHeight, setLogoHeight] = useState("");
  const [logoAlignment, setLogoAlignment] = useState("center");
  const [footerText, setFooterText] = useState("");
  const [layoutPercentage, setLayoutPercentage] = useState(60);
  const [fontFamily, setFontFamily] = useState("Arial");

  // New fields
  const [formCompletionHeading, setFormCompletionHeading] = useState("");
  const [formCompletionParagraph, setFormCompletionParagraph] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#333");
  const [secondaryColor, setSecondaryColor] = useState("#555");
  const [bgColor, setBgColor] = useState("#fff");
  const [secondaryBgColor, setSecondaryBgColor] = useState("#f5f5f5");
  const [textPrimaryColor, setTextPrimaryColor] = useState("#000");
  const [textSecondaryColor, setTextSecondaryColor] = useState("#666");
  const [showColorPicker, setShowColorPicker] = useState({
    primaryColor: false,
    secondaryColor: false,
    bgColor: false,
    secondaryBgColor: false,
    textPrimaryColor: false,
    textSecondaryColor: false,
  });
  const [spacingBetweenFields, setSpacingBetweenFields] = useState(4);
  const [isResponsive, setIsResponsive] = useState(true);

  useEffect(() => {
    if (partnerDraft && partnerDraft.config) {
      const config = partnerDraft.config;

      // Load existing config
      setLogoLink(config.header_config?.logo_link || "");
      setLogoWidth(config.header_config?.logo_width || "");
      setLogoHeight(config.header_config?.logo_height || "");
      setLogoAlignment(config.header_config?.logo_alignment || "center");
      setFooterText(config.footer_config?.footer_text || "");
      setLayoutPercentage(config.layout_config?.layout_percentage || 60);
      setFontFamily(config.global_config?.font_family || "Arial");

      // Load new fields
      setFormCompletionHeading(config.global_config?.form_completion_heading || "");
      setFormCompletionParagraph(config.global_config?.form_completion_paragraph || "");
      setPrimaryColor(config.global_config?.primary_color || "#333");
      setSecondaryColor(config.global_config?.secondary_color || "#555");
      setBgColor(config.global_config?.background_color || "#fff");
      setSecondaryBgColor(config.global_config?.secondary_background_color || "#f5f5f5");
      setTextPrimaryColor(config.global_config?.text_primary_color || "#000");
      setTextSecondaryColor(config.global_config?.text_secondary_color || "#666");
    }

    // Close color pickers when clicking outside
    const handleClickOutside = (event) => {
      if (!event.target.closest(".color-picker")) {
        setShowColorPicker({
          primaryColor: false,
          secondaryColor: false,
          bgColor: false,
          secondaryBgColor: false,
          textPrimaryColor: false,
          textSecondaryColor: false,
        });
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [partnerData]);

  const handleColorChange = (color, setColor, configKey) => {
  setColor(color.hex);
  updatePartnerDraft({
    config: {
      global_config: {
        ...config.global_config,
        [configKey]: color.hex,
      },
    },
  });
};

  const toggleColorPicker = (key) => {
    setShowColorPicker((prev) => ({ ...prev, [key]: !prev[key] }));
  };

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
          <AccordionItem isExpanded={true}>
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

                <HStack spacing={4}>
                  {[
                    { label: "Primary Color", color: primaryColor, key: "primary_color", setColor: setPrimaryColor },
                    { label: "Secondary Color", color: secondaryColor, key: "secondary_color", setColor: setSecondaryColor },
                    { label: "Primary Background Color", color: bgColor, key: "background_color", setColor: setBgColor },
                    { label: "Secondary Background Color", color: secondaryBgColor, key: "secondary_background_color", setColor: setSecondaryBgColor },
                    { label: "Text Primary Color", color: textPrimaryColor, key: "text_primary_color", setColor: setTextPrimaryColor },
                    { label: "Text Secondary Color", color: textSecondaryColor, key: "text_secondary_color", setColor: setTextSecondaryColor },
                  ].map(({ label, color, key, setColor }) => (
                    <Box key={key}>
                      <FormLabel>{label}</FormLabel>
                      <Box
                        className="color-picker"
                        bg={color}
                        width="24px"
                        height="24px"
                        borderRadius="50%"
                        cursor="pointer"
                        onClick={() => toggleColorPicker(key)}
                      />
                      {showColorPicker[key] && (
                        <ChromePicker
                          id={key}
                          className="color-picker"
                          color={color}
                          onChange={(updatedColor) => handleColorChange(updatedColor, setColor, key)}
                          onClose={() => toggleColorPicker(key)}
                        />
                      )}
                    </Box>
                  ))}
                </HStack>

                {/* Form Completion Message */}
                <FormControl>
                  <FormLabel>Form Completion Heading</FormLabel>
                  <Input
                    value={formCompletionHeading}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFormCompletionHeading(value);
                      updatePartnerDraft({
                        config: {
                          global_config: {
                            ...config.global_config,
                            form_completion_heading: value,
                          },
                        },
                      });
                    }}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Form Completion Paragraph</FormLabel>
                  <Textarea
                    value={formCompletionParagraph}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFormCompletionParagraph(value);
                      updatePartnerDraft({
                        config: {
                          global_config: {
                            ...config.global_config,
                            form_completion_paragraph: value,
                          },
                        },
                      });
                    }}
                  />
                </FormControl>
              </VStack>
            </AccordionPanel>
          </AccordionItem>

          {/* Header Configuration */}
          <AccordionItem>
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

          {/* Footer Configuration */}
          <AccordionItem>
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
                      }
                      });
                      
                  }}
                />
              </FormControl>
            </AccordionPanel>
          </AccordionItem>

          {/* Layout Configuration */}
          <AccordionItem>
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
                      }
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

              <FormControl mt={4}>
                <FormLabel>Spacing Between Fields</FormLabel>
                <Select
                  value={spacingBetweenFields}
                  onChange={(e) => {
                    const value = parseInt(e.target.value, 10);
                    setSpacingBetweenFields(value);
                    updatePartnerDraft({
                      config: {
                        layout_config: {
                          ...config.layout_config,
                          spacing_between_fields: value,
                        },
                      }
                      });
                  }}
                >
                  <option value={4}>Small</option>
                  <option value={8}>Medium</option>
                  <option value={12}>Large</option>
                </Select>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Mobile Responsiveness</FormLabel>
                <Select
                  value={isResponsive ? "responsive" : "fixed"}
                  onChange={(e) => {
                    const value = e.target.value === "responsive";
                    setIsResponsive(value);
                    updatePartnerDraft({
                      config: {
                        layout_config: {
                          ...config.layout_config,
                          mobile_responsiveness: value,
                        },
                      }
                      });
                  }}
                >
                  <option value="responsive">Responsive (Stacked)</option>
                  <option value="fixed">Fixed Layout (Side-by-Side)</option>
                </Select>
              </FormControl>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    </Box>
  );
};

export default GlobalCustomization;