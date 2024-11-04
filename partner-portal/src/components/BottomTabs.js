import { Box, Flex, Button } from "@chakra-ui/react";
import React, { useState } from "react";

const BottomTabs = ({ screens, setScreens, activeScreen, setActiveScreen }) => {
  const addScreen = () => {
    const newScreen = `Screen ${screens.length + 1}`;
    setScreens([...screens, newScreen]);
    setActiveScreen(newScreen);
  };

  return (
    <Flex position="fixed" bottom="0" width="100%" bg="gray.100" p={2}>
      {screens.map((screen) => (
        <Button
          key={screen}
          onClick={() => setActiveScreen(screen)}
          variant={activeScreen === screen ? "solid" : "outline"}
          mr={2}
        >
          {screen}
        </Button>
      ))}
      <Button onClick={addScreen}>+ Add Screen</Button>
    </Flex>
  );
};

export default BottomTabs;