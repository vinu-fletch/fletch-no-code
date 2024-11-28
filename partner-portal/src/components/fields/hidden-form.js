import React, { useState, useEffect } from "react";
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
} from "@chakra-ui/react";

const HiddenFieldConfig = ({ showModal, onSave, onCancel, fieldData = {} }) => {
  const { isOpen, onOpen, onClose } = useDisclosure({
    defaultIsOpen: showModal || true,
  });

  const [fieldName, setFieldName] = useState("");

  useEffect(() => {
   const name = fieldData?.field_config?.attributes?.name;
    if (name) {
      setFieldName(name);
    }
  }, [fieldData]);

  useEffect(() => {
    if (showModal) {
      onOpen();
    }
  }, [showModal, onOpen]);

  const handleSave = () => {
    if (!fieldName.trim()) {
      alert("Field name is required.");
      return;
    }
    onSave({ name: fieldName });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onCancel || onClose} size="md">
      <ModalOverlay bg="rgba(0, 0, 0, 0.8)" />
      <ModalContent bg="gray.800" color="white">
        <ModalHeader>Configure Hidden Field</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isRequired>
            <FormLabel>Field Name</FormLabel>
            <Input
              name="name"
              value={fieldName}
              onChange={(e) => setFieldName(e.target.value)}
              placeholder="Enter a unique field name"
              bg="gray.700"
              color="white"
            />
          </FormControl>
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

export default HiddenFieldConfig;
