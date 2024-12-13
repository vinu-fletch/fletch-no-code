import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  HStack,
} from "@chakra-ui/react";

const HiddenField = ({ showModal, onSave, onCancel, fieldData = {} }) => {
  const { isOpen, onOpen, onClose } = useDisclosure({
    defaultIsOpen: showModal || true,
  });

  const [fieldName, setFieldName] = useState("");
  const [menuSelected, setMenuSelected] = useState("properties");

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
    <Box
      p={4}
      color="text.primary"
      width="100%"
      overflowY="scroll"
      maxHeight="100vh"
    >
      <HStack
        pb={2}
        borderBottom="1px solid"
        borderColor="gray.300"
        justifyContent="space-around"
      >
        <Box
          textAlign="left"
          onClick={() => {
            setMenuSelected("properties");
          }}
          cursor="pointer"
          textDecoration={menuSelected === "properties" ? "underline" : "none"}
          mr={4}
        >
          Properties
        </Box>
        <Box
          textAlign="left"
          onClick={() => {
            setMenuSelected("validation");
          }}
          cursor="pointer"
          textDecoration={menuSelected === "validation" ? "underline" : "none"}
          ml={4}
        >
          Validation
        </Box>
      </HStack>
      {menuSelected === "properties" ? (
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
      ) : (
        <Box>No Rules</Box>
      )}
      <Box>
        <Button colorScheme="primary" mr={3} onClick={handleSave}>
          Save
        </Button>
        <Button variant="outline" onClick={onCancel || onClose}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default HiddenField;
