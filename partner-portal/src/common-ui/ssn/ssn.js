import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";

const SSNField = ({
  label,
  required = false,
  borderColor = "gray.300",
  fieldHeight = "auto",
  borderRadius = "md",
  backgroundColor = "white",
  errorColor = "red.500",
  rules = [],
  onValidate,
}) => {
  const [ssn, setSSN] = useState("");
  const [error, setError] = useState("");

  // Format input as XXX-XX-XXXX without user needing to type dashes
  const formatSSN = (value) => {
    const rawValue = value.replace(/\D/g, ""); // Remove non-numeric characters
    const formattedSSN = rawValue
      .replace(/^(\d{3})(\d{2})(\d{0,4})$/, "$1-$2-$3") // Format as XXX-XX-XXXX
      .substring(0, 11); // Limit to 11 characters, including dashes
    return formattedSSN;
  };

  // Validation logic, e.g., length check, based on rules
  const validateSSN = (event) => {
    let validationError = "";

    for (const rule of rules) {
      if (rule.trigger === event) {
        if (rule.type === "lengthCheck") {
          const numericSSN = ssn.replace(/\D/g, ""); // Ignore dashes
          const { minLength, maxLength, errorMessage } = rule.config;
          if (
            (minLength && numericSSN.length < minLength) ||
            (maxLength && numericSSN.length > maxLength)
          ) {
            validationError = errorMessage;
          }
        }
      }
      if (validationError) break;
    }

    setError(validationError);
    if (onValidate) onValidate(!validationError); // Signal validation status to parent
    return !validationError;
  };

  const handleBlur = () => {
    validateSSN("onBlur");
  };

  const handleFocus = () => {
    setError("");
  };

  const handleSSNChange = (e) => {
    const formattedSSN = formatSSN(e.target.value); // Auto-format input
    setSSN(formattedSSN);
    setError(""); // Clear error on input change
  };

  return (
    <FormControl isRequired={required} mb={4}>
      {label && (
        <FormLabel fontSize="md" fontWeight="normal" color="black">
          {label}
        </FormLabel>
      )}
      <Input
        type="text"
        value={ssn}
        onChange={handleSSNChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        placeholder="XXX-XX-XXXX"
        maxLength={11} // Max length considering dashes
        height={fieldHeight}
        borderColor={borderColor}
        backgroundColor={backgroundColor}
        borderRadius={borderRadius}
        _placeholder={{ color: "gray.500" }}
      />
      {error && (
        <Text fontSize="sm" color={errorColor} mt={1}>
          {error}
        </Text>
      )}
    </FormControl>
  );
};

export default SSNField;