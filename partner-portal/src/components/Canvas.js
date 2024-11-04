// components/Canvas.js
import { Box, Button } from "@chakra-ui/react";
import { useDroppable, useDndMonitor } from "@dnd-kit/core";
import { useState } from "react";

const Canvas = ({ activeScreen, globalSettings }) => {
  const [fields, setFields] = useState([]);
  const { isOver, setNodeRef } = useDroppable({
    id: `canvas-${activeScreen}`,
  });

  useDndMonitor({
    onDragEnd(event) {
      if (event.over && event.over.id === `canvas-${activeScreen}`) {
        setFields([...fields, event.active.data.current]);
      }
    },
  });

  const handleSave = () => {
    // Logic to save fields to backend
    alert(globalSettings.successMessage || "Form submitted successfully!");
  };

  return (
    <Box
      ref={setNodeRef}
      p={4}
      flex="1"
      bg={isOver ? "primary.100" : "background.light"}
      minHeight="calc(100vh - 100px)"
      overflowY="auto"
      width={`${globalSettings.layoutWidth || 100}%`}
      mx="auto"
    >
      {fields.map((field, index) => (
        <Box
          key={index}
          p={4}
          bg="background.dark"
          mb={2}
          borderRadius="md"
          borderWidth="1px"
          borderColor="gray.200"
        >
          {field.label}
        </Box>
      ))}
      <Button mt={4} colorScheme="primary" onClick={handleSave}>
        Save
      </Button>
    </Box>
  );
};

export default Canvas;