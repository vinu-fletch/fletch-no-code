// pages/index.js
import { useState, useEffect } from "react";
import {
  Flex,
  Box,
  Button,
  Heading,
  useTheme,
  VStack,
  Text,
  Progress,
} from "@chakra-ui/react";
import { DndContext } from "@dnd-kit/core";
import FieldSidebar from "../components/FieldSidebar";
import BottomTabs from "../components/BottomTabs";
import Canvas from "../components/Canvas";
import GlobalCustomization from "../components/GlobalCustomization";
import Head from "next/head";

const MainPage = ({ setCustomTheme, globalSettings, setGlobalSettings }) => {
  const [activeView, setActiveView] = useState("globalCustomization"); // or "globalCustomization"
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

  // Dynamic font loading
  const fontLink = `https://fonts.googleapis.com/css2?family=${globalSettings.font?.replace(
    " ",
    "+"
  )}&display=swap`;

  return (
    <Flex minHeight="100vh">
      {/* Sidebar Navigation */}
      <Box width="250px" bg="background.dark" p={4}>
        <VStack spacing={4} align="stretch">
          <Button
            variant={activeView === "globalCustomization" ? "solid" : "outline"}
            colorScheme="primary"
            onClick={() => setActiveView("globalCustomization")}
          >
            Global Customization
          </Button>
          <Button
            variant={activeView === "formBuilder" ? "solid" : "outline"}
            colorScheme="primary"
            onClick={() => setActiveView("formBuilder")}
          >
            Form Builder
          </Button>
        </VStack>
      </Box>

      {/* Main Content */}
      <Box flex="1" bg="background.light">
        {/* Dynamic Font */}
        <Head>
          <link rel="stylesheet" href={fontLink} />
          <style>
            {`
              body {
                font-family: '${globalSettings.font || "Arial"}', sans-serif;
              }
            `}
          </style>
        </Head>

        {activeView === "globalCustomization" ? (
          <GlobalCustomization
            setCustomTheme={setCustomTheme}
            setGlobalSettings={setGlobalSettings}
            globalSettings={globalSettings}
          />
        ) : (
          <Flex direction="column" minHeight="100vh">
            {/* Header */}
            <Box
              bg="primary.300"
              color="white"
              p={4}
              display="flex"
              alignItems="center"
            >
              {globalSettings.logoURL && (
                <Box mr={4}>
                  <img
                    src={globalSettings.logoURL}
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
              <FieldSidebar />
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
        )}
      </Box>
    </Flex>
  );
};

export default MainPage;