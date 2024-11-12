import { useState, useEffect } from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  VStack,
  Textarea,
  HStack,
} from "@chakra-ui/react";

const RuleConfig = ({ onSave, onCancel, initialRule }) => {
  const [rule, setRule] = useState({
    type: "lengthCheck",
    trigger: "onBlur",
    config: {},
  });

  useEffect(() => {
    if (initialRule) {
      setRule(initialRule);
    }
  }, [initialRule]);

  const handleInputChange = (e) => {
    setRule({
      ...rule,
      [e.target.name]: e.target.value,
    });
  };

  const handleConfigChange = (e) => {
    setRule({
      ...rule,
      config: {
        ...rule.config,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleSave = () => {
    onSave(rule);
  };

  return (
    <Box mt={4} p={4} bg="background.dark" borderRadius="md">
      <Heading size="sm" mb={2}>
        {initialRule ? "Edit Validation Rule" : "Add Validation Rule"}
      </Heading>
      <VStack spacing={3} align="stretch">
        <FormControl>
          <FormLabel>Rule Type</FormLabel>
          <Select
            name="type"
            value={rule.type}
            onChange={handleInputChange}
            bg="background.dark"
            color="text.primary"
          >
            <option value="lengthCheck">Length Check</option>
            <option value="regexValidation">Regex Validation</option>
            <option value="apiCall">API Call</option>
            {/* Add more rule types as needed */}
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Trigger</FormLabel>
          <Select
            name="trigger"
            value={rule.trigger}
            onChange={handleInputChange}
            bg="background.dark"
            color="text.primary"
          >
            <option value="onKeyUp">onKeyUp</option>
            <option value="onBlur">onBlur</option>
            <option value="onSubmit">onSubmit</option>
            {/* Add more triggers as needed */}
          </Select>
        </FormControl>

        {/* Rule-specific configuration */}
        {rule.type === "lengthCheck" && (
          <>
            <FormControl>
              <FormLabel>Minimum Length</FormLabel>
              <Input
                name="minLength"
                type="number"
                value={rule.config.minLength || ""}
                onChange={handleConfigChange}
                bg="background.dark"
                color="text.primary"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Maximum Length</FormLabel>
              <Input
                name="maxLength"
                type="number"
                value={rule.config.maxLength || ""}
                onChange={handleConfigChange}
                bg="background.dark"
                color="text.primary"
              />
            </FormControl>

          </>
        )}

        {rule.type === "regexValidation" && (
          <>
            <FormControl>
              <FormLabel>Regex Pattern</FormLabel>
              <Input
                name="pattern"
                value={rule.config.pattern || ""}
                onChange={handleConfigChange}
                placeholder="e.g., ^[0-9]{6}$"
                bg="background.dark"
                color="text.primary"
              />
            </FormControl>
          
          </>
        )}

        {rule.type === "apiCall" && (
          <>
            <FormControl>
              <FormLabel>API URL</FormLabel>
              <Input
                name="url"
                value={rule.config.url || ""}
                onChange={handleConfigChange}
                placeholder="e.g., https://api.example.com/validate"
                bg="background.dark"
                color="text.primary"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Method</FormLabel>
              <Select
                name="method"
                value={rule.config.method || "GET"}
                onChange={handleConfigChange}
                bg="background.dark"
                color="text.primary"
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                {/* Add more methods as needed */}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Headers (JSON)</FormLabel>
              <Textarea
                name="headers"
                value={
                  rule.config.headers
                    ? JSON.stringify(rule.config.headers, null, 2)
                    : ""
                }
                onChange={(e) => {
                  handleConfigChange({
                    target: { name: "headers", value: e.target.value },
                  });
                }}
                placeholder='e.g., { "Content-Type": "application/json" }'
                bg="background.dark"
                color="text.primary"
                rows={4}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Body (JSON)</FormLabel>
              <Textarea
                name="body"
                value={
                  rule.config.body
                    ? JSON.stringify(rule.config.body, null, 2)
                    : ""
                }
                onChange={(e) => {
                  handleConfigChange({
                    target: { name: "body", value: e.target.value },
                  });
                }}
                placeholder='e.g., { "value": "{{this_field_value}}" }'
                bg="background.dark"
                color="text.primary"
                rows={4}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Response Data Path</FormLabel>
              <Input
                name="responseDataPath"
                value={rule.config.responseDataPath || ""}
                onChange={handleConfigChange}
                placeholder="e.g., data.isValid"
                bg="background.dark"
                color="text.primary"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Expected Response Value</FormLabel>
              <Input
                name="expectedValue"
                value={rule.config.expectedValue || ""}
                onChange={handleConfigChange}
                placeholder="e.g., true"
                bg="background.dark"
                color="text.primary"
              />
            </FormControl>
          </>
        )}

        <FormControl>
              <FormLabel>Error Message</FormLabel>
              <Input
                name="errorMessage"
                value={rule.config.errorMessage || ""}
                onChange={handleConfigChange}
                bg="background.dark"
                color="text.primary"
              />
        </FormControl>

        {/* Save and Cancel Buttons */}
        <HStack spacing={2} mt={4}>
          <Button colorScheme="primary" onClick={handleSave}>
            Save Rule
          </Button>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default RuleConfig;