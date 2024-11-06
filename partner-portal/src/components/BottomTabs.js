// components/BottomTabs.js

import { useState } from "react";
import {
  Flex,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Editable,
  EditableInput,
  EditablePreview,
  Box,
} from "@chakra-ui/react";

const BottomTabs = ({
  screens,
  setScreens,
  activeScreenIndex,
  setActiveScreenIndex,
}) => {
  const [contextMenuIndex, setContextMenuIndex] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);

  const addScreen = () => {
    const newScreen = {
      name: `Screen ${screens.length + 1}`,
      backgroundColor: "",
      heading: "",
      fields: [],
    };
    setScreens([...screens, newScreen]);
    setActiveScreenIndex(screens.length); // Set to the new screen
  };

  const deleteScreen = (index) => {
    if (screens.length > 1) {
      const updatedScreens = screens.filter((_, i) => i !== index);
      setScreens(updatedScreens);

      // Adjust active screen index if the deleted screen was active or if it's the last screen
      if (index === activeScreenIndex) {
        setActiveScreenIndex(Math.max(0, index - 1));
      } else if (index < activeScreenIndex) {
        setActiveScreenIndex(activeScreenIndex - 1);
      }
    }
    setContextMenuIndex(null); // Close context menu
  };

  const cloneScreen = (index) => {
    const screenToClone = screens[index];
    const clonedScreen = {
      ...screenToClone,
      name: `${screenToClone.name} (Copy)`,
    };
    const updatedScreens = [
      ...screens.slice(0, index + 1),
      clonedScreen,
      ...screens.slice(index + 1),
    ];
    setScreens(updatedScreens);
    setActiveScreenIndex(index + 1); // Set focus on the cloned screen
    setContextMenuIndex(null); // Close context menu
  };

  const handleContextMenu = (event, index) => {
    event.preventDefault();
    setContextMenuIndex(index);
  };

  const handleNameChange = (newName, index) => {
    const updatedScreens = screens.map((screen, i) =>
      i === index ? { ...screen, name: newName } : screen
    );
    setScreens(updatedScreens);
    setEditingIndex(null); // Exit edit mode
  };

  const handleStartEditing = (index) => {
    setEditingIndex(index);
  };

  return (
    <Flex
      position="fixed"
      bottom="0"
      width="100%"
      bg="background.dark"
      p={2}
      alignItems="center"
      color="text.primary"
    >
      {screens.map((screen, index) => (
        <Menu
          key={`${screen.name}-${index}`}
          isOpen={contextMenuIndex === index}
        >
          <MenuButton
            as={Button}
            onClick={() => setActiveScreenIndex(index)}
            onContextMenu={(event) => handleContextMenu(event, index)}
            variant={activeScreenIndex === index ? "outline" : "solid"}
            colorScheme="primary"
            mr={2}
          >
            <Editable
              value={screen.name}
              isEditing={editingIndex === index}
              onSubmit={(newName) => handleNameChange(newName, index)}
            >
              <Box onDoubleClick={() => handleStartEditing(index)}>
                <EditablePreview />
              </Box>
              <EditableInput />
            </Editable>
          </MenuButton>
          <MenuList
            bg="gray.800"
            color="white"
            borderColor="gray.600"
            onMouseLeave={() => setContextMenuIndex(null)} // Close menu when mouse leaves
            onClose={() => setContextMenuIndex(null)}
          >
            <MenuItem
              onClick={() => cloneScreen(index)}
              _hover={{ bg: "gray.700" }}
              bg="gray.800"
              color="white"
            >
              Clone Screen
            </MenuItem>
            <MenuItem
              onClick={() => deleteScreen(index)}
              _hover={{ bg: "gray.700" }}
              bg="gray.800"
              color="white"
            >
              Delete Screen
            </MenuItem>
          </MenuList>
        </Menu>
      ))}
      <Button colorScheme="secondary" onClick={addScreen}>
        + Add Screen
      </Button>
    </Flex>
  );
};

export default BottomTabs;