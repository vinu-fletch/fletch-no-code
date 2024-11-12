import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";

const Pincode = ({
  label = "Pincode", // Label text
  placeholder, // Placeholder text
  required = false, // Required field boolean
  backgroundColor = "white", // Background color of the input
  textColor = "black", // Text color
  borderColor = "gray.300", // Border color of the input
  borderRadius = "md", // Border radius with fallback to "md"
  fontSize = "md", // Font size of the label
  fontWeight = "normal", // Font weight of the label
  width = "100%", // Width of the input
  height = "auto", // Height of the input
  errorColor = "red.500", // Error message color
  errorMessage = "", // Error message text
}) => {
  const [pincode, setPincode] = useState("");

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

  const handlePincodeChange = (e) => {
    setPincode(e.target.value);
  };

  return (
    <FormControl isRequired={required} mb={4}>
      {/* Render Label if exists */}
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
        bg={backgroundColor}
        color={textColor}
        borderRadius={radiusMapping[borderRadius] || "md"}
        width={width}
        height={height}
        borderColor={borderColor}
        _placeholder={{ color: textColor }}
      />
      
      {/* Error Message */}
      {errorMessage && (
        <Text fontSize="sm" color={errorColor} mt={1}>
          {errorMessage}
        </Text>
      )}
    </FormControl>
  );
};

export default Pincode;