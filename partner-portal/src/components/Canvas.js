// components/Canvas.js

import { Box, Heading, Text } from "@chakra-ui/react";

const Canvas = ({ screens, activeScreenIndex, globalSettings }) => {
  const currentScreen = screens[activeScreenIndex];

  return (
    <Box
      flex="1"
      minHeight="calc(100vh - 100px)"
      overflowY="auto"
      bg={currentScreen?.backgroundColor || "background.dark"}
      p={4}
      color="text.primary"
    >
      {/* Heading */}
      {currentScreen?.heading && (
        <Heading size="lg" mb={4}>
          {currentScreen?.heading}
        </Heading>
      )}

      {/* Fields Display */}
      {currentScreen?.fields?.length === 0 ? (
        <Text color="text.secondary">No fields added yet.</Text>
      ) : (
        currentScreen?.fields?.map((field, index) => (
          <Box
            key={index}
            p={4}
            bg="background.dark"
            color="text.primary"
            mb={2}
            borderRadius="md"
            borderWidth="1px"
            borderColor="primary.200"
          >
            <Text fontSize="lg" fontWeight="bold">
              {field?.field_config?.attributes?.label || `Field ${index + 1}`}
            </Text>
            {/* Display additional field attributes if needed */}
          </Box>
        ))
      )}
    </Box>
  );
};

export default Canvas;