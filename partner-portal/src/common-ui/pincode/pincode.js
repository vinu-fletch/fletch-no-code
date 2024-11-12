import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";

const Pincode = ({
  label,
  placeholder,
  required = false,
  backgroundColor = "white",
  textColor = "black",
  borderColor = "gray.300",
  borderRadius = "md",
  fontSize = "md",
  fontWeight = "normal",
  width = "100%",
  height = "auto",
  errorColor = "red.500",
  rules = [],
}) => {
  const [pincode, setPincode] = useState("");
  const [error, setError] = useState("");

  // Mapping for Chakra values based on string size options for font size and radius
  const fontSizeMapping = {
    small: "sm",
    medium: "md",
    large: "lg",
    xl: "xl",
  };

  const radiusMapping = {
    small: "sm",
    medium: "md",
    large: "lg",
    full: "full",
  };

  // Validation functions
  const validateLength = (value, config) => {
    const { minLength, maxLength, errorMessage } = config;
    if ((minLength && value.length < minLength) || (maxLength && value.length > maxLength)) {
      return errorMessage;
    }
    return "";
  };

  const validateRegex = (value, config) => {
    const { pattern, errorMessage } = config;
    if (!new RegExp(pattern).test(value)) {
      return errorMessage;
    }
    return "";
  };

  const validateRules = (event) => {
    let validationError = "";

    for (const rule of rules) {
      if (rule.trigger === event) {
        switch (rule.type) {
          case "lengthCheck":
            validationError = validateLength(pincode, rule.config);
            break;
          case "regexValidation":
            validationError = validateRegex(pincode, rule.config);
            break;
          default:
            break;
        }
        if (validationError) break; // Stop at the first validation error
      }
    }

    setError(validationError);
    return !validationError; // Return true if no validation error
  };

  const handleBlur = () => {
    validateRules("onBlur");
  };

  const handleFocus = () => {
    setError(""); // Clear error on focus
  };

  const handleKeyPress = (e) => {
    const isValidKey = validateRules("onKeyPress");
    if (!isValidKey) {
      e.preventDefault(); // Prevent invalid key entry
    }
  };

  const handlePincodeChange = (e) => {
    setPincode(e.target.value);
    setError(""); // Clear error when value changes
  };

  // Check if specific triggers are present in the rules array
  const hasOnBlurRule = rules.some(rule => rule.trigger === "onBlur");
  const hasOnFocusRule = rules.some(rule => rule.trigger === "onFocus");
  const hasOnKeyPressRule = rules.some(rule => rule.trigger === "onKeyPress");

  return (
    <FormControl isRequired={required} mb={4}>
      {/* Render Label if it exists */}
      {label && (
        <FormLabel
          fontSize={fontSizeMapping[fontSize] || "md"}
          fontWeight={fontWeight}
          color={textColor}
        >
          {label}
        </FormLabel>
      )}
      
      {/* Pincode Input */}
      <Input
        type="text"
        w={width}
        placeholder={placeholder}
        value={pincode}
        onChange={handlePincodeChange}
        {...(hasOnBlurRule && { onBlur: handleBlur })}
        {...(hasOnFocusRule && { onFocus: handleFocus })}
        {...(hasOnKeyPressRule && { onKeyPress: handleKeyPress })}
        bg={backgroundColor}
        color={textColor}
        borderRadius={radiusMapping[borderRadius] || "md"}
        width={width}
        height={height}
        borderColor={borderColor}
        _placeholder={{ color: textColor }}
      />
      
      {/* Error Message */}
      {error && (
        <Text fontSize="sm" color={errorColor} mt={1}>
          {error}
        </Text>
      )}
    </FormControl>
  );
};

export default Pincode;