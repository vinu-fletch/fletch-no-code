// components/PincodeFieldConfig.js

import { useState } from "react";
import {
  Box,
  Heading,
  Button,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Switch,
  Select,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  HStack,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { AddIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import RuleConfig from "../rules/rules-config";

const PincodeFieldConfig = ({ onSave, onCancel }) => {
  const [fieldAttributes, setFieldAttributes] = useState({});
  const [rules, setRules] = useState([]);
  const [editingRuleIndex, setEditingRuleIndex] = useState(null);
  const [showRuleConfig, setShowRuleConfig] = useState(false);

  const handleInputChange = (e) => {
    setFieldAttributes({
      ...fieldAttributes,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (e) => {
    setFieldAttributes({
      ...fieldAttributes,
      [e.target.name]: e.target.checked,
    });
  };

  const handleStyleChange = (e) => {
    setFieldAttributes({
      ...fieldAttributes,
      style: {
        ...fieldAttributes.style,
        [e.target.name]: e.target.value,
      },
    });
  };

  // Handle adding a new rule
  const handleAddRule = () => {
    setEditingRuleIndex(rules.length); // Index for the new rule
    setShowRuleConfig(true);
  };

  // Handle editing an existing rule
  const handleEditRule = (index) => {
    setEditingRuleIndex(index);
    setShowRuleConfig(true);
  };

  // Handle deleting a rule
  const handleDeleteRule = (index) => {
    const newRules = [...rules];
    newRules.splice(index, 1);
    setRules(newRules);
  };

  // Save a rule after editing or adding
  const handleRuleSave = (rule) => {
    const newRules = [...rules];
    newRules[editingRuleIndex] = rule;
    setRules(newRules);
    setShowRuleConfig(false);
    setEditingRuleIndex(null);
  };

  // Cancel rule editing or adding
  const handleRuleCancel = () => {
    setShowRuleConfig(false);
    setEditingRuleIndex(null);
  };

  const handleSave = () => {
    const fieldConfig = {
      attributes: fieldAttributes,
      rules: rules,
    };
    onSave(fieldConfig);
  };

  return (
    <Box width="400px" p={4} bg="background.dark" color="text.primary">
      <Heading size="md" mb={4}>
        Configure Pincode Field
      </Heading>
      <Accordion allowToggle defaultIndex={[0]}>
        {/* Basic Settings */}
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left" fontWeight="bold">
              Basic Settings
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <VStack spacing={3} align="stretch">
              <FormControl isRequired>
                <FormLabel>Label</FormLabel>
                <Input
                  name="label"
                  value={fieldAttributes.label || ""}
                  onChange={handleInputChange}
                  bg="background.dark"
                  color="text.primary"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Placeholder</FormLabel>
                <Input
                  name="placeholder"
                  value={fieldAttributes.placeholder || ""}
                  onChange={handleInputChange}
                  bg="background.dark"
                  color="text.primary"
                />
              </FormControl>

              <FormControl display="flex" alignItems="center" isRequired>
                <FormLabel mb="0">Required</FormLabel>
                <Switch
                  name="required"
                  isChecked={fieldAttributes.required || false}
                  onChange={handleCheckboxChange}
                  colorScheme="primary"
                />
              </FormControl>
            </VStack>
          </AccordionPanel>
        </AccordionItem>

        {/* Styles */}
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left" fontWeight="bold">
              Styles
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <VStack spacing={3} align="stretch">
              <FormControl>
                <FormLabel>Width</FormLabel>
                <Input
                  name="width"
                  value={fieldAttributes.style?.width || ""}
                  onChange={handleStyleChange}
                  placeholder="e.g., 100%, 200px"
                  bg="background.dark"
                  color="text.primary"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Height</FormLabel>
                <Input
                  name="height"
                  value={fieldAttributes.style?.height || ""}
                  onChange={handleStyleChange}
                  placeholder="e.g., auto, 50px"
                  bg="background.dark"
                  color="text.primary"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Background Color</FormLabel>
                <Input
                  name="backgroundColor"
                  value={fieldAttributes.style?.backgroundColor || ""}
                  onChange={handleStyleChange}
                  placeholder="e.g., #ffffff"
                  bg="background.dark"
                  color="text.primary"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Text Color</FormLabel>
                <Input
                  name="textColor"
                  value={fieldAttributes.style?.textColor || ""}
                  onChange={handleStyleChange}
                  placeholder="e.g., #000000"
                  bg="background.dark"
                  color="text.primary"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Placeholder Position</FormLabel>
                <Select
                  name="placeholderPosition"
                  value={fieldAttributes.style?.placeholderPosition || ""}
                  onChange={handleStyleChange}
                  placeholder="Select position"
                  bg="background.dark"
                  color="text.primary"
                >
                  <option value="inside">Inside Input</option>
                  <option value="onInput">On Input</option>
                  <option value="floating">Floating Label</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Border Radius</FormLabel>
                <Input
                  name="borderRadius"
                  value={fieldAttributes.style?.borderRadius || ""}
                  onChange={handleStyleChange}
                  placeholder="e.g., 4px, 50%"
                  bg="background.dark"
                  color="text.primary"
                />
              </FormControl>
            </VStack>
          </AccordionPanel>
        </AccordionItem>

        {/* Validation Rules */}
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left" fontWeight="bold">
              Validation Rules
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <VStack align="stretch" spacing={3}>
              {rules.map((rule, index) => (
                <HStack key={index} spacing={2}>
                  <Text flex="1">
                    {rule.type} - {rule.trigger}
                  </Text>
                  <IconButton
                    icon={<EditIcon />}
                    size="sm"
                    onClick={() => handleEditRule(index)}
                    aria-label="Edit Rule"
                  />
                  <IconButton
                    icon={<DeleteIcon />}
                    size="sm"
                    onClick={() => handleDeleteRule(index)}
                    aria-label="Delete Rule"
                  />
                </HStack>
              ))}

              <Button
                leftIcon={<AddIcon />}
                variant="outline"
                colorScheme="primary"
                onClick={handleAddRule}
                mt={4}
              >
                Add Validation Rule
              </Button>

              {showRuleConfig && (
                <RuleConfig
                  onSave={handleRuleSave}
                  onCancel={handleRuleCancel}
                  initialRule={rules[editingRuleIndex] || null}
                />
              )}
            </VStack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      {/* Action Buttons */}
      <VStack spacing={3} mt={4}>
        <Button colorScheme="primary" onClick={handleSave}>
          Save
        </Button>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </VStack>
    </Box>
  );
};

export default PincodeFieldConfig;