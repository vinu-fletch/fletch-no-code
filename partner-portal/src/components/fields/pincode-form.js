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
  Textarea,
  Select,
  Collapse,
} from "@chakra-ui/react";
import PincodeRuleConfig from "./pincode-rule-form";

const PincodeFieldConfig = ({ onSave, onCancel }) => {
  const [fieldAttributes, setFieldAttributes] = useState({});
  const [showRuleConfig, setShowRuleConfig] = useState(false);
  const [rules, setRules] = useState([]);

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

  const handleAddRule = () => {
    setShowRuleConfig(true);
  };

  const handleRuleSave = (rule) => {
    setRules([rule]); // For now, we only handle one rule
    setShowRuleConfig(false);
  };

  const handleSave = () => {
    onSave({ ...fieldAttributes, rules });
  };

  return (
    <Box width="300px" p={4} bg="background.dark" color="text.primary">
      <Heading size="md" mb={4}>
        Configure Pincode Field
      </Heading>
      <VStack spacing={3} align="stretch">
        {/* Attributes */}
        <FormControl>
          <FormLabel>Label</FormLabel>
          <Input
            name="label"
            value={fieldAttributes.label || ""}
            onChange={handleInputChange}
            bg="background.light"
            color="text.primary"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            name="name"
            value={fieldAttributes.name || ""}
            onChange={handleInputChange}
            bg="background.light"
            color="text.primary"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Placeholder</FormLabel>
          <Input
            name="placeholder"
            value={fieldAttributes.placeholder || ""}
            onChange={handleInputChange}
            bg="background.light"
            color="text.primary"
          />
        </FormControl>

        <FormControl display="flex" alignItems="center">
          <FormLabel mb="0">Required</FormLabel>
          <Switch
            name="required"
            isChecked={fieldAttributes.required || false}
            onChange={handleCheckboxChange}
            colorScheme="primary"
          />
        </FormControl>

        {/* Styles */}
        <Heading size="sm" mt={4}>
          Styles
        </Heading>

        <FormControl>
          <FormLabel>Width</FormLabel>
          <Input
            name="width"
            value={fieldAttributes.style?.width || ""}
            onChange={handleStyleChange}
            placeholder="e.g., 100%, 200px"
            bg="background.light"
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
            bg="background.light"
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
            bg="background.light"
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
            bg="background.light"
            color="text.primary"
          />
        </FormControl>

        {/* Rules */}
        <Button
          variant="outline"
          colorScheme="primary"
          onClick={handleAddRule}
          mt={4}
        >
          Add Validation Rule
        </Button>

        {/* Rule Configuration */}
        <Collapse in={showRuleConfig} animateOpacity>
          <PincodeRuleConfig onSave={handleRuleSave} />
        </Collapse>

        {/* Action Buttons */}
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