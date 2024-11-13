import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Text,
} from "@chakra-ui/react";

const SSNField = ({
  label,
  required = false,
  borderColor,
  boxHeight = "40px",
  boxWidth = "40px",
  borderRadius = "md",
  backgroundColor,
  rules = [],
  onValidate,
}) => {
  const [ssn, setSSN] = useState(Array(9).fill("")); // Initialize an array for 9 SSN digits
  const [error, setError] = useState("");

  const validateSSN = () => {
    let validationError = "";

    for (const rule of rules) {
      if (rule.trigger === "onBlur") {
        if (rule.type === "lengthCheck") {
          const { minLength, maxLength, errorMessage } = rule.config;
          if (
            (minLength && ssn.join("").length < minLength) ||
            (maxLength && ssn.join("").length > maxLength)
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

  const handleSSNChange = (index, value) => {
    if (/^\d?$/.test(value)) { // Only allow digits
      const newSSN = [...ssn];
      newSSN[index] = value;
      setSSN(newSSN);
      setError(""); // Clear error on input change

      // Automatically move focus to the next input if a digit is entered
      if (value && index < 8) {
        document.getElementById(`ssn-box-${index + 1}`).focus();
      }

      // Run validation if it's the last box
      if (index === 8) {
        validateSSN();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !ssn[index] && index > 0) {
      // Move focus to the previous input if backspace is pressed on an empty box
      document.getElementById(`ssn-box-${index - 1}`).focus();
    }
  };

  const handleBlur = () => {
    validateSSN();
  };

  return (
    <FormControl isRequired={required} mb={4}>
      {label && (
        <FormLabel fontSize="md" fontWeight="normal" color="black">
          {label}
        </FormLabel>
      )}
      <HStack spacing={2}>
        {ssn.map((digit, index) => (
          <React.Fragment key={index}>
            <Input
              id={`ssn-box-${index}`}
              type="text"
              value={digit}
              onChange={(e) => handleSSNChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onBlur={handleBlur}
              maxLength={1}
              textAlign="center"
              height={boxHeight}
              width={boxWidth}
              borderColor={borderColor || "colors.fieldBorder"}
              backgroundColor={backgroundColor || "background.field"}
              borderRadius={borderRadius}
            />
            {/* Add dashes after the 3rd and 5th boxes */}
            {(index === 2 || index === 4) && (
              <Text fontSize="lg" color="text.primary">
                -
              </Text>
            )}
          </React.Fragment>
        ))}
      </HStack>
      {error && (
        <Text fontSize="sm" color="text.error" mt={1}>
          {error}
        </Text>
      )}
    </FormControl>
  );
};

export default SSNField;