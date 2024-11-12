import React, { useState } from "react";
import { Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Text, Center, Icon } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import Screen from "./Screen";
import { usePartnerStore } from "../../store";

const ScreensManager = () => {
  const partnerConfig = usePartnerStore((state) => state.partnerDraft);
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const screens = partnerConfig?.screens || [];
  const globalConfig = partnerConfig?.config?.global_config || {};

  // Function to proceed to the next screen
  const goToNextScreen = () => {
    if (currentScreenIndex < screens.length - 1) {
      setCurrentScreenIndex((prevIndex) => prevIndex + 1);
    } else {
      setIsSubmitted(true); // Show modal on the last screen submission
    }
  };

  // Function to go back to the previous screen
  const goToPreviousScreen = () => {
    if (currentScreenIndex > 0) {
      setCurrentScreenIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setCurrentScreenIndex(0); // Reset form if desired
  };

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column" justifyContent="space-between">
      <Screen
        screen={screens[currentScreenIndex]}
        globalConfig={globalConfig}
        onContinue={goToNextScreen}
        onBack={goToPreviousScreen}
        isFirstScreen={currentScreenIndex === 0}
        isLastScreen={currentScreenIndex === screens.length - 1}
      />

      {/* Completion Modal */}
      <Modal isOpen={isSubmitted} onClose={handleClose} isCentered>
        <ModalOverlay />
        <ModalContent textAlign="center" bg={globalConfig.background_color || "white"} color={globalConfig.text_primary_color || "black"}>
          <ModalCloseButton />
          <ModalHeader p={6} display="flex" flexDirection="column" alignItems="center">
            <Icon as={CheckCircleIcon} boxSize={10} color={globalConfig.primary_color || "green.500"} mb={4} />
            <Text fontSize="lg" fontWeight="bold" fontFamily={globalConfig.font_family || "Arial"}>
              {globalConfig.form_completion_heading || "Thank you for submitting your information"}
            </Text>
          </ModalHeader>
          <ModalBody pb={6}>
            <Text fontSize="md" fontFamily={globalConfig.font_family || "Arial"}>
              {globalConfig.form_completion_paragraph || "We will get in touch with you shortly"}
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ScreensManager;