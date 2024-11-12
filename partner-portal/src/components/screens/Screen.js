// screens/Screen.js

import React from "react";
import { Box, Text, VStack } from "@chakra-ui/react";
import Button from "@/common-ui/button/button";


const Screen = ({ screen, globalConfig, onContinue, isLastScreen }) => {
  const screenConfig = screen?.screen_config || {};

  // Extract heading, description, and other screen configurations with fallbacks
  const heading = screenConfig.heading || globalConfig.default_heading || "Default Heading";
  const headingColor = screenConfig.heading_color || globalConfig.primary_color || "#000";
  const description = screenConfig.description || globalConfig.default_description || "Default description";
  const descriptionColor = screenConfig.description_color || globalConfig.secondary_color || "#666";
  const continueButtonText = screenConfig.continue_button_text || "Continue";

  // Placeholder validation function
  const validateFields = () => {
    // Here, you would validate each field based on the rules defined in `screen.fields`
    // Currently, it always returns true
    return true;
  };

  // Handle continue button click with validation
  const handleContinue = () => {
    const isValid = validateFields();

    if (isValid) {
      onContinue();
    } else {
      console.log("Validation failed. Please correct the errors.");
    }
  };

  return (
    <Box p={6} maxWidth="600px" margin="0 auto">
      {/* Screen Heading */}
      <Text
        fontSize={screenConfig.heading_font_size || "xl"}
        fontWeight={screenConfig.heading_font_weight || "bold"}
        color={headingColor}
        textAlign="center"
        mb={4}
      >
        {heading}
      </Text>

      {/* Screen Description */}
      <Text color={descriptionColor} textAlign="center" mb={8}>
        {description}
      </Text>

      {/* Fields */}
      <VStack spacing={4} align="stretch">
        {screen?.fields?.map((field, index) => (
          <Box key={index} p={4} border="1px solid" borderColor="gray.300" borderRadius="md">
            {field.field_name || `Field ${index + 1}`}
          </Box>
        ))}
      </VStack>

      {/* Continue Button */}
      <Box mt={8} textAlign="center">
       <Button
          variant="primary"
          bg={globalConfig.primary_color || "blue.500"}
          color={globalConfig.secondary_color || "white"}
          onClick={handleContinue}
        >
          {isLastScreen ? "Submit" : continueButtonText}
        </Button>
      </Box>
    </Box>
  );
};

export default Screen;