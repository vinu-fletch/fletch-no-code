import React, { useState, useImperativeHandle, forwardRef } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";

const Pincode = forwardRef(({
  label,
  id,
  placeholder,
  required = false,
  backgroundColor,
  textColor,
  borderColor,
  borderRadius,
  fontSize,
  fontWeight,
  width,
  height,
  placeholderPosition = "inside",
  rules = [],
  onValidate,
}, ref) => {
  const [pincode, setPincode] = useState("");
  const [error, setError] = useState("");
  const [isFocused, setIsFocused] = useState(false);

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
    const { minLength, maxLength, minLengthErrorMessage, maxLengthErrorMessage } = config;
    console.log("Value", value, "config" ,config)
    if (minLength && value.length < minLength) {
      return minLengthErrorMessage;
    }
    if (maxLength && value.length > maxLength) {
      return maxLengthErrorMessage;
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
        console.log("Rule is", rule)
        switch (rule.type) {
          case "lengthCheck":
            validationError = validateLength(pincode, rule.actions[0].config);
            break;
          case "regexValidation":
            validationError = validateRegex(pincode, rule.actions[0].config);
            break;
          default:
            break;
        }
        if (validationError) break;
      }
    }

    setError(validationError);
    if (onValidate) onValidate(!validationError);
    return !validationError;
  };

  const handleBlur = () => {
    setIsFocused(false);
    validateRules("onBlur");
  };

  const handleFocus = () => {
    setIsFocused(true);
    setError("");
  };

  const handlePincodeChange = (e) => {
    setPincode(e.target.value);
    setError("");
  };

  const hasOnBlurRule = rules.some((rule) => rule.trigger === "onBlur");
  const hasOnFocusRule = rules.some((rule) => rule.trigger === "onFocus");

  const beforeSubmit = () => validateRules("beforeSubmit");

  useImperativeHandle(ref, () => ({
    beforeSubmit,
  }));

  const labelStyle =
    placeholderPosition === "onInput"
      ? {
          position: "absolute",
          top: isFocused || pincode ? "-25px" : "-10px",
          left: "8px",
          fontSize: isFocused || pincode ? "xs" : fontSizeMapping[fontSize] || "md",
          color: isFocused ? "text.primary" : textColor || "text.secondary",
          transition: "all 0.2s ease",
          backgroundColor: backgroundColor || "bg.field",
          zIndex: "100",
          px: 1,
        }
      : {};

  return (
    <FormControl isRequired={required} mb={4} position="relative">
      {label && (
        <FormLabel
          htmlFor={id}
          fontSize={fontSizeMapping[fontSize] || "md"}
          fontWeight={fontWeight}
          color={textColor || "text.secondary"}
          {...labelStyle}
        >
          {label}
        </FormLabel>
      )}
      <Input
        type="text"
        id={id}
        w={width}
        value={pincode}
        onChange={handlePincodeChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        placeholder={placeholderPosition === "inside" ? placeholder : ""}
        bg={backgroundColor || "bg.field"}
        color={textColor}
        borderRadius={radiusMapping[borderRadius] || "md"}
        width={width}
        height={height}
        borderColor={borderColor}
        _placeholder={{ color: "text.placeholder" }}
      />
      {error && (
        <Text fontSize="sm" color="text.error" mt={1}>
          {error}
        </Text>
      )}
    </FormControl>
  );
});

export default Pincode;