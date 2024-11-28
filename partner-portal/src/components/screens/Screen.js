import React, { useState, useRef } from "react";
import { Box, Text, VStack, Flex } from "@chakra-ui/react";
import Button from "@/common-ui/button/button";
import Pincode from "@/common-ui/pincode/pincode";
import SSNField from "@/common-ui/ssn/ssn";


const fontSizeMapping = {
  small: "lg",
  medium: "2xl",
  large: "4xl",
};

const Screen = ({ screen, globalConfig, onContinue, onBack, isFirstScreen, isLastScreen }) => {
  const screenConfig = screen?.screen_config || {};

  const heading = screenConfig.heading;
  const headingColor = screenConfig.heading_color;
  const description = screenConfig.description;
  const descriptionColor = screenConfig.description_color;
  const continueButtonText = screenConfig.continue_button_text || "Continue";

  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState("");

  const fieldRefs = useRef(screen.fields.map(() => React.createRef()));

  const handleFieldValidation = (fieldId, isValid) => {
    setFieldErrors((prevErrors) => ({ ...prevErrors, [fieldId]: !isValid }));
  };

  const hasErrors = Object.values(fieldErrors).some((error) => error);

  const handleApiCall = async (rule, fieldValue) => {
    const { url, method, headers, body, responseDataPath, expectedValue, expectedValueType, errorMessage } = rule.config;

    const parsedHeaders = headers ? JSON.parse(headers.replace(/\[\[field_value\]\]/g, fieldValue)) : {};
    const parsedBody = body ? JSON.parse(body.replace(/\[\[field_value\]\]/g, fieldValue)) : {};

    try {
      const options = {
        method: method || 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...parsedHeaders,
        },
        body: method === 'POST' || method === 'PUT' ? JSON.stringify(parsedBody) : undefined,
      };

      const response = await fetch(url, options);
      const responseData = await response.json();
      const actualValue = responseDataPath.split('.').reduce((acc, key) => acc[key], responseData);

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
    let isValid = true;
    setFormError("");

     
    for (const ref of fieldRefs.current) {
      if (ref.current && ref.current.validateBeforeSubmit) {
        const fieldValid = ref.current.validateBeforeSubmit();
        if (!fieldValid) {
          isValid = false;
        }
      }
    }

  if (!isValid) {
    console.log("Validation failed in beforeSubmit checks.");
    return;
  }

    for (const field of screen.fields) {
      const onSubmitRules = field.field_config.rules.filter(rule => rule.trigger === "onSubmit");

      for (const rule of onSubmitRules) {
        if (rule.type === "apiCall") {
          const fieldValue = document.querySelector(`#field-${field.id}`).value; 
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
    <Flex direction="column" minHeight="80vh" p={6} maxWidth="600px" margin="0 auto">
      <Box flex="1" pb="16">
        <Text fontSize={fontSizeMapping[screenConfig.heading_font_size] || "2xl"} fontWeight={screenConfig.heading_font_weight || "bold"} color={headingColor || "text.primary"} textAlign="center" mb={4}>
          {heading}
        </Text>
        <Text fontSize={fontSizeMapping[screenConfig.description_font_size] || "md"} color={descriptionColor || "text.secondary"} textAlign="center" mb={8}>
          {description}
        </Text>
        <VStack spacing={4} align="stretch">
          {screen?.fields?.map((field, index) => (
            <Box key={field.id || index} p={field.type === "hidden" ? 0 : 4}>
              {field.type === "pincode" ? (
                <Pincode
                  ref={fieldRefs.current[index]}
                  id={`field-${field.id}`}
                  label={field.field_config?.attributes?.label || "Pincode"}
                  placeholder={field.field_config?.attributes?.placeholder || "Enter Pincode"}
                  required={field.field_config?.attributes?.required || false}
                  backgroundColor={field.field_config?.attributes?.style?.backgroundColor || globalConfig.primary_background_color}
                  placeholderPosition={field.field_config?.attributes?.style?.placeholderPosition}
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
              ) : field.type === "ssn" ? (
                <SSNField
                  ref={fieldRefs.current[index]}
                  id={`field-${field.id}`}
                  label={field.field_config?.attributes?.label || "Social Security Number"}
                  required={field.field_config?.attributes?.required || false}
                  borderColor={field.field_config?.attributes?.borderColor}
                  boxHeight={field.field_config?.attributes?.fieldHeight}
                  boxWidth={field.field_config?.attributes?.fieldWidth}
                  borderRadius={field.field_config?.attributes?.borderRadius}
                  backgroundColor={field.field_config?.attributes?.backgroundColor}
                  rules={field.field_config?.rules || []}
                  onValidate={(isValid) => handleFieldValidation(field.id || index, isValid)}
                />
              ) : (
                <input type="hidden" name={field.field_config?.attributes?.name} value="" />
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
              onClick={onBack}
              mr={4}
            >
              Back
            </Button>
          )}
          <Button
            variant="primary"
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