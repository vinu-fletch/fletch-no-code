// components/FieldSidebar.js

import { Box, Heading, Button } from "@chakra-ui/react";
import PincodeFieldConfig from "./fields/pincode-form";
import { usePartnerStore } from "../store";

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
}) => {
  const partnerDraft = usePartnerStore((state) => state.partnerDraft);
  const updatePartnerDraft = usePartnerStore(
    (state) => state.updatePartnerDraft
  );

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

    console.log({updatedFields, existingFieldIndex, fieldData, fieldAttributes})

    if (existingFieldIndex !== -1) {
      // Update existing field
      updatedFields[existingFieldIndex] = fieldData;
    } else {
      // Add new field if it doesn't exist
      updatedFields.push(fieldData);
    }

    console.log("Partner draft screens before update", partnerDraft.screens);


    // Create a new screens array with updated fields for the active screen
    const updatedScreens = partnerDraft.screens.map((screen, idx) =>
      idx === activeScreenIndex
        ? {
            ...screen,
            fields: updatedFields,
          }
        : screen
    );

    console.log("Partner draft screens after update", updatedScreens);

    // Update partnerDraft with updated screens
    updatePartnerDraft({ screens: updatedScreens });

    // Call the onSaveField function passed as a prop
    onSaveField(fieldData);
  };

  if (selectedField && selectedField.type === "pincode") {
    return (
      <PincodeFieldConfig
        onSave={handleSaveField}
        onCancel={onCancel}
      />
    );
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