// components/BottomTabs.js
import { Flex, Button } from "@chakra-ui/react";

const BottomTabs = ({
  screens,
  setScreens,
  activeScreen,
  setActiveScreen,
}) => {
  const addScreen = () => {
    const newScreen = `Screen ${screens.length + 1}`;
    setScreens([...screens, newScreen]);
    setActiveScreen(newScreen);
  };

  return (
    <Flex
      position="fixed"
      bottom="0"
      width="calc(100% - 250px)" // Adjust width to account for the sidebar
      bg="background.dark"
      p={2}
      alignItems="center"
      ml="250px" // Move it to the right of the sidebar
    >
      {screens.map((screen) => (
        <Button
          key={screen}
          onClick={() => setActiveScreen(screen)}
          variant={activeScreen === screen ? "solid" : "outline"}
          colorScheme="primary"
          mr={2}
        >
          {screen}
        </Button>
      ))}
      <Button colorScheme="secondary" onClick={addScreen}>
        + Add Screen
      </Button>
    </Flex>
  );
};

export default BottomTabs;