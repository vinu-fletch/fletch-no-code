// components/Canvas.js
import { Box, Button } from "@chakra-ui/react";
import { useDroppable, useDndMonitor } from "@dnd-kit/core";
import { useState } from "react";

const Canvas = ({ activeScreen }) => {
  const [fields, setFields] = useState([]);
  const { isOver, setNodeRef } = useDroppable({
    id: `canvas-${activeScreen}`,
  });

  const handleSave = () => {
    // Logic to save fields to backend
    alert("Form saved!");
  };

  useDndMonitor({
    onDragEnd(event) {
      if (event.over && event.over.id === `canvas-${activeScreen}`) {
        setFields([...fields, event.active.data.current]);
      }
    },
  });

  return (
    <Box
      ref={setNodeRef}
      p={4}
      flex="1"
      bg={isOver ? "green.50" : "white"}
      minHeight="calc(100vh - 100px)"
    >
      {fields.map((field, index) => (
        <Box key={index} p={2} bg="gray.100" mb={2} borderRadius="md">
          {field.label}
        </Box>
      ))}
      <Button mt={4} colorScheme="blue" onClick={handleSave}>
        Save
      </Button>
    </Box>
  );
};

export default Canvas;