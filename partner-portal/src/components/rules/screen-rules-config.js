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

const ScreenRuleConfig = ({ onSave, onCancel, initialRule }) => {
  const [rule, setRule] = useState({
    trigger: "ON_LOAD",
    type: "API_CALL",
    actions: [], // Array of actions
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

  const handleActionChange = (index, key, value) => {
    setRule({
      ...rule,
      actions: rule.actions.map((action, idx) =>
        idx === index
          ? {
              ...action,
              [key]: value,
            }
          : action
      ),
    });
  };

  const handleActionConfigChange = (index, key, value) => {
    setRule({
      ...rule,
      actions: rule.actions.map((action, idx) =>
        idx === index
          ? {
              ...action,
              config: {
                ...action.config,
                [key]: value,
              },
            }
          : action
      ),
    });
  };

  const handleSave = () => {
    onSave(rule);
  };

  return (
    <Box mt={4} p={4} bg="background.dark" borderRadius="md">
      <Heading size="sm" mb={2}>
        {initialRule ? "Edit Section Rule" : "Add Section Rule"}
      </Heading>
      <VStack spacing={3} align="stretch">
        {/* Trigger */}
        <FormControl>
          <FormLabel>Trigger</FormLabel>
          <Select
            name="trigger"
            value={rule.trigger}
            onChange={handleInputChange}
            bg="background.dark"
            color="text.primary"
          >
            <option value="ON_LOAD">On Load</option>
            <option value="ON_SUBMIT">On Submit</option>
          </Select>
        </FormControl>

        {/* Rule Type */}
        <FormControl>
          <FormLabel>Rule Type</FormLabel>
          <Select
            name="type"
            value={rule.type}
            onChange={handleInputChange}
            bg="background.dark"
            color="text.primary"
          >
            <option value="API_CALL">API Call</option>
          </Select>
        </FormControl>

        {/* Actions */}
        {rule.type === "API_CALL" && (
          <>
            {rule.actions.map((action, index) => (
              <Box key={index} p={3} bg="gray.700" borderRadius="md" mb={3}>
                <HStack justifyContent="space-between">
                  <FormLabel>Action {index + 1}</FormLabel>
                  <Button
                    size="sm"
                    colorScheme="red"
                    onClick={() => {
                      setRule({
                        ...rule,
                        actions: rule.actions.filter((_, i) => i !== index),
                      });
                    }}
                  >
                    Delete Action
                  </Button>
                </HStack>

                {/* API Configuration */}
                <FormControl mt={3}>
                  <FormLabel>API Type</FormLabel>
                  <Select
                    name="apiType"
                    value={action.config?.apiType || "GET"}
                    onChange={(e) =>
                      handleActionConfigChange(index, "apiType", e.target.value)
                    }
                    bg="background.dark"
                    color="text.primary"
                  >
                    <option value="Non Sensitive">Non Sensitive</option>
                    <option value="Sensitive">Sensitive</option>
                  </Select>
                </FormControl>

                <FormControl mt={3}>
                  <FormLabel>API URL</FormLabel>
                  <Input
                    name="apiUrl"
                    value={action.config?.apiUrl || ""}
                    onChange={(e) =>
                      handleActionConfigChange(index, "apiUrl", e.target.value)
                    }
                    placeholder="e.g., https://api.example.com/data"
                    bg="background.dark"
                    color="text.primary"
                  />
                </FormControl>

                <FormControl mt={3}>
                  <FormLabel>Request Method</FormLabel>
                  <Select
                    name="requestMethod"
                    value={action.config?.requestMethod || "GET"}
                    onChange={(e) =>
                      handleActionConfigChange(
                        index,
                        "requestMethod",
                        e.target.value
                      )
                    }
                    bg="background.dark"
                    color="text.primary"
                  >
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                    <option value="PUT">PUT</option>
                    <option value="DELETE">DELETE</option>
                  </Select>
                </FormControl>

                <FormControl mt={3}>
                  <FormLabel>Request Headers (JSON)</FormLabel>
                  <Textarea
                    name="requestHeaders"
                    value={action.config?.requestHeaders || ""}
                    onChange={(e) =>
                      handleActionConfigChange(
                        index,
                        "requestHeaders",
                        e.target.value
                      )
                    }
                    placeholder='e.g., { "Authorization": "Bearer token" }'
                    bg="background.dark"
                    color="text.primary"
                  />
                </FormControl>

                <FormControl mt={3}>
                  <FormLabel>Request Body (JSON)</FormLabel>
                  <Textarea
                    name="requestBody"
                    value={action.config?.requestBody || ""}
                    onChange={(e) =>
                      handleActionConfigChange(
                        index,
                        "requestBody",
                        e.target.value
                      )
                    }
                    placeholder='e.g., { "key": "value" }'
                    bg="background.dark"
                    color="text.primary"
                  />
                </FormControl>

                {/* Action to Populate Variables */}
                <FormControl mt={3}>
                  <FormLabel>Populate Target</FormLabel>
                  <Input
                    name="target"
                    value={action.config?.target || ""}
                    onChange={(e) =>
                      handleActionConfigChange(index, "target", e.target.value)
                    }
                    placeholder="e.g., {{global.variable_name}} or {{field_values.form_name}}"
                    bg="background.dark"
                    color="text.primary"
                  />
                </FormControl>

                <FormControl mt={3}>
                  <FormLabel>Value Source</FormLabel>
                  <Select
                    name="valueSource"
                    value={action.config?.valueSource || "static"}
                    onChange={(e) =>
                      handleActionConfigChange(
                        index,
                        "valueSource",
                        e.target.value
                      )
                    }
                    bg="background.dark"
                    color="text.primary"
                  >
                    <option value="static">Static Value</option>
                    <option value="apiResponse">From API Response</option>
                  </Select>
                </FormControl>

                {action.config?.valueSource === "static" && (
                  <FormControl mt={3}>
                    <FormLabel>Static Value</FormLabel>
                    <Input
                      name="staticValue"
                      value={action.config?.staticValue || ""}
                      onChange={(e) =>
                        handleActionConfigChange(
                          index,
                          "staticValue",
                          e.target.value
                        )
                      }
                      placeholder="Enter static value"
                      bg="background.dark"
                      color="text.primary"
                    />
                  </FormControl>
                )}

                {action.config?.valueSource === "apiResponse" && (
                  <FormControl mt={3}>
                    <FormLabel>Response Data Path</FormLabel>
                    <Input
                      name="responseDataPath"
                      value={action.config?.responseDataPath || ""}
                      onChange={(e) =>
                        handleActionConfigChange(
                          index,
                          "responseDataPath",
                          e.target.value
                        )
                      }
                      placeholder="e.g., data.items[0].value"
                      bg="background.dark"
                      color="text.primary"
                    />
                  </FormControl>
                )}
              </Box>
            ))}
            <Button
              variant="outline"
              colorScheme="primary"
              onClick={() =>
                setRule({
                  ...rule,
                  actions: [
                    ...rule.actions,
                    {
                      type: "populate",
                      config: {
                        valueSource: "static",
                      },
                    },
                  ],
                })
              }
            >
              Add Action
            </Button>
          </>
        )}

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

export default ScreenRuleConfig;
