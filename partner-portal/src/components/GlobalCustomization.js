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
import { Preview } from "./preview/preview";

const GlobalCustomization = () => {
  const partnerDraft = usePartnerStore((state) => state.partnerDraft);
  const partnerData = usePartnerStore((state) => state.partnerData);
  const updatePartnerDraft = usePartnerStore(
    (state) => state.updatePartnerDraft
  );
  const savePartnerDraft = usePartnerStore((state) => state.savePartnerDraft);
  const discardPartnerDraft = usePartnerStore(
    (state) => state.discardPartnerDraft
  );

  const config = partnerDraft?.config || {};

  const [logoURL, setLogoURL] = useState("");
  const [logoWidth, setLogoWidth] = useState("");
  const [logoHeight, setLogoHeight] = useState("");
  const [logoAlignment, setLogoAlignment] = useState("center");
  const [headerBackgroundColor, setHeaderBackgroundColor] = useState("#fff");

  const [footerText, setFooterText] = useState("");
  const [footerFontColor, setFooterFontColor] = useState("#000");
  const [footerFontSize, setFooterFontSize] = useState("16px");
  const [footerFontWeight, setFooterFontWeight] = useState("400");
  const [footerBackgroundColor, setFooterBackgroundColor] = useState("#000");

  const [layoutPercentage, setLayoutPercentage] = useState(60);
  const [fontFamily, setFontFamily] = useState("Arial");

  const [isPreviewOpen, setPreviewOpen] = useState(false);

  const [formCompletionParagraph, setFormCompletionParagraph] = useState("");

  const [primaryColor, setPrimaryColor] = useState("#333");
  const [secondaryColor, setSecondaryColor] = useState("#555");
  const [backgroundColor, setBackgroundColor] = useState("#fff");
  const [primaryTextColor, setPrimaryTextColor] = useState("#000");
  const [secondaryTextColor, setSecondaryTextColor] = useState("#666");
  const [buttonPrimaryColor, setButtonPrimaryColor] = useState("#007bff");
  const [buttonSecondaryColor, setButtonSecondaryColor] = useState("#6c757d");
  const [buttonTextColor, setButtonTextColor] = useState("#000");
  const [fieldPlaceholderColor, setFieldPlaceholderColor] = useState("#ced4da");
  const [fieldBorderColor, setFieldBorderColor] = useState("#ced4da");
  const [fieldErrorColor, setFieldErrorColor] = useState("#ff0000");
  const [sectionHeadingColor, setSectionHeadingColor] = useState("#000");
  const [primaryFontSize, setPrimaryFontSize] = useState("16px");
  const [primaryFontWeight, setPrimaryFontWeight] = useState("400");
  const [buttonFontSize, setButtonFontSize] = useState("16px");
  const [buttonFontWeight, setButtonFontWeight] = useState("400");
  const [buttonBorderRadius, setButtonBorderRadius] = useState("20px");
  const [sectionHeading, setSectionHeading] = useState("");
  const [sectionHeadingFontWeight, setSectionHeadingFontWeight] =
    useState("500");
  const [sectionHeadingFontSize, setSectionHeadingFontSize] = useState("20px");
  const [formParagraph, setFormParagraph] = useState("");

  const [showColorPicker, setShowColorPicker] = useState({
    primaryColor: false,
    secondaryColor: false,
    bgColor: false,
    secondaryBgColor: false,
    textPrimaryColor: false,
    textSecondaryColor: false,
  });
  const [spacingBetweenFields, setSpacingBetweenFields] = useState("medium");
  const [paddingInsideFields, setPaddingInsideFields] = useState("medium");
  const [buttonPadding, setButtonPadding] = useState("medium");
  const [isResponsive, setIsResponsive] = useState(true);

  useEffect(() => {
    if (partnerDraft && partnerDraft.config) {
      const config = partnerDraft.config;

      setLogoURL(config.header_config?.logo_url || "");
      setLogoWidth(config.header_config?.logo_width || "");
      setLogoHeight(config.header_config?.logo_height || "");
      setLogoAlignment(config.header_config?.logo_alignment || "center");
      setHeaderBackgroundColor(
        config.header_config?.header_background_color || "#fff"
      );

      setFooterText(config.footer_config?.footer_text || "");
      setFooterFontColor(config.footer_config?.footer_font_color || "#000");
      setFooterFontSize(config.footer_config?.footer_font_size || "16px");
      setFooterFontWeight(config.footer_config?.footer_font_weight || "400");
      setFooterBackgroundColor(
        config.footer_config?.footer_background_color || "#fff"
      );

      setLayoutPercentage(config.layout_config?.layout_percentage || 60);
      setFontFamily(config.global_config?.font_family || "Arial");

      setPrimaryColor(config.global_config?.primary_color || "#333");
      setSecondaryColor(config.global_config?.secondary_color || "#555");
      setBackgroundColor(config.global_config?.background_color || "#fff");
      setPrimaryTextColor(
        config.global_config?.primary_text_color || "#f5f5f5"
      );
      setSecondaryTextColor(
        config.global_config?.secndary_text_color || "#f5f5f5"
      );

      setButtonPrimaryColor(
        config.global_config?.button_primary_color || "#000"
      );
      setButtonSecondaryColor(
        config.global_config?.button_secondary_color || "#666"
      );
      setButtonTextColor(config.global_config?.button_text_color || "#999");
      setFieldPlaceholderColor(
        config.global_config?.field_placeholder_color || "#ff0000"
      );
      setFieldBorderColor(
        config.global_config?.field_border_color || "#007bff"
      );
      setFieldErrorColor(config.global_config?.field_error_color || "#6c757d");
      setSectionHeadingColor(
        config.global_config?.section_heading_color || "#ced4da"
      );

      setPrimaryFontSize(config.global_config?.primary_font_size || "16px");
      setPrimaryFontWeight(config.global_config?.primary_font_weight || "400");
      setButtonFontSize(config.global_config?.button_font_size || "16px");
      setButtonFontWeight(config.global_config?.button_font_weight || "400");
      setButtonBorderRadius(
        config.global_config?.button_border_radius || "20px"
      );
      setSectionHeading(config.global_config?.section_heading || "");
      setSectionHeadingFontSize(
        config.global_config?.section_heading_font_size || "20px"
      );
      setSectionHeadingFontWeight(
        config.global_config?.section_heading_font_weight || "500"
      );
      setFormParagraph(config.global_config?.form_paragraph || "");

      setSpacingBetweenFields(
        config.layout_config?.margin_between_fields || "medium"
      );
      setPaddingInsideFields(
        config.layout_config?.padding_inside_fields || "medium"
      );
      setButtonPadding(config.layout_config?.button_padding || "medium");
      setIsResponsive(config.layout_config?.mobile_responsiveness || true);
    }

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

  const hasUnsavedChanges =
    JSON.stringify(partnerData) !== JSON.stringify(partnerDraft);

  return (
    <Box p={8} bg="black" minHeight="100vh">
      <Flex justifyContent="start" alignItems="center" mb={6}>
        <Heading mr={8}>Global Customization</Heading>
        <HStack spacing={4}>
          <Button colorScheme="yellow" onClick={() => setPreviewOpen(true)}>
            Preview
          </Button>
          {hasUnsavedChanges && (
            <>
              <Button
                colorScheme="green"
                onClick={() => savePartnerDraft(false)}
              >
                Save
              </Button>
              <Button colorScheme="blue" onClick={() => savePartnerDraft(true)}>
                Save as New Version
              </Button>
              <Button colorScheme="red" onClick={discardPartnerDraft}>
                Discard
              </Button>
            </>
          )}
        </HStack>
      </Flex>

      <Box bg="black" p={6} rounded="md" shadow="md">
        <Accordion defaultIndex={[0]} allowMultiple>
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

                <HStack flexWrap={"wrap"} spacing={4}>
                  {[
                    {
                      label: "Primary Color",
                      color: primaryColor,
                      key: "primary_color",
                      setColor: setPrimaryColor,
                    },
                    {
                      label: "Secondary Color",
                      color: secondaryColor,
                      key: "secondary_color",
                      setColor: setSecondaryColor,
                    },
                    {
                      label: "Background Color",
                      color: backgroundColor,
                      key: "background_color",
                      setColor: setBackgroundColor,
                    },
                    {
                      label: "Primary Text Color",
                      color: primaryTextColor,
                      key: "primary_text_color",
                      setColor: setPrimaryTextColor,
                    },
                    {
                      label: "Secondary Text Color",
                      color: secondaryTextColor,
                      key: "secondary_text_color",
                      setColor: setSecondaryTextColor,
                    },
                    {
                      label: "Button Primary Color",
                      color: buttonPrimaryColor,
                      key: "button_primary_color",
                      setColor: setButtonPrimaryColor,
                    },
                    {
                      label: "Button Secondary Color",
                      color: buttonSecondaryColor,
                      key: "button_secondary_color",
                      setColor: setButtonSecondaryColor,
                    },
                    {
                      label: "Button Text Color",
                      color: buttonTextColor,
                      key: "button_text_color",
                      setColor: setButtonTextColor,
                    },
                    {
                      label: "Field Placeholder Color",
                      color: fieldPlaceholderColor,
                      key: "field_placeholder_color",
                      setColor: setFieldPlaceholderColor,
                    },
                    {
                      label: "Field Border Color",
                      color: fieldBorderColor,
                      key: "field_border_color",
                      setColor: setFieldBorderColor,
                    },
                    {
                      label: "Field Error Color",
                      color: fieldErrorColor,
                      key: "field_error_color",
                      setColor: setFieldErrorColor,
                    },
                    {
                      label: "Section Heading Color",
                      color: sectionHeadingColor,
                      key: "section_heading_color",
                      setColor: setSectionHeadingColor,
                    },
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
                          onChange={(updatedColor) =>
                            handleColorChange(updatedColor, setColor, key)
                          }
                          onClose={() => toggleColorPicker(key)}
                        />
                      )}
                    </Box>
                  ))}
                </HStack>

                {/* Form Completion Message */}
                <FormControl>
                  <FormLabel>Primary Font Size</FormLabel>
                  <Input
                    value={primaryFontSize}
                    onChange={(e) => {
                      const value = e.target.value;
                      setPrimaryFontSize(value);
                      updatePartnerDraft({
                        config: {
                          global_config: {
                            ...config.global_config,
                            primary_font_size: value,
                          },
                        },
                      });
                    }}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Primary Font Weight</FormLabel>
                  <Input
                    value={primaryFontWeight}
                    onChange={(e) => {
                      const value = e.target.value;
                      setPrimaryFontWeight(value);
                      updatePartnerDraft({
                        config: {
                          global_config: {
                            ...config.global_config,
                            primary_font_weight: value,
                          },
                        },
                      });
                    }}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Button Font Size</FormLabel>
                  <Input
                    value={buttonFontSize}
                    onChange={(e) => {
                      const value = e.target.value;
                      setButtonFontSize(value);
                      updatePartnerDraft({
                        config: {
                          global_config: {
                            ...config.global_config,
                            button_font_size: value,
                          },
                        },
                      });
                    }}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Button Font Weight</FormLabel>
                  <Input
                    value={buttonFontWeight}
                    onChange={(e) => {
                      const value = e.target.value;
                      setButtonFontWeight(value);
                      updatePartnerDraft({
                        config: {
                          global_config: {
                            ...config.global_config,
                            button_font_weight: value,
                          },
                        },
                      });
                    }}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Button Border Radius</FormLabel>
                  <Input
                    value={buttonBorderRadius}
                    onChange={(e) => {
                      const value = e.target.value;
                      setButtonBorderRadius(value);
                      updatePartnerDraft({
                        config: {
                          global_config: {
                            ...config.global_config,
                            button_border_radius: value,
                          },
                        },
                      });
                    }}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Section Heading</FormLabel>
                  <Input
                    value={sectionHeading}
                    onChange={(e) => {
                      const value = e.target.value;
                      setSectionHeading(value);
                      updatePartnerDraft({
                        config: {
                          global_config: {
                            ...config.global_config,
                            section_heading: value,
                          },
                        },
                      });
                    }}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Section Heading Font Size</FormLabel>
                  <Input
                    value={sectionHeadingFontSize}
                    onChange={(e) => {
                      const value = e.target.value;
                      setSectionHeadingFontSize(value);
                      updatePartnerDraft({
                        config: {
                          global_config: {
                            ...config.global_config,
                            section_heading_font_size: value,
                          },
                        },
                      });
                    }}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Section Heading Font Weight</FormLabel>
                  <Input
                    value={sectionHeadingFontWeight}
                    onChange={(e) => {
                      const value = e.target.value;
                      setSectionHeadingFontWeight(value);
                      updatePartnerDraft({
                        config: {
                          global_config: {
                            ...config.global_config,
                            section_heading_font_weight: value,
                          },
                        },
                      });
                    }}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Form Paragraph</FormLabel>
                  <Textarea
                    value={formParagraph}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFormParagraph(value);
                      updatePartnerDraft({
                        config: {
                          global_config: {
                            ...config.global_config,
                            form_paragraph: value,
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
                    value={logoURL}
                    onChange={(e) => {
                      const value = e.target.value;
                      setLogoURL(value);
                      updatePartnerDraft({
                        config: {
                          header_config: {
                            ...config.header_config,
                            logo_url: value,
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
                <HStack flexWrap={"wrap"} spacing={4}>
                  {[
                    {
                      label: "Header Background Color",
                      color: headerBackgroundColor,
                      key: "header_background_color",
                      setColor: setHeaderBackgroundColor,
                    },
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
                          onChange={(updatedColor) =>
                            handleColorChange(updatedColor, setColor, key)
                          }
                          onClose={() => toggleColorPicker(key)}
                        />
                      )}
                    </Box>
                  ))}
                </HStack>
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
                      },
                    });
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Footer Font Size</FormLabel>
                <Input
                  value={footerFontSize}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFooterFontSize(value);
                    updatePartnerDraft({
                      config: {
                        global_config: {
                          ...config.global_config,
                          footer_font_size: value,
                        },
                      },
                    });
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Footer Font Weight</FormLabel>
                <Input
                  value={footerFontWeight}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFooterFontWeight(value);
                    updatePartnerDraft({
                      config: {
                        global_config: {
                          ...config.global_config,
                          footer_font_weight: value,
                        },
                      },
                    });
                  }}
                />
              </FormControl>
              <HStack flexWrap={"wrap"} spacing={4}>
                {[
                  {
                    label: "Footer Font Color",
                    color: footerFontColor,
                    key: "footer_font_color",
                    setColor: setFooterFontColor,
                  },
                  {
                    label: "Footer Background Color",
                    color: footerBackgroundColor,
                    key: "footer_background_color",
                    setColor: setFooterBackgroundColor,
                  },
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
                        onChange={(updatedColor) =>
                          handleColorChange(updatedColor, setColor, key)
                        }
                        onClose={() => toggleColorPicker(key)}
                      />
                    )}
                  </Box>
                ))}
              </HStack>
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

              <FormControl mt={4}>
                <FormLabel>Margin Between Fields</FormLabel>
                <Select
                  value={spacingBetweenFields}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSpacingBetweenFields(value);
                    updatePartnerDraft({
                      config: {
                        layout_config: {
                          ...config.layout_config,
                          margin_between_fields: value,
                        },
                      },
                    });
                  }}
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </Select>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Padding inside Fields</FormLabel>
                <Select
                  value={paddingInsideFields}
                  onChange={(e) => {
                    const value = e.target.value;
                    setPaddingInsideFields(value);
                    updatePartnerDraft({
                      config: {
                        layout_config: {
                          ...config.layout_config,
                          padding_inside_fields: value,
                        },
                      },
                    });
                  }}
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </Select>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Button Padding</FormLabel>
                <Select
                  value={buttonPadding}
                  onChange={(e) => {
                    const value = e.target.value;
                    setButtonPadding(value);
                    updatePartnerDraft({
                      config: {
                        layout_config: {
                          ...config.layout_config,
                          button_padding: value,
                        },
                      },
                    });
                  }}
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
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
                      },
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
      {/* Prevents overriding of theme */}
      {isPreviewOpen && (
        <Preview isOpen={isPreviewOpen} onClose={() => setPreviewOpen(false)} />
      )}
    </Box>
  );
};

export default GlobalCustomization;
