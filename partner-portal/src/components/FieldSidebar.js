// components/FieldSidebar.js
import React, { useState } from "react";
import { Box, Heading, Button } from "@chakra-ui/react";
import PincodeFieldConfig from "./fields/pincode-form";
import { usePartnerStore } from "../store";
import SocialSecurityNumberConfig from "./fields/social-security-number-form";

const fields = [
  { label: "SSN", type: "ssn" },
  {  label: "Pincode", type: "pincode" },
];

const FieldSidebar = ({
  selectedField,
  onFieldSelect,
  onSaveField,
  onCancel,
  activeScreenIndex,
  showFieldModal
}) => {
  const partnerDraft = usePartnerStore((state) => state.partnerDraft);
  const updatePartnerDraft = usePartnerStore(
    (state) => state.updatePartnerDraft
  );

  const [showModal, setShowModal] = useState(showFieldModal || false);


  const handleSaveField = (fieldAttributes, fieldRules = []) => {
    const currentScreen = partnerDraft.screens[activeScreenIndex];
    if (!currentScreen) {
      return;
    }

    // Prepare field data to save, embedding attributes and rules inside `field_config`
    const fieldData = {
      ...selectedField,
      field_config: {
        attributes: fieldAttributes,
        rules: fieldRules,
      },
    };


    // Find the index of the existing field in the current screen
    const existingFieldIndex = currentScreen.fields.findIndex(
      (field) => field.id === selectedField.id
    );

    const updatedFields = [...currentScreen.fields];

    if (existingFieldIndex !== -1) {
      // Update existing field
      updatedFields[existingFieldIndex] = fieldData;
    } else {
      // Add new field if it doesn't exist
      updatedFields.push(fieldData);
    }



    // Create a new screens array with updated fields for the active screen
    const updatedScreens = partnerDraft.screens.map((screen, idx) =>
      idx === activeScreenIndex
        ? {
            ...screen,
            fields: updatedFields,
          }
        : screen
    );


    // Update partnerDraft with updated screens
    updatePartnerDraft({ screens: updatedScreens });

    // Call the onSaveField function passed as a prop
    onSaveField(fieldData);
  };

  const handleDrag = (fields) => {
    const currentScreen = partnerDraft.screens[activeScreenIndex];
    if (!currentScreen) {
      return;
    }

    const updatedScreens = partnerDraft.screens.map((screen, idx) =>
      idx === activeScreenIndex
        ? {
            ...screen,
            fields,
          }
        : screen
    );

    // Update partnerDraft with updated screens
    updatePartnerDraft({ screens: updatedScreens });
  }

  if (selectedField && selectedField.type === "pincode") {
    return (
      <PincodeFieldConfig
        onSave={handleSaveField}
        onDrag={handleDrag}
        onCancel={onCancel}
        showModal={showModal}
        fieldData={selectedField}
      />
    );
  }

  if (selectedField?.type === "ssn") {
    return (
      <SocialSecurityNumberConfig
        onSave={handleSaveField}
        onDrag={handleDrag}
        onCancel={onCancel}
        showModal={showModal}
        fieldData={selectedField}
      />
    )
  }

  // Default view when no field is selected
  return (
    <Box
      height="100vh"
      py={4}
      width="300px"
      overflowY="auto"
      p={4}
      bg="background.gray"
      color="text.primary"
    >
      <Heading size="md" mb={4}>
        Add Field
      </Heading>
      {fields.map((field) => (
        <Button
          key={field.id}
          onClick={() => onFieldSelect(field, activeScreenIndex)}
          width="100%"
          mb={2}
          bg="secondary.200"
          color="text.primary"
          _hover={{ bg: "secondary.100" }}
        >
          {field.label}
        </Button>
      ))}
    </Box>
  );
};

export default FieldSidebar;