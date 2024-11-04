// pages/form-builder.js
import { useState, useEffect } from "react";
import {
  Flex,
  Box,
  Heading,
  useTheme,
  Progress,
  Text,
} from "@chakra-ui/react";
import { DndContext } from "@dnd-kit/core";
import Sidebar from "../components/FieldSidebar";
import Canvas from "../components/Canvas";
import BottomTabs from "../components/BottomTabs";

const FormBuilder = ({ globalSettings }) => {
  const [screens, setScreens] = useState(["Screen 1"]);
  const [activeScreen, setActiveScreen] = useState("Screen 1");
  const theme = useTheme();
  const [progress, setProgress] = useState(0);

  // Update progress based on the active screen
  useEffect(() => {
    const currentIndex = screens.indexOf(activeScreen) + 1;
    const totalScreens = screens.length;
    const progressValue = (currentIndex / totalScreens) * 100;
    setProgress(progressValue);
  }, [activeScreen, screens]);

  return (
    <Flex
      direction="column"
      bg="background.light"
      minHeight="100vh"
      width={`${globalSettings.layoutWidth || 100}%`}
      mx="auto"
    >
      {/* Header */}
      <Box
        bg="primary.300"
        color="white"
        p={4}
        display="flex"
        alignItems="center"
      >
        {globalSettings.logo && (
          <Box mr={4}>
            <img
              src={URL.createObjectURL(globalSettings.logo)}
              alt="Logo"
              style={{ height: "40px" }}
            />
          </Box>
        )}
        <Heading size="md">Form Builder</Heading>
      </Box>

      {/* Progress Bar */}
      {globalSettings.progressBar && (
        <Progress
          value={progress}
          size="sm"
          colorScheme="primary"
          hasStripe
          isAnimated
        />
      )}

      {/* Main Content */}
      <Flex flex="1">
        <Sidebar />
        <DndContext>
          <Canvas
            activeScreen={activeScreen}
            globalSettings={globalSettings}
          />
        </DndContext>
      </Flex>

      {/* Bottom Tabs */}
      <BottomTabs
        screens={screens}
        setScreens={setScreens}
        activeScreen={activeScreen}
        setActiveScreen={setActiveScreen}
      />

      {/* Disclaimer */}
      {globalSettings.disclaimer && (
        <Box
          p={4}
          bg="background.dark"
          color="text.secondary"
          textAlign="center"
        >
          {globalSettings.disclaimer}
        </Box>
      )}
    </Flex>
  );
};

export default FormBuilder;