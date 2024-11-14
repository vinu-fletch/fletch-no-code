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

  const handleJsonConfigChange = (e) => {
    
    setRule({
      ...rule,
      config: {
        ...rule.config,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleDynamicValueChange = (e) => {
    const value = e.target.value.replace("{{field_value}}", rule.config.fieldValue || "");
    handleConfigChange({
      target: { name: e.target.name, value },
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
            <option value="onKeyUp">On Key Press</option>
            <option value="onBlur">On Blur</option>
            <option value="beforeSubmit">Before Button Submit</option>
            <option value="onSubmit">After Button Submit</option>
          </Select>
        </FormControl>

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
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Headers (JSON)</FormLabel>
              <Textarea
                name="headers"
                value={rule.config.headers || ""}
                onChange={handleJsonConfigChange}
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
                value={rule.config.body || ""}
                onChange={handleDynamicValueChange}
                placeholder='e.g., { "pincode": "{{field_value}}" }'
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
            <FormControl>
              <FormLabel>Condition</FormLabel>
              <Select
                name="condition"
                value={rule.config.condition || "eq"}
                onChange={handleConfigChange}
                bg="background.dark"
                color="text.primary"
              >
                <option value="eq">Equal to</option>
                <option value="gt">Greater than</option>
                <option value="lt">Less than</option>
                <option value="includes">Includes</option>
                <option value="starts_with">Starts With</option>
                <option value="ends_with">Ends With</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Expected Value Type</FormLabel>
              <Select
                name="expectedValueType"
                value={rule.config.expectedValueType || "string"}
                onChange={handleConfigChange}
                bg="background.dark"
                color="text.primary"
              >
                <option value="string">String</option>
                <option value="number">Number</option>
                <option value="boolean">Boolean</option>
              </Select>
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