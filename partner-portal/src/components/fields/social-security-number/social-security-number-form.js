import React, { useState, useEffect } from "react";
import { Box, HStack, Button, useDisclosure } from "@chakra-ui/react";
import SocialSecurityNumberValidation from "./social-security-number-form-validation";
import SocialSecurityNumberProperties from "./social-security-number-form-properties";

const SocialSecurityNumber = ({
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
  const [menuSelected, setMenuSelected] = useState("properties");
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
        <SocialSecurityNumberProperties
          handleInputChange={handleInputChange}
          handleCheckboxChange={handleCheckboxChange}
          fieldAttributes={fieldAttributes}
        ></SocialSecurityNumberProperties>
      ) : (
        <SocialSecurityNumberValidation
          showModal={showModal}
          rules={rules}
          setRules={setRules}
          editingRuleIndex={editingRuleIndex}
          handleEditRule={handleEditRule}
          handleDeleteRule={handleDeleteRule}
          handleRuleSave={handleRuleSave}
          handleRuleCancel={handleRuleCancel}
          handleAddRule={handleAddRule}
          showRuleConfig={showRuleConfig}
        ></SocialSecurityNumberValidation>
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

export default SocialSecurityNumber;
