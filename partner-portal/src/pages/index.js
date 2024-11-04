// pages/index.js
import { Flex, ChakraProvider } from "@chakra-ui/react";
import { DndContext } from "@dnd-kit/core";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Canvas from "../components/Canvas";
import BottomTabs from "../components/BottomTabs";
import ThemeSettings from "../components/ThemeSettings";
import theme from "../theme";

export default function Home() {
  const [screens, setScreens] = useState(["Screen 1"]);
  const [activeScreen, setActiveScreen] = useState("Screen 1");
  const [customTheme, setCustomTheme] = useState(theme);

  return (
    <ChakraProvider theme={customTheme}>
      <Flex direction="column">
        <Flex>
          <Sidebar />
          <DndContext>
            <Canvas activeScreen={activeScreen} />
          </DndContext>
          <ThemeSettings theme={customTheme} setTheme={setCustomTheme} />
        </Flex>
        <BottomTabs
          screens={screens}
          setScreens={setScreens}
          activeScreen={activeScreen}
          setActiveScreen={setActiveScreen}
        />
      </Flex>
    </ChakraProvider>
  );
}