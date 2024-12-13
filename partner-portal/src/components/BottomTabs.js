import { useState } from "react";
import {
  Flex,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";

const BottomTabs = ({
  screens,
  setScreens,
  activeScreenIndex,
  setActiveScreenIndex,
}) => {
  const [contextMenuIndex, setContextMenuIndex] = useState(null);
  const [isDragging, setIsDragging] = useState(false); // Track drag state

  const getDefaultScreenName = (index) => `Screen ${index + 1}`;

  const addScreen = () => {
    const newScreen = {
      id: `screen-${Date.now()}`,
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
    setActiveScreenIndex(updatedScreens.length - 1);
  };

  const deleteScreen = (index) => {
    if (screens.length > 1) {
      const updatedScreens = screens.filter((_, i) => i !== index);
      setScreens(updatedScreens);

      if (index === activeScreenIndex) {
        setActiveScreenIndex(Math.max(0, index - 1));
      } else if (index < activeScreenIndex) {
        setActiveScreenIndex(activeScreenIndex - 1);
      }
    }
    setContextMenuIndex(null);
  };

  const cloneScreen = (index) => {
    const screenToClone = screens[index];
    const screenName = screenToClone.name || getDefaultScreenName(index);
    const { id, ...restOfScreen } = screenToClone;
    const clonedScreen = {
      ...restOfScreen,
      id: `screen-${Date.now()}`, // Generate a unique ID
      name: `${screenName} (Copy)`,
    };
    const updatedScreens = [
      ...screens.slice(0, index + 1),
      clonedScreen,
      ...screens.slice(index + 1),
    ];
    setScreens(updatedScreens);
    setActiveScreenIndex(index + 1);
    setContextMenuIndex(null);
  };

  const handleContextMenu = (event, index) => {
    event.preventDefault();
    setContextMenuIndex(index);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 10 } }),
    useSensor(KeyboardSensor)
  );

  const handleDragStart = () => {
    setIsDragging(true); // Set dragging state
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = screens.findIndex((screen) => screen.id === active.id);
      const newIndex = screens.findIndex((screen) => screen.id === over.id);

      // Reorder the screens based on the drag
      const updatedScreens = arrayMove(screens, oldIndex, newIndex);
      setScreens(updatedScreens);
      setActiveScreenIndex(newIndex); // Optionally update the active screen index
    }
    setIsDragging(false); // Reset dragging state
  };

  const handleClick = (event, index) => {
    if (!isDragging) {
      setActiveScreenIndex(index); // Only select screen if not dragging
    }
  };

  return (
    <Flex
      width="100%"
      bg="background.dark"
      p={4}
      alignItems="center"
      color="text.primary"
    >
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart} // Handle drag start
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={screens.map((screen) => screen.id)}
          strategy={horizontalListSortingStrategy}
        >
          <div style={{ display: "flex", gap: "10px" }}>
            {screens.map((screen, index) => (
              <SortableItem key={screen.id} id={screen.id}>
                <Menu isOpen={contextMenuIndex === index}>
                  <MenuButton
                    as={Button}
                    onClick={(event) => handleClick(event, index)} // Only handle click when not dragging
                    onContextMenu={(event) => handleContextMenu(event, index)}
                    variant={activeScreenIndex === index ? "outline" : "solid"}
                    color={
                      activeScreenIndex === index ? "white" : "background.dark"
                    }
                    bg={activeScreenIndex === index ? "secondary.200" : "white"}
                    mr={2}
                  >
                    {screen.name || getDefaultScreenName(index)}
                  </MenuButton>
                  <MenuList
                    bg="gray.800"
                    color="white"
                    borderColor="gray.600"
                    onMouseLeave={() => setContextMenuIndex(null)}
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
              </SortableItem>
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <Button colorScheme="secondary" onClick={addScreen}>
        + Add Screen
      </Button>
    </Flex>
  );
};

export default BottomTabs;
