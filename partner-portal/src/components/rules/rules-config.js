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
    actions: [], // Unified structure for all types of rules
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
    const value = e.target.value;
    const name = e.target.name;

    if (rule.type === "lengthCheck" || rule.type === "regexValidation") {
      // Save directly to the single action config for static rules
      setRule({
        ...rule,
        actions: [
          {
            type: rule.type,
            config: {
              ...rule.actions[0]?.config,
              [name]: value,
            },
          },
        ],
      });
    } else {
      // Generic config for other rules
      setRule({
        ...rule,
        actions: rule.actions.map((action, idx) =>
          idx === 0
            ? {
                ...action,
                config: {
                  ...action.config,
                  [name]: value,
                },
              }
            : action
        ),
      });
    }
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
            <option value="lengthCheck">Length Check</option>
            <option value="regexValidation">Regex Validation</option>
            <option value="apiCall">API Call</option>
          </Select>
        </FormControl>

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
            <option value="onKeyUp">On Key Press</option>
            <option value="onBlur">On Blur</option>
            <option value="beforeSubmit">Before Button Submit</option>
            <option value="onSubmit">After Button Submit</option>
          </Select>
        </FormControl>

        {/* Length Check */}
        {rule.type === "lengthCheck" && (
          <>
            <FormControl>
              <FormLabel>Minimum Length</FormLabel>
              <Input
                name="minLength"
                type="number"
                value={rule.actions[0]?.config?.minLength || ""}
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
                value={rule.actions[0]?.config?.maxLength || ""}
                onChange={handleConfigChange}
                bg="background.dark"
                color="text.primary"
              />
            </FormControl>
            {/* Min Length Error Message */}
            <FormControl mt={3}>
              <FormLabel>Min Length Error Message</FormLabel>
              <Input
                name="minLengthErrorMessage"
                value={rule.actions[0]?.config?.minLengthErrorMessage || ""}
                onChange={handleConfigChange}
                placeholder="Error message when below min length"
                bg="background.dark"
                color="text.primary"
              />
            </FormControl>
            {/* Max Length Error Message */}
            <FormControl mt={3}>
              <FormLabel>Max Length Error Message</FormLabel>
              <Input
                name="maxLengthErrorMessage"
                value={rule.actions[0]?.config?.maxLengthErrorMessage || ""}
                onChange={handleConfigChange}
                placeholder="Error message when above max length"
                bg="background.dark"
                color="text.primary"
              />
            </FormControl>
          </>
        )}

        {/* Regex Validation */}
        {rule.type === "regexValidation" && (
          <>
            <FormControl>
              <FormLabel>Regex Pattern</FormLabel>
              <Input
                name="pattern"
                value={rule.actions[0]?.config?.pattern || ""}
                onChange={handleConfigChange}
                placeholder="e.g., ^[0-9]{6}$"
                bg="background.dark"
                color="text.primary"
              />
            </FormControl>
            {/* Error Message */}
            <FormControl mt={3}>
              <FormLabel>Error Message</FormLabel>
              <Input
                name="errorMessage"
                value={rule.actions[0]?.config?.errorMessage || ""}
                onChange={handleConfigChange}
                placeholder="Enter error message"
                bg="background.dark"
                color="text.primary"
              />
            </FormControl>
          </>
        )}

        {/* API Call */}
        {rule.type === "apiCall" && (
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

                <FormControl>
                  <FormLabel>Action Type</FormLabel>
                  <Select
                    value={action.type || ""}
                    onChange={(e) =>
                      setRule({
                        ...rule,
                        actions: rule.actions.map((a, i) =>
                          i === index ? { ...a, type: e.target.value } : a
                        ),
                      })
                    }
                    bg="background.dark"
                    color="text.primary"
                  >
                    <option value="validation">Validation</option>
                    <option value="populateField">Populate Field</option>
                  </Select>
                </FormControl>

                {action.type === "validation" && (
                  <>
                    <FormControl mt={3}>
                      <FormLabel>API URL</FormLabel>
                      <Input
                        name="apiUrl"
                        value={action.config.apiUrl || ""}
                        onChange={(e) =>
                          setRule({
                            ...rule,
                            actions: rule.actions.map((a, i) =>
                              i === index
                                ? {
                                    ...a,
                                    config: {
                                      ...a.config,
                                      apiUrl: e.target.value,
                                    },
                                  }
                                : a
                            ),
                          })
                        }
                        placeholder="e.g., https://api.example.com/validate"
                        bg="background.dark"
                        color="text.primary"
                      />
                    </FormControl>
                    <FormControl mt={3}>
                      <FormLabel>Request Method</FormLabel>
                      <Select
                        name="requestMethod"
                        value={action.config.requestMethod || "GET"}
                        onChange={(e) =>
                          setRule({
                            ...rule,
                            actions: rule.actions.map((a, i) =>
                              i === index
                                ? {
                                    ...a,
                                    config: {
                                      ...a.config,
                                      requestMethod: e.target.value,
                                    },
                                  }
                                : a
                            ),
                          })
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
                        value={action.config.requestHeaders || ""}
                        onChange={(e) =>
                          setRule({
                            ...rule,
                            actions: rule.actions.map((a, i) =>
                              i === index
                                ? {
                                    ...a,
                                    config: {
                                      ...a.config,
                                      requestHeaders: e.target.value,
                                    },
                                  }
                                : a
                            ),
                          })
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
                        value={action.config.requestBody || ""}
                        onChange={(e) =>
                          setRule({
                            ...rule,
                            actions: rule.actions.map((a, i) =>
                              i === index
                                ? {
                                    ...a,
                                    config: {
                                      ...a.config,
                                      requestBody: e.target.value,
                                    },
                                  }
                                : a
                            ),
                          })
                        }
                        placeholder='e.g., { "key": "value" }'
                        bg="background.dark"
                        color="text.primary"
                      />
                    </FormControl>
                    <FormControl mt={3}>
                      <FormLabel>Response Data Path</FormLabel>
                      <Input
                        name="responseDataPath"
                        value={action.config.responseDataPath || ""}
                        onChange={(e) =>
                          setRule({
                            ...rule,
                            actions: rule.actions.map((a, i) =>
                              i === index
                                ? {
                                    ...a,
                                    config: {
                                      ...a.config,
                                      responseDataPath: e.target.value,
                                    },
                                  }
                                : a
                            ),
                          })
                        }
                        placeholder="e.g., data.isValid"
                        bg="background.dark"
                        color="text.primary"
                      />
                    </FormControl>
                    <FormControl mt={3}>
                      <FormLabel>Condition</FormLabel>
                      <Select
                        name="condition"
                        value={action.config.condition || "eq"}
                        onChange={(e) =>
                          setRule({
                            ...rule,
                            actions: rule.actions.map((a, i) =>
                              i === index
                                ? {
                                    ...a,
                                    config: {
                                      ...a.config,
                                      condition: e.target.value,
                                    },
                                  }
                                : a
                            ),
                          })
                        }
                        bg="background.dark"
                        color="text.primary"
                      >
                        <option value="eq">Equal to</option>
                        <option value="gt">Greater than</option>
                        <option value="lt">Less than</option>
                      </Select>
                    </FormControl>
                    <FormControl mt={3}>
                      <FormLabel>Expected Value</FormLabel>
                      <Input
                        name="expectedValue"
                        value={action.config.expectedValue || ""}
                        onChange={(e) =>
                          setRule({
                            ...rule,
                            actions: rule.actions.map((a, i) =>
                              i === index
                                ? {
                                    ...a,
                                    config: {
                                      ...a.config,
                                      expectedValue: e.target.value,
                                    },
                                  }
                                : a
                            ),
                          })
                        }
                        placeholder="e.g., true"
                        bg="background.dark"
                        color="text.primary"
                      />
                    </FormControl>
                    <FormControl>
                    <FormLabel>Expected Value Type</FormLabel>
                      <Select
                        name="expectedValueType"
                        value={action.config.expectedValueType || "string"}
                        onChange={(e) =>
                          setRule({
                            ...rule,
                            actions: rule.actions.map((a, i) =>
                              i === index
                                ? {
                                    ...a,
                                    config: {
                                      ...a.config,
                                      expectedValueType: e.target.value,
                                    },
                                  }
                                : a
                            ),
                          })
                        }
                        bg="background.dark"
                        color="text.primary"
                      >
                        <option value="string">String</option>
                        <option value="number">Number</option>
                        <option value="boolean">Boolean</option>
                      </Select>
                     </FormControl>
   
                    {/* Error Message */}
                    <FormControl mt={3}>
                      <FormLabel>Error Message</FormLabel>
                      <Input
                        name="errorMessage"
                        value={action.config.errorMessage || ""}
                        onChange={(e) =>
                          setRule({
                            ...rule,
                            actions: rule.actions.map((a, i) =>
                              i === index
                                ? {
                                    ...a,
                                    config: {
                                      ...a.config,
                                      errorMessage: e.target.value,
                                    },
                                  }
                                : a
                            ),
                          })
                        }
                        placeholder="Error message to display"
                        bg="background.dark"
                        color="text.primary"
                      />
                    </FormControl>
                  </>
                )}

                {action.type === "populateField" && (
                  <>
                    <FormControl mt={3}>
                      <FormLabel>Target Field</FormLabel>
                      <Input
                        name="targetField"
                        value={action.config.targetField || ""}
                        onChange={(e) =>
                          setRule({
                            ...rule,
                            actions: rule.actions.map((a, i) =>
                              i === index
                                ? {
                                    ...a,
                                    config: {
                                      ...a.config,
                                      targetField: e.target.value,
                                    },
                                  }
                                : a
                            ),
                          })
                        }
                        placeholder="e.g., zipCode"
                        bg="background.dark"
                        color="text.primary"
                      />
                    </FormControl>
                    {/* You can add more fields here if needed */}
                  </>
                )}
              </Box>
            ))}
            <Button
              variant="outline"
              colorScheme="primary"
              onClick={() =>
                setRule({
                  ...rule,
                  actions: [...rule.actions, { type: "", config: {} }],
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

export default RuleConfig;