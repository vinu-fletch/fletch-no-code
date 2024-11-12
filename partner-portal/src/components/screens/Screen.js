import React, { useState } from "react";
import { Box, Text, VStack, Flex } from "@chakra-ui/react";
import Button from "@/common-ui/button/button";
import Pincode from "@/common-ui/pincode/pincode";
import axios from "axios";

const fontSizeMapping = {
  small: "md",
  medium: "lg",
  large: "2xl",
};

const Screen = ({ screen, globalConfig, onContinue, onBack, isFirstScreen, isLastScreen }) => {
  const screenConfig = screen?.screen_config || {};

  const heading = screenConfig.heading || globalConfig.default_heading || "Default Heading";
  const headingColor = screenConfig.heading_color || globalConfig.primary_color || "#000";
  const description = screenConfig.description || globalConfig.default_description || "Default description";
  const descriptionColor = screenConfig.description_color || globalConfig.secondary_color || "#666";
  const continueButtonText = screenConfig.continue_button_text || "Continue";

  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState("");

  const handleFieldValidation = (fieldId, isValid) => {
    setFieldErrors((prevErrors) => ({ ...prevErrors, [fieldId]: !isValid }));
  };

  const hasErrors = Object.values(fieldErrors).some((error) => error);

  console.log("Screen Fields:", screen?.fields);

  const handleApiCall = async (rule, fieldValue) => {
  const { url, method, headers, body, responseDataPath, expectedValue, expectedValueType, errorMessage } = rule.config;

  // Parse and replace dynamic values in headers and body
  const parsedHeaders = headers ? JSON.parse(headers.replace(/\[\[field_value\]\]/g, fieldValue)) : {};
  const parsedBody = body ? JSON.parse(body.replace(/\[\[field_value\]\]/g, fieldValue)) : {};

  try {
    // Construct fetch options
    const options = {
      method: method || 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...parsedHeaders
      },
      body: method === 'POST' || method === 'PUT' ? JSON.stringify(parsedBody) : undefined
    };


    console.log("API Call Options:", options);
    // Make the API call
    const response = await fetch(url, options);
    const responseData = await response.json();

    // Traverse the response to find the expected value path
    const actualValue = responseDataPath.split('.').reduce((acc, key) => acc[key], responseData);

    // Type conversion based on expectedValueType
    let expectedTypedValue;
    switch (expectedValueType) {
      case "boolean":
        expectedTypedValue = expectedValue === "true";
        break;
      case "number":
        expectedTypedValue = Number(expectedValue);
        break;
      default:
        expectedTypedValue = expectedValue;
    }

    if (actualValue !== expectedTypedValue) {
      setFormError(errorMessage);
      return false;
    }
  } catch (error) {
    console.error("API Call Error:", error);
    setFormError("An error occurred during validation.");
    return false;
  }

  return true;
};

  const handleContinue = async () => {
    // Check if there are onSubmit rules that need to be validated
    let isValid = true;

    for (const field of screen.fields) {
      const onSubmitRules = field.field_config.rules.filter(rule => rule.trigger === "onSubmit");

      for (const rule of onSubmitRules) {
        if (rule.type === "apiCall") {
          const fieldValue = document.querySelector(`#field-${field.id}`).value; // Get current field value
          isValid = await handleApiCall(rule, fieldValue);
          if (!isValid) break;
        }
      }
      if (!isValid) break;
    }

    if (isValid) {
      onContinue();
    } else {
      console.log("Validation failed. Please correct the errors.");
    }
  };

  return (
    <Flex direction="column" minHeight="100vh" p={6} maxWidth="600px" margin="0 auto">
      <Box flex="1" pb="16">
        <Text fontSize={fontSizeMapping[screenConfig.heading_font_size] || "2xl"} fontWeight={screenConfig.heading_font_weight || "bold"} color={headingColor} textAlign="center" mb={4}>
          {heading}
        </Text>
        <Text fontSize={fontSizeMapping[screenConfig.description_font_size] || "md"} color={descriptionColor} textAlign="center" mb={8}>
          {description}
        </Text>
        <VStack spacing={4} align="stretch">
          {screen?.fields?.map((field, index) => (
            <Box key={field.id || index} p={4} border="1px solid" borderColor="gray.300" borderRadius="md">
              {field.type === "pincode" ? (
                <Pincode
                  id={`field-${field.id}`} // Attach an ID for querying
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
                  onValidate={(isValid) => handleFieldValidation(field.id || index, isValid)}
                />
              ) : (
                <Text>{field.field_name || `Field ${index + 1}`}</Text>
              )}
            </Box>
          ))}
        </VStack>
      </Box>
      {formError && (
        <Text color="red.500" mb={4} textAlign="center">
          {formError}
        </Text>
      )}
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
            disabled={hasErrors}
          >
            {isLastScreen ? "Submit" : continueButtonText}
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Screen;