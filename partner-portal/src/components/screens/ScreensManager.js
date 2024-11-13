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
    <Box display="flex" flexDirection="column" justifyContent="space-between">
      <Screen
        screen={screens[currentScreenIndex]}
        globalConfig={globalConfig}
        onContinue={goToNextScreen}
        onBack={goToPreviousScreen}
        isFirstScreen={currentScreenIndex === 0}
        isLastScreen={currentScreenIndex === screens.length - 1}
      />

      {/* Completion Modal */}
      <Modal bg="bg.modal" isOpen={isSubmitted} onClose={handleClose} isCentered>
          <ModalOverlay bg="rgba(0, 0, 0, 0.8)" /> 
          <ModalContent
            textAlign="center"
            
            maxWidth="lg"  
            p={8}          
          >
            <ModalCloseButton />
            <ModalHeader
              p={6}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Icon as={CheckCircleIcon} boxSize={12} color="primary" mb={4} /> {/* Larger icon */}
              <Text fontSize="2xl" fontWeight="bold">
                {globalConfig.form_completion_heading || "Thank you for submitting your information"}
              </Text>
            </ModalHeader>
            <ModalBody pb={8}>
              <Text color="text.secondary" fontSize="lg">
                {globalConfig.form_completion_paragraph || "We will get in touch with you shortly"}
              </Text>
            </ModalBody>
          </ModalContent>
        </Modal>
    </Box>
  );
};

export default ScreensManager;