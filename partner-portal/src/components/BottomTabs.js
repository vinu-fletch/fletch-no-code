import { useState } from "react";
import {
  Flex,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";

const BottomTabs = ({
  screens,
  setScreens,
  activeScreenIndex,
  setActiveScreenIndex,
}) => {
  const [contextMenuIndex, setContextMenuIndex] = useState(null);

  // Ensure screens have default names based on their index
  const getDefaultScreenName = (index) => `Screen ${index + 1}`;

  // Add a new screen to the screens array
  const addScreen = () => {
    const newScreen = {
      name: getDefaultScreenName(screens.length),
      screen_config: {
        background_color: "",
        heading: "",
        continue_button_text: "",
      },
      fields: [],
    };
    const updatedScreens = [...screens, newScreen];
    setScreens(updatedScreens);
    setActiveScreenIndex(updatedScreens.length - 1); // Set to the new screen
  };

  // Delete a screen by index
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

  // Clone a screen by index
  const cloneScreen = (index) => {
    const screenToClone = screens[index];
    const screenName = screenToClone.name || getDefaultScreenName(index);
    const { id, ...restOfScreen } = screenToClone; // Exclude 'id' to avoid duplication
    const clonedScreen = {
      ...restOfScreen,
      name: `${screenName} (Copy)`,
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

  // Open context menu on right-click
  const handleContextMenu = (event, index) => {
    event.preventDefault();
    setContextMenuIndex(index);
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
          key={`${screen.name || getDefaultScreenName(index)}-${index}`}
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
            {screen.name || getDefaultScreenName(index)}
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