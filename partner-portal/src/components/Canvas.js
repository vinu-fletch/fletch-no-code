import React from "react";
import {
  Box,
  Heading,
  Text,
  IconButton,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { usePartnerStore } from "../store";
import { List, arrayMove } from "react-movable";

const Canvas = ({ screens, activeScreenIndex, onEditField }) => {
  const currentScreen = screens[activeScreenIndex];
  const updatePartnerDraft = usePartnerStore(
    (state) => state.updatePartnerDraft
  );

  const handleDeleteField = (fieldId) => {
    const updatedFields = currentScreen.fields.filter(
      (field) => field.id !== fieldId
    );
    const updatedFieldIds = currentScreen.field_ids.filter(
      (id) => id !== fieldId
    );

    // Create a new screens array with updated fields and field_ids for the active screen
    const updatedScreens = screens.map((screen, idx) =>
      idx === activeScreenIndex
        ? { ...screen, fields: updatedFields, field_ids: updatedFieldIds }
        : screen
    );

    // Update partnerDraft with updated screens
    updatePartnerDraft({ screens: updatedScreens });
  };

  const handleFieldOrderChange = ({ oldIndex, newIndex }) => {
    const updatedFields = arrayMove(currentScreen.fields, oldIndex, newIndex);
    const updatedFieldIds = updatedFields.map((field) => field.id);

    // Create a new screens array with updated fields and field_ids for the active screen
    const updatedScreens = screens.map((screen, idx) =>
      idx === activeScreenIndex
        ? { ...screen, fields: updatedFields, field_ids: updatedFieldIds }
        : screen
    );

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
        <List
          values={currentScreen?.fields}
          onChange={handleFieldOrderChange}
          renderList={({ children, props }) => (
            <VStack align="stretch" spacing={3} {...props}>
              {children}
            </VStack>
          )}
          renderItem={({ value, index, props }) => (
            <HStack
              key={value.id}
              p={4}
              bg="background.dark"
              color="text.primary"
              mb={2}
              borderRadius="md"
              borderWidth="1px"
              borderColor="primary.200"
              justify="space-between"
              {...props}
            >
              <Text fontSize="lg" fontWeight="bold">
                {value?.field_config?.attributes?.label || `Field ${index + 1}`}
              </Text>
              <Box>
                <IconButton
                  mr="4"
                  icon={<EditIcon />}
                  aria-label="Edit field"
                  colorScheme="teal"
                  onClick={() => onEditField(value)}
                />
                <IconButton
                  icon={<DeleteIcon />}
                  aria-label="Delete field"
                  colorScheme="red"
                  onClick={() => handleDeleteField(value.id)}
                />
              </Box>
            </HStack>
          )}
        />
      )}
    </Box>
  );
};

export default Canvas;