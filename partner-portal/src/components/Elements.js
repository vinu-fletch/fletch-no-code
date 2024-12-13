import React from "react";
import { Box, Heading, Button } from "@chakra-ui/react";

const fields = [
  { label: "SSN", type: "ssn" },
  { label: "Text", type: "text" },
  { label: "Hidden", type: "hidden" },
];

const Elements = ({ onFieldSelect, activeScreenIndex }) => {
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

export default Elements;
