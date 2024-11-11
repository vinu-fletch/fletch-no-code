import React, { useState, useEffect } from "react";
import {
  Box,
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { AddIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import RuleConfig from "../rules/rules-config";
import { List, arrayMove } from "react-movable";

const PincodeFieldConfig = ({
  showModal,
  onSave,
  onCancel,
  fieldData = {},
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure({
    defaultIsOpen: showModal || true,
  });

  const [fieldAttributes, setFieldAttributes] = useState({});
  const [rules, setRules] = useState([]);
  const [editingRuleIndex, setEditingRuleIndex] = useState(null);
  const [showRuleConfig, setShowRuleConfig] = useState(false);

  // Initialize form fields with fieldData only once when fieldData changes
  useEffect(() => {
    if (fieldData.field_config) {
      setFieldAttributes(fieldData.field_config.attributes || {});
      setRules(fieldData.field_config.rules || []);
    }
  }, [fieldData]);

  useEffect(() => {
    if (showModal) {
      onOpen();
    }
  }, [showModal, onOpen]);

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
    setEditingRuleIndex(rules.length);
    setShowRuleConfig(true);
  };

  const handleEditRule = (index) => {
    setEditingRuleIndex(index);
    setShowRuleConfig(true);
  };

  const handleDeleteRule = (index) => {
    const newRules = [...rules];
    newRules.splice(index, 1);
    setRules(newRules);
  };

  const handleRuleSave = (rule) => {
    const newRules = [...rules];
    newRules[editingRuleIndex] = rule;
    setRules(newRules);
    setShowRuleConfig(false);
    setEditingRuleIndex(null);
  };

  const handleRuleCancel = () => {
    setShowRuleConfig(false);
    setEditingRuleIndex(null);
  };

  const handleSave = () => {
    onSave(fieldAttributes, rules);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onCancel || onClose} size="xl">
      <ModalOverlay bg="rgba(0, 0, 0, 0.8)" />
      <ModalContent bg="gray.800" color="white">
        <ModalHeader>Configure Pincode Field</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
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
                      bg="gray.700"
                      color="white"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Placeholder</FormLabel>
                    <Input
                      name="placeholder"
                      value={fieldAttributes.placeholder || ""}
                      onChange={handleInputChange}
                      bg="gray.700"
                      color="white"
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
                      bg="gray.700"
                      color="white"
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Height</FormLabel>
                    <Input
                      name="height"
                      value={fieldAttributes.style?.height || ""}
                      onChange={handleStyleChange}
                      placeholder="e.g., auto, 50px"
                      bg="gray.700"
                      color="white"
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Background Color</FormLabel>
                    <Input
                      name="backgroundColor"
                      value={fieldAttributes.style?.backgroundColor || ""}
                      onChange={handleStyleChange}
                      placeholder="e.g., #ffffff"
                      bg="gray.700"
                      color="white"
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Text Color</FormLabel>
                    <Input
                      name="textColor"
                      value={fieldAttributes.style?.textColor || ""}
                      onChange={handleStyleChange}
                      placeholder="e.g., #000000"
                      bg="gray.700"
                      color="white"
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Placeholder Position</FormLabel>
                    <Select
                      name="placeholderPosition"
                      value={fieldAttributes.style?.placeholderPosition || ""}
                      onChange={handleStyleChange}
                      placeholder="Select position"
                      bg="gray.700"
                      color="white"
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
                      bg="gray.700"
                      color="white"
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
                  <List
                    values={rules}
                    onChange={({ oldIndex, newIndex }) => {
                      const newRules = arrayMove(rules, oldIndex, newIndex);
                      setRules(newRules);
                    }}
                    renderList={({ children, props }) => (
                      <VStack align="stretch" spacing={3} {...props}>
                        {children}
                      </VStack>
                    )}
                    renderItem={({ value, props, index }) => (
                      <Box
                        p={2}
                        bg="gray.700"
                        borderRadius="md"
                        color="white"
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        {...props}
                      >
                        <Text flex="1">
                          {value.type} - {value.trigger}
                        </Text>
                        <HStack spacing={2}>
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
                      </Box>
                    )}
                  />

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
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="primary" mr={3} onClick={handleSave}>
            Save
          </Button>
          <Button variant="outline" onClick={onCancel || onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PincodeFieldConfig;