// screens/ScreensManager.js

import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import Screen from "./Screen";
import { usePartnerStore } from "../../store";

const ScreensManager = () => {
  const partnerConfig = usePartnerStore((state) => state.partnerDraft);
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);
  const screens = partnerConfig?.screens || [];
  const globalConfig = partnerConfig?.config?.global_config || {};

  // Function to proceed to the next screen
  const goToNextScreen = () => {
    if (currentScreenIndex < screens.length - 1) {
      setCurrentScreenIndex((prevIndex) => prevIndex + 1);
    } else {
      console.log("Reached the last screen (Terminal screen).");
    }
  };

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column" justifyContent="space-between">
      {/* Render the current screen */}
      <Screen
        screen={screens[currentScreenIndex]}
        globalConfig={globalConfig}
        onContinue={goToNextScreen}
        isLastScreen={currentScreenIndex === screens.length - 1}
      />
    </Box>
  );
};

export default ScreensManager;