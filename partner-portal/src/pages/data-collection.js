import { useState, useEffect } from "react";
import {
  Flex,
  Box,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import FieldSidebar from "../components/FieldSidebar";
import Canvas from "../components/Canvas";
import BottomTabs from "../components/BottomTabs";
import Layout from "../components/Layout";
import Head from "next/head";
import { usePartnerStore } from "../store"; 
import { ConfirmationModal } from "../components/modal/ConfirmationModal";
import { ScreenSettings } from "@/components/ScreenSettings";
import { DataCollectionToggle } from "@/components/data-collection/Toggle";

const DataCollectionFormBuilderPage = ({ globalSettings }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Zustand store hooks
  const partnerData = usePartnerStore((state) => state.partnerData);
  const partnerDraft = usePartnerStore((state) => state.partnerDraft);
  const updatePartnerDraft = usePartnerStore((state) => state.updatePartnerDraft);
  const updateScreens = usePartnerStore((state) => state.updateScreens);
  const discardPartnerDraft = usePartnerStore((state) => state.discardPartnerDraft);
  const updateCategoryStatus = usePartnerStore((state) => state.updateCategoryStatus);

  const [activeScreenIndex, setActiveScreenIndex] = useState(0);
  const [selectedField, setSelectedField] = useState(null);
  const [dataCollectionEnabled, setDataCollectionEnabled] = useState(true);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Initialize partnerDraft as a deep copy of partnerData
  useEffect(() => {
    if (partnerData) {
      updatePartnerDraft(JSON.parse(JSON.stringify(partnerData)));
    }
  }, [partnerData]);

  // Find the Data Collection category in the store
  const dataCollectionCategory = partnerData?.categories?.find(
    (category) => category.name === "Data Collection"
  );

  // Sync data collection state with category
  useEffect(() => {
    if (dataCollectionCategory) {
      setDataCollectionEnabled(dataCollectionCategory.is_active);
    }
  }, [dataCollectionCategory]);

  // Update the draft screens state
  const handleScreenUpdate = (updatedScreens) => {
    const clonedDraft = { ...partnerDraft, screens: updatedScreens };
    updatePartnerDraft(clonedDraft);
    setHasUnsavedChanges(true);
  };

  // Select a field to edit in FieldSidebar
  const handleFieldSelect = (field) => {
    setSelectedField(field);
  };

  // Save a configured field to the current screen in the draft
  const handleSaveField = (fieldAttributes) => {
    const updatedScreens = [...(partnerDraft.screens || [])];
    const updatedFields = [
      ...(updatedScreens[activeScreenIndex].fields || []),
      {
        ...selectedField,
        attributes: fieldAttributes,
      },
    ];
    updatedScreens[activeScreenIndex] = {
      ...updatedScreens[activeScreenIndex],
      fields: updatedFields,
    };
    handleScreenUpdate(updatedScreens);
    setSelectedField(null);
  };

  // Save changes
  const handleSave = () => {
    updateScreens();
    setHasUnsavedChanges(false);
  };

  // Discard changes
  const handleDiscard = () => {
    updatePartnerDraft(JSON.parse(JSON.stringify(partnerData)));
    setHasUnsavedChanges(false);
  };

  // Toggle Data Collection with confirmation modal
  const handleDataCollectionToggle = (value) => {
    const newValue = value === "enable";
    if (newValue !== dataCollectionEnabled) {
      onOpen();
    }
  };

  const confirmToggleDataCollection = () => {
    updateCategoryStatus(partnerData.id, "Data Collection", !dataCollectionEnabled);
    setDataCollectionEnabled(!dataCollectionEnabled);
    onClose();
  };

  return (
    <Layout>
      <Head>
        <style>
          {`
            body {
              font-family: '${globalSettings.font || "Arial"}', sans-serif;
            }
          `}
        </style>
      </Head>

      <Flex direction="column" minHeight="100vh">
        <Flex justify="space-between" align="center" bg="primary.300" color="text.primary" p={4}>
          <DataCollectionToggle 
            dataCollectionEnabled={dataCollectionEnabled} 
            confirmToggleDataCollection={confirmToggleDataCollection} 
            handleDataCollectionToggle={handleDataCollectionToggle}
          />
          {hasUnsavedChanges && (
            <Flex gap={3}>
              <Button onClick={handleSave} colorScheme="teal">
                Save
              </Button>
              <Button onClick={handleDiscard} colorScheme="red">
                Discard
              </Button>
            </Flex>
          )}
        </Flex>
       
       {partnerDraft?.screens && (
         <ScreenSettings
           screens={partnerDraft.screens}
           activeScreenIndex={activeScreenIndex}
           onUpdateScreen={handleScreenUpdate}
         />
       )}

       {partnerDraft?.screens && (
        <Flex flex="1">
          <Box flex="1" p={4} border="1px solid" borderColor="gray.300" m={4}>
            <Canvas
              screens={partnerDraft.screens}
              activeScreenIndex={activeScreenIndex}
              globalSettings={globalSettings}
            />
          </Box>

          <FieldSidebar
            selectedField={selectedField}
            onFieldSelect={handleFieldSelect}
            onSaveField={handleSaveField}
            onCancel={() => setSelectedField(null)}
          />
        </Flex>
       )}

       {partnerDraft?.screens && (
         <BottomTabs
           screens={partnerDraft.screens}
           setScreens={handleScreenUpdate}
           activeScreenIndex={activeScreenIndex}
           setActiveScreenIndex={setActiveScreenIndex}
         />
       )}
      </Flex>

      <ConfirmationModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={confirmToggleDataCollection}
        title="Confirm Action"
        description={`Are you sure you want to ${
          dataCollectionEnabled ? "disable" : "enable"
        } Data Collection?`}
      />
    </Layout>
  );
};

export default DataCollectionFormBuilderPage;