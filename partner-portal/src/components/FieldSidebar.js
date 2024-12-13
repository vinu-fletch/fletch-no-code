import React, { useState } from "react";
import { Box, Heading, Button } from "@chakra-ui/react";
import HiddenField from "./fields/hidden-form/hidden-form";
import { usePartnerStore } from "../store";
import SocialSecurityNumber from "./fields/social-security-number/social-security-number-form";
import TextField from "./fields/text-from/text-form";

const fields = [
  { label: "SSN", type: "ssn" },
  { label: "Text", type: "text" },
  { label: "Hidden", type: "hidden" },
];

const FieldSidebar = ({
  selectedField,
  onFieldSelect,
  onSaveField,
  onCancel,
  activeScreenIndex,
  showFieldModal,
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

    const fieldData = {
      ...selectedField,
      field_config: {
        attributes: fieldAttributes,
        rules: fieldRules,
      },
    };

    const existingFieldIndex = currentScreen.fields.findIndex(
      (field) => field.id === selectedField.id
    );

    const updatedFields = [...currentScreen.fields];

    if (existingFieldIndex !== -1) {
      updatedFields[existingFieldIndex] = fieldData;
    } else {
      updatedFields.push(fieldData);
    }

    const updatedScreens = partnerDraft.screens.map((screen, idx) =>
      idx === activeScreenIndex
        ? {
            ...screen,
            fields: updatedFields,
          }
        : screen
    );

    updatePartnerDraft({ screens: updatedScreens });

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

    updatePartnerDraft({ screens: updatedScreens });
  };

  if (selectedField && selectedField.type === "text") {
    return (
      <TextField
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
      <SocialSecurityNumber
        onSave={handleSaveField}
        onDrag={handleDrag}
        onCancel={onCancel}
        showModal={showModal}
        fieldData={selectedField}
      />
    );
  }

  if (selectedField?.type === "hidden") {
    return (
      <HiddenField
        onSave={handleSaveField}
        onCancel={onCancel}
        showModal={showModal}
        fieldData={selectedField}
      />
    );
  }

  return null;
};

export default FieldSidebar;
