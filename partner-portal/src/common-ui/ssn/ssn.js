import React, { useState, useImperativeHandle, forwardRef } from "react";
import { FormControl, FormLabel, Input, HStack, Text } from "@chakra-ui/react";

const SSNField = forwardRef(
  (
    {
      label,
      required = false,
      borderColor,
      boxHeight = "40px",
      boxWidth = "40px",
      borderRadius = "md",
      backgroundColor,
      rules = [],
      value = "",
      onValidate,
      onChange,
    },
    ref
  ) => {
    const ssn = value.split("").slice(0, 9);
    const [error, setError] = useState("");

    const validateSSN = (trigger) => {
      let validationError = "";

      for (const rule of rules) {
        if (rule.trigger === trigger) {
          const { actions } = rule;
          const action = actions[0];
          switch (rule.type) {
            case "requiredValidation":
              if (!ssn.join("") || ssn.join("").trim() === "") {
                validationError =
                  action?.config?.errorMessage || "This field is required.";
              }
              break;
            case "lengthCheck":
              const {
                minLength,
                maxLength,
                errorMessage,
                minLengthErrorMessage,
                maxLengthErrorMessage,
              } = action?.config || {};
              const ssnLength = ssn.join("").length;
              if (minLength && ssnLength < minLength) {
                validationError = minLengthErrorMessage || errorMessage;
              } else if (maxLength && ssnLength > maxLength) {
                validationError = maxLengthErrorMessage || errorMessage;
              }
              break;
            case "regexValidation":
              const { pattern, errorMessage: regexErrorMessage } =
                action?.config || {};
              const formattedSSN = `${ssn.slice(0, 3).join("")}-${ssn
                .slice(3, 5)
                .join("")}-${ssn.slice(5, 9).join("")}`;

              const regex = new RegExp(pattern);

              if (!regex.test(formattedSSN)) {
                validationError =
                  regexErrorMessage || "SSN format is invalid.";
              }
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

    const validateBeforeSubmit = () => validateSSN("beforeSubmit");

    useImperativeHandle(ref, () => ({
      validateBeforeSubmit,
    }));

    const handleSSNChange = (index, digit) => {
      if (/^\d?$/.test(digit)) {
        const newSSN = [...ssn];
        newSSN[index] = digit;
        const updatedSSNValue = newSSN.join("");
        if (onChange) onChange(updatedSSNValue);
        setError("");

        if (digit && index < 8) {
          const nextInput = document.getElementById(`ssn-box-${index + 1}`);
          if (nextInput) nextInput.focus();
        }
      }
    };

    const handleKeyDown = (index, e) => {
      if (e.key === "Backspace" && !ssn[index] && index > 0) {
        const prevInput = document.getElementById(`ssn-box-${index - 1}`);
        if (prevInput) prevInput.focus();
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
          {Array.from({ length: 9 }).map((_, index) => (
            <React.Fragment key={index}>
              <Input
                id={`ssn-box-${index}`}
                type="text"
                value={ssn[index] || ""}
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
  }
);

export default SSNField;