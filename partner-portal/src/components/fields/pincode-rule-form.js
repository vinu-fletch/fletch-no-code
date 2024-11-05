// components/RuleConfig.js

import { useState } from "react";
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
} from "@chakra-ui/react";

const PincodeRuleConfig = ({ onSave }) => {
  const [rule, setRule] = useState({
    type: "autocomplete",
    trigger: "onKeyUp",
    debounceTime: 300,
    apiConfig: {
      url: "",
      method: "GET",
      headers: {},
      body: {},
      responseDataPath: "",
      displayKey: "",
    },
  });

  const handleInputChange = (e) => {
    setRule({
      ...rule,
      [e.target.name]: e.target.value,
    });
  };

  const handleApiConfigChange = (e) => {
    setRule({
      ...rule,
      apiConfig: {
        ...rule.apiConfig,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleHeadersChange = (e) => {
    setRule({
      ...rule,
      apiConfig: {
        ...rule.apiConfig,
        headers: {
          ...rule.apiConfig.headers,
          [e.target.name]: e.target.value,
        },
      },
    });
  };

  const handleBodyChange = (e) => {
    setRule({
      ...rule,
      apiConfig: {
        ...rule.apiConfig,
        body: {
          ...rule.apiConfig.body,
          [e.target.name]: e.target.value,
        },
      },
    });
  };

  const handleSave = () => {
    onSave(rule);
  };

  return (
    <Box mt={4} p={4} bg="background.light" borderRadius="md">
      <Heading size="sm" mb={2}>
        Pincode Validation Rule
      </Heading>
      <VStack spacing={3} align="stretch">
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

        <FormControl>
          <FormLabel>Debounce Time (ms)</FormLabel>
          <Input
            name="debounceTime"
            type="number"
            value={rule.debounceTime}
            onChange={handleInputChange}
            bg="background.dark"
            color="text.primary"
          />
        </FormControl>

        {/* API Config */}
        <Heading size="sm" mt={4}>
          API Configuration
        </Heading>

        <FormControl>
          <FormLabel>URL</FormLabel>
          <Input
            name="url"
            value={rule.apiConfig.url}
            onChange={handleApiConfigChange}
            placeholder="e.g., https://api.example.com/validatePincode"
            bg="background.dark"
            color="text.primary"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Method</FormLabel>
          <Select
            name="method"
            value={rule.apiConfig.method}
            onChange={handleApiConfigChange}
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
            value={JSON.stringify(rule.apiConfig.headers, null, 2)}
            onChange={(e) => {
              try {
                const headers = JSON.parse(e.target.value);
                handleHeadersChange({ target: { name: "headers", value: headers } });
              } catch {
                // Handle JSON parse error if needed
              }
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
            value={JSON.stringify(rule.apiConfig.body, null, 2)}
            onChange={(e) => {
              try {
                const body = JSON.parse(e.target.value);
                handleBodyChange({ target: { name: "body", value: body } });
              } catch {
                // Handle JSON parse error if needed
              }
            }}
            placeholder='e.g., { "pincode": "{{this_field_value}}" }'
            bg="background.dark"
            color="text.primary"
            rows={4}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Response Data Path</FormLabel>
          <Input
            name="responseDataPath"
            value={rule.apiConfig.responseDataPath}
            onChange={handleApiConfigChange}
            placeholder="e.g., data.isValid"
            bg="background.dark"
            color="text.primary"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Respone Data Value</FormLabel>
          <Input
            name="displayKey"
            value={rule.apiConfig.displayKey}
            onChange={handleApiConfigChange}
            placeholder="e.g true"
            bg="background.dark"
            color="text.primary"
          />
        </FormControl>

        {/* Save Button */}
        <Button colorScheme="primary" onClick={handleSave}>
          Save Rule
        </Button>
      </VStack>
    </Box>
  );
};

export default PincodeRuleConfig;