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
      p={2}
      bg="gray.200"
      mb={2}
      borderRadius="md"
      cursor="grab"
    >
      {label}
    </Box>
  );
};

const Sidebar = () => {
  return (
    <Box width="250px" p={4} bg="gray.50">
      <Heading size="md" mb={4}>
        Fields
      </Heading>
      <DraggableField id="ssn" label="SSN" />
      <DraggableField id="pincode" label="Pincode" />
    </Box>
  );
};

export default Sidebar;