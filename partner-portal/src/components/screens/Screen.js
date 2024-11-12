// screens/Screen.js

import React from "react";
import { Box, Text, VStack, Flex } from "@chakra-ui/react";
import Button from "@/common-ui/button/button";
import Pincode from "@/common-ui/pincode/pincode";

// Map screen settings font sizes to Chakra UI font sizes
const fontSizeMapping = {
  small: "md",
  medium: "lg",
  large: "2xl",
};

const Screen = ({ screen, globalConfig, onContinue, onBack, isFirstScreen, isLastScreen }) => {
  const screenConfig = screen?.screen_config || {};

  // Extract heading, description, and other screen configurations with fallbacks
  const heading = screenConfig.heading || globalConfig.default_heading || "Default Heading";
  const headingColor = screenConfig.heading_color || globalConfig.primary_color || "#000";
  const description = screenConfig.description || globalConfig.default_description || "Default description";
  const descriptionColor = screenConfig.description_color || globalConfig.secondary_color || "#666";
  const continueButtonText = screenConfig.continue_button_text || "Continue";

  // Map font size and weight from screen settings or fallback to global config
  const headingFontSize = fontSizeMapping[screenConfig.heading_font_size] || globalConfig.default_heading_font_size || "2xl";
  const headingFontWeight = screenConfig.heading_font_weight || globalConfig.default_heading_font_weight || "bold";
  const descriptionFontSize = fontSizeMapping[screenConfig.description_font_size] || globalConfig.default_description_font_size || "md";

  // Placeholder validation function
  const validateFields = () => {
    return true;
  };

  // Handle continue button click with validation
  const handleContinue = () => {
    if (validateFields()) {
      onContinue();
    } else {
      console.log("Validation failed. Please correct the errors.");
    }
  };

  console.log("Screen fields", screen?.fields);

  return (
    <Flex direction="column" minHeight="100vh" p={6} maxWidth="600px" margin="0 auto">
      {/* Content Section */}
      <Box flex="1" pb="16"> {/* Adds padding to prevent overlap with buttons */}
        {/* Screen Heading */}
        <Text
          fontSize={headingFontSize}
          fontWeight={headingFontWeight}
          color={headingColor}
          textAlign="center"
          mb={4}
        >
          {heading}
        </Text>

        {/* Screen Description */}
        <Text fontSize={descriptionFontSize} color={descriptionColor} textAlign="center" mb={8}>
          {description}
        </Text>

        {/* Fields */}
        <VStack spacing={4} align="stretch">
          {screen?.fields?.map((field, index) => (
            <Box key={index} p={4} border="1px solid" borderColor="gray.300" borderRadius="md">
              {field.type === "pincode" ? (
                <Pincode
                  label={field.field_config?.attributes?.label || "Pincode"}
                  placeholder={field.field_config?.attributes?.placeholder || "Enter Pincode"}
                  required={field.field_config?.attributes?.required || false}
                  backgroundColor={field.field_config?.attributes?.style?.backgroundColor || globalConfig.primary_background_color}
                  textColor={field.field_config?.attributes?.style?.textColor || globalConfig.primary_text_color}
                  borderColor={field.field_config?.attributes?.style?.borderColor || globalConfig.border_color}
                  width={field.field_config?.attributes?.style?.width || "100%"}
                  borderRadius={field.field_config?.attributes?.style?.borderRadius || globalConfig.default_border_radius}
                  fontSize={fontSizeMapping[field.field_config?.attributes?.style?.fontSize] || globalConfig.default_font_size}
                  fontWeight={field.field_config?.attributes?.style?.fontWeight || globalConfig.default_font_weight}
                  errorMessage={field.field_config?.attributes?.errorMessage || ""}
                  rules={field.field_config?.rules || []}
                />
              ) : (
                // Fallback for other field types (for example purposes)
                <Text>{field.field_name || `Field ${index + 1}`}</Text>
              )}
            </Box>
          ))}
        </VStack>
      </Box>

      {/* Button Container pinned to the bottom */}
      <Box mt="auto" pb={8} textAlign="center">
        <Flex justifyContent="center">
          {!isFirstScreen && (
            <Button
              variant="secondary"
              bg={globalConfig.secondary_color || "gray.500"}
              color={globalConfig.primary_color || "white"}
              onClick={onBack}
              mr={4}
            >
              Back
            </Button>
          )}
          <Button
            variant="primary"
            bg={globalConfig.primary_color || "blue.500"}
            color={globalConfig.secondary_color || "white"}
            onClick={handleContinue}
          >
            {isLastScreen ? "Submit" : continueButtonText}
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Screen;