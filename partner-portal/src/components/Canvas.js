import { Box, Heading, Text, IconButton, HStack } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { usePartnerStore } from "../store"; // Import your store

const Canvas = ({ screens, activeScreenIndex, globalSettings }) => {
  const currentScreen = screens[activeScreenIndex];
  const updatePartnerDraft = usePartnerStore((state) => state.updatePartnerDraft);

  const handleDeleteField = (fieldId) => {
    const updatedFields = currentScreen.fields.filter((field) => field.id !== fieldId);
    const updatedFieldIds = currentScreen.field_ids.filter((id) => id !== fieldId);

    // Create a new screens array with updated fields and field_ids for the active screen
    const updatedScreens = screens.map((screen, idx) =>
      idx === activeScreenIndex
        ? { ...screen, fields: updatedFields, field_ids: updatedFieldIds }
        : screen
    );

    console.log("Updated screens", updatedScreens);

    // Update partnerDraft with updated screens
    updatePartnerDraft({ screens: updatedScreens });
  };

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
          <HStack
            key={index}
            p={4}
            bg="background.dark"
            color="text.primary"
            mb={2}
            borderRadius="md"
            borderWidth="1px"
            borderColor="primary.200"
            justify="space-between"
          >
            <Text fontSize="lg" fontWeight="bold">
              {field?.field_config?.attributes?.label || `Field ${index + 1}`}
            </Text>
            <IconButton
              icon={<DeleteIcon />}
              aria-label="Delete field"
              colorScheme="red"
              onClick={() => handleDeleteField(field.id)}
            />
          </HStack>
        ))
      )}
    </Box>
  );
};

export default Canvas;