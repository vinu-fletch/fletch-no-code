// components/FieldSidebar.js
import { Box, Heading } from "@chakra-ui/react";
import { useDraggable } from "@dnd-kit/core";

const DraggableField = ({ id, label }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id,
    data: { label },
  });

  return (
    <Box
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      p={4}
      bg="secondary.200"
      mb={2}
      borderRadius="md"
      cursor="grab"
    >
      {label}
    </Box>
  );
};

const FieldSidebar = () => {
  return (
    <Box width="250px" p={4} bg="secondary.100">
      <Heading size="md" mb={4}>
        Fields
      </Heading>
      <DraggableField id="ssn" label="SSN" />
      <DraggableField id="pincode" label="Pincode" />
      {/* Add more fields as needed */}
    </Box>
  );
};

export default FieldSidebar;