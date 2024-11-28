import React, { useState, useImperativeHandle, forwardRef } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Text,
} from "@chakra-ui/react";

const SSNField = forwardRef(({
  label,
  required = false,
  borderColor,
  boxHeight = "40px",
  boxWidth = "40px",
  borderRadius = "md",
  backgroundColor,
  rules = [],
  onValidate,
}, ref) => {
  const [ssn, setSSN] = useState(Array(9).fill("")); 
  const [error, setError] = useState("");

  const validateSSN = (trigger) => {
    let validationError = "";

    console.log("rules", rules, "trigger", trigger);

    for (const rule of rules) {
      if (rule.trigger === trigger) {
        const {actions} = rule.config;
        const action = actions[0]
        if (rule.type === "lengthCheck") {
          const { minLength, maxLength, errorMessage } = actions || {};
          if (
            (minLength && ssn.join("").length < minLength) ||
            (maxLength && ssn.join("").length > maxLength)
          ) {
            validationError = errorMessage;
          }
        } else if (rule.type === "regexValidation") {
          const { pattern, errorMessage } = rule.config;
          const formattedSSN = `${ssn.slice(0, 3).join("")}-${ssn.slice(3, 5).join("")}-${ssn.slice(5, 9).join("")}`;


          
          const regex = new RegExp(pattern);

          if (!regex.test(formattedSSN)) {
            validationError = errorMessage || "SSN format is invalid.";
          } else {
            console.log("Regex validation passed");
          }
        } 
      }
      if (validationError) break;
    }

    setError(validationError);
    if (onValidate) onValidate(!validationError);
    return !validationError;
  };

  const validateBeforeSubmit = () => validateSSN("beforeSubmit");

  useImperativeHandle(ref, () => ({
    validateBeforeSubmit,
  }));

  const handleSSNChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const newSSN = [...ssn];
      newSSN[index] = value;
      setSSN(newSSN);
      setError("");

      if (value && index < 8) {
        document.getElementById(`ssn-box-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !ssn[index] && index > 0) {
      document.getElementById(`ssn-box-${index - 1}`).focus();
    }
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
              onBlur={() => validateSSN("onBlur")}
              maxLength={1}
              textAlign="center"
              height={boxHeight}
              width={boxWidth}
              borderColor={borderColor || "colors.fieldBorder"}
              backgroundColor={backgroundColor || "background.field"}
              borderRadius={borderRadius}
            />
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
});

export default SSNField;