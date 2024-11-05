import { Flex, Button, IconButton } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

const BottomTabs = ({
  screens,
  setScreens,
  activeScreenIndex,
  setActiveScreenIndex,
}) => {
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
        <Flex pos="relative" key={screen.name} alignItems="center" mr={2}>
          <Button
            onClick={() => setActiveScreenIndex(index)}
            variant={activeScreenIndex === index ? "outline" : "solid"}
            colorScheme="primary"
          >
            {screen.name}
          </Button>
          <IconButton
            pos="absolute"
            top="-20px"
            right="-20px"
            aria-label="Delete Screen"
            icon={<CloseIcon size="sm" />}
            width="25px"
            height="25px"
            colorScheme="red"
            ml={1}
            onClick={() => deleteScreen(index)}
          />
        </Flex>
      ))}
      <Button colorScheme="secondary" onClick={addScreen}>
        + Add Screen
      </Button>
    </Flex>
  );
};

export default BottomTabs;