// pages/DataCollectionFormBuilderPage.js

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
import { CategoryToggle } from "../components/CategoryToggle"; // Updated import

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
  const [categoryEnabled, setCategoryEnabled] = useState(true); // Renamed state
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const categoryName = "Data Collection"; // Set the category name

  console.log("Partner draft is", partnerDraft)

  // Initialize partnerDraft as a deep copy of partnerData
  useEffect(() => {
    if (partnerData) {
      updatePartnerDraft(JSON.parse(JSON.stringify(partnerData)));
    }
  }, [partnerData]);

  // Find the category in the store
  const category = partnerData?.categories?.find(
    (category) => category.name === categoryName
  );

  // Sync category enabled state with category
  useEffect(() => {
    if (category) {
      setCategoryEnabled(category.is_active);
    }
  }, [category]);

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


  const handleSaveField = () => {
  setSelectedField(null);
  setHasUnsavedChanges(true);
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

  // Toggle category with confirmation modal
  const handleCategoryToggle = (value) => {
    const newValue = value === "enable";
    if (newValue !== categoryEnabled) {
      onOpen();
    }
  };

  const confirmToggleCategory = () => {
    updateCategoryStatus(partnerData.id, categoryName, !categoryEnabled);
    setCategoryEnabled(!categoryEnabled);
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
        <Flex
          justify="space-between"
          align="center"
          bg="primary.300"
          color="text.primary"
          p={4}
        >
          <CategoryToggle
            title={categoryName}
            isEnabled={categoryEnabled}
            onToggle={handleCategoryToggle}
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
            <Box
              flex="1"
              p={4}
              border="1px solid"
              borderColor="gray.300"
              m={4}
            >
              <Canvas
                screens={partnerDraft.screens}
                activeScreenIndex={activeScreenIndex}
              />
            </Box>

            <FieldSidebar
              selectedField={selectedField}
              onFieldSelect={handleFieldSelect}
              activeScreenIndex={activeScreenIndex}
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
        onConfirm={confirmToggleCategory}
        title="Confirm Action"
        description={`Are you sure you want to ${
          categoryEnabled ? "disable" : "enable"
        } ${categoryName}?`}
      />
    </Layout>
  );
};

export default DataCollectionFormBuilderPage;