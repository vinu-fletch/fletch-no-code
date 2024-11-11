// components/FieldSidebar.js

import { Box, Heading, Button } from "@chakra-ui/react";
import PincodeFieldConfig from "./fields/pincode-form";

const fields = [
  { id: "ssn", label: "SSN", type: "ssn" },
  { id: "pincode", label: "Pincode", type: "pincode" },
];

const FieldSidebar = ({
  selectedField,
  onFieldSelect,
  onSaveField,
  onCancel,
}) => {
  if (selectedField && selectedField.type === "pincode") {
    return (
      <PincodeFieldConfig
        onSave={(fieldAttributes) => {
          onSaveField({
            ...selectedField,
            attributes: fieldAttributes,
          });
        }}
        onCancel={onCancel}
      />
    );
  }

  // Default view when no field is selected
  return (
    <Box height="100vh" py={4} width="300px" overflowY="auto" p={4} bg="background.gray" color="text.primary">
      <Heading size="md" mb={4}>
        Add Field
      </Heading>
      {fields.map((field) => (
        <Button
          key={field.id}
          onClick={() => onFieldSelect(field)}
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