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
  onValidate,
}) => {
  const [pincode, setPincode] = useState("");
  const [error, setError] = useState("");

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
        if (validationError) break;
      }
    }

    setError(validationError);
    if (onValidate) onValidate(!validationError); // Signal validation status to parent
    return !validationError;
  };

  const handleBlur = () => {
    validateRules("onBlur");
  };

  const handleFocus = () => {
    setError("");
  };

  const handleKeyPress = (e) => {
    const isValidKey = validateRules("onKeyPress");
    if (!isValidKey) {
      e.preventDefault();
    }
  };

  const handlePincodeChange = (e) => {
    setPincode(e.target.value);
    setError(""); // Clear error when value changes
  };

  const hasOnBlurRule = rules.some(rule => rule.trigger === "onBlur");
  const hasOnFocusRule = rules.some(rule => rule.trigger === "onFocus");
  const hasOnKeyPressRule = rules.some(rule => rule.trigger === "onKeyPress");

  return (
    <FormControl isRequired={required} mb={4}>
      {label && (
        <FormLabel
          fontSize={fontSizeMapping[fontSize] || "md"}
          fontWeight={fontWeight}
          color={textColor}
        >
          {label}
        </FormLabel>
      )}
      
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
      
      {error && (
        <Text fontSize="sm" color={errorColor} mt={1}>
          {error}
        </Text>
      )}
    </FormControl>
  );
};

export default Pincode;