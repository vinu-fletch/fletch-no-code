import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
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
import {
  DragOverlay,
  DndContext,
  closestCenter,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const PincodeFieldConfig = ({
  showModal,
  onSave,
  onDrag,
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
  const [activeId, setActiveId] = useState(null);

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

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragOver = (event) => {
    const { over } = event;
    setActiveId(over?.id ?? null);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = rules.findIndex((rule, i) => i === parseInt(active.id));
      const newIndex = rules.findIndex((rule, i) => i === parseInt(over?.id ?? ""));
      const newRules = arrayMove(rules, oldIndex, newIndex);
      setRules(newRules);
      onDrag(newRules);
    }
    setActiveId(null);
  };

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
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDragEnd={handleDragEnd}
                  >
                    <SortableContext
                      items={rules.map((_, index) => index.toString())}
                      strategy={verticalListSortingStrategy}
                    >
                      <VStack align="stretch" spacing={3}>
                        {rules.map((rule, index) => (
                          <SortableRuleItem
                            key={index}
                            rule={rule}
                            index={index.toString()}
                            onEdit={() => handleEditRule(index)}
                            onDelete={() => handleDeleteRule(index)}
                            isActiveDrag={activeId === index.toString()}
                          />
                        ))}
                      </VStack>
                    </SortableContext>
                  </DndContext>

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

const SortableRuleItem = ({
  rule,
  index,
  onEdit,
  onDelete,
  isActiveDrag,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: index });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    onEdit();
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <Box
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      p={2}
      bg={isActiveDrag ? "gray.600" : "gray.700"}
      borderRadius="md"
      mb={2}
      color="white"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Text flex="1">
        {rule.type} - {rule.trigger}
      </Text>
      <HStack spacing={2}>
        <IconButton
          icon={<EditIcon />}
          size="sm"
          onClick={handleEditClick}
          aria-label="Edit Rule"
        />
        <IconButton
          icon={<DeleteIcon />}
          size="sm"
          onClick={handleDeleteClick}
          aria-label="Delete Rule"
        />
      </HStack>
    </Box>
  );
};

export default PincodeFieldConfig;