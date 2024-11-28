import React, { useState, useEffect } from "react";
import {
  Box,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Switch,
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
import RuleConfig from "../rules/field-rules-config";
import { List, arrayMove } from "react-movable";

const SocialSecurityNumberConfig = ({
  showModal,
  onSave,
  onCancel,
  fieldData = {},
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure({
    defaultIsOpen: showModal || true,
  });
  
  const [fieldName, setFieldName] = useState("");

  const [fieldAttributes, setFieldAttributes] = useState({});
  const [rules, setRules] = useState([]);
  const [editingRuleIndex, setEditingRuleIndex] = useState(null);
  const [showRuleConfig, setShowRuleConfig] = useState(false);

  
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
        <ModalHeader>Configure Social Security Number Field</ModalHeader>
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
                    <FormLabel>Form Name</FormLabel>
                    <Input
                      name="name"
                      value={fieldAttributes.name || ""}
                      onChange={handleInputChange}
                      bg="gray.700"
                      color="white"
                    />
                  </FormControl>


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

                  <FormControl display="flex" alignItems="center">
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
                    <FormLabel>Height of Individual Fields</FormLabel>
                    <Input
                      name="fieldHeight"
                      value={fieldAttributes.fieldHeight || ""}
                      onChange={handleInputChange}
                      placeholder="e.g., 50px"
                      bg="gray.700"
                      color="white"
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Width of Individual Fields</FormLabel>
                    <Input
                      name="fieldWidth"
                      value={fieldAttributes.fieldWidth || ""}
                      onChange={handleInputChange}
                      placeholder="e.g., 50px"
                      bg="gray.700"
                      color="white"
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Border Radius</FormLabel>
                    <Input
                      name="borderRadius"
                      value={fieldAttributes.borderRadius || ""}
                      onChange={handleInputChange}
                      placeholder="e.g., 4px, 50%"
                      bg="gray.700"
                      color="white"
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Border Color</FormLabel>
                    <Input
                      name="borderColor"
                      value={fieldAttributes.borderColor || ""}
                      onChange={handleInputChange}
                      placeholder="e.g., #000000"
                      bg="gray.700"
                      color="white"
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Background Color for All Fields</FormLabel>
                    <Input
                      name="backgroundColor"
                      value={fieldAttributes.backgroundColor || ""}
                      onChange={handleInputChange}
                      placeholder="e.g., #ffffff"
                      bg="gray.700"
                      color="white"
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Input Text Color</FormLabel>
                    <Input
                      name="inputTextColor"
                      value={fieldAttributes.inputTextColor || ""}
                      onChange={handleInputChange}
                      placeholder="e.g., #000000"
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

export default SocialSecurityNumberConfig;