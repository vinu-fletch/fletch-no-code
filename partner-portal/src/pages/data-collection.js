

import { useState, useEffect, useMemo } from "react";
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
import { CategoryToggle } from "../components/CategoryToggle";
import { Preview } from "@/components/preview/preview";

const DataCollectionFormBuilderPage = ({ globalSettings }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  
  const partnerData = usePartnerStore((state) => state.partnerData);
  const partnerDraft = usePartnerStore((state) => state.partnerDraft);
  const updatePartnerDraft = usePartnerStore((state) => state.updatePartnerDraft);
  const updateScreens = usePartnerStore((state) => state.updateScreens);
  const discardPartnerDraft = usePartnerStore((state) => state.discardPartnerDraft);
  const updateCategoryStatus = usePartnerStore((state) => state.updateCategoryStatus);

  const [activeScreenIndex, setActiveScreenIndex] = useState(0);
  const [selectedField, setSelectedField] = useState(null);
  const [categoryEnabled, setCategoryEnabled] = useState(true);

  const categoryName = "Data Collection";

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  
  useEffect(() => {
    if (partnerData) {
      updatePartnerDraft(JSON.parse(JSON.stringify(partnerData)));
    }
  }, [partnerData, updatePartnerDraft]);

  
  const category = partnerData?.categories?.find(
    (category) => category.name === categoryName
  );

  
  useEffect(() => {
    if (category) {
      setCategoryEnabled(category.is_active);
    }
  }, [category]);

  
  const handleScreenUpdate = (updatedScreens) => {
    const clonedDraft = { ...partnerDraft, screens: updatedScreens };
    updatePartnerDraft(clonedDraft);
    
  };

  
  const handleFieldSelect = (field) => {
    setSelectedField(field);
  };

  
  const handleSaveField = () => {
    setSelectedField(null);
    
  };

  
  const handleSave = () => {
    updateScreens();
    
  };

  
  const handleDiscard = () => {
    updatePartnerDraft(JSON.parse(JSON.stringify(partnerData)));
    
  };

  
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

  
  const handleEditField = (field) => {
    setSelectedField(field);
  };

  
  const hasUnsavedChanges = useMemo(() => {
    return JSON.stringify(partnerDraft) !== JSON.stringify(partnerData);
  }, [partnerDraft, partnerData]);

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
          justify="start"
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
          <Flex gap={3}>
            <Button onClick={() => setIsPreviewOpen(true)} colorScheme="yellow">
                Preview
            </Button>
          {hasUnsavedChanges && (
              <>  
              <Button onClick={handleSave} colorScheme="teal">
                Save
              </Button>
              <Button onClick={handleDiscard} colorScheme="red">
                Discard
              </Button>
              </>
           
          )}
           </Flex>
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
                onEditField={handleEditField}
              />
            </Box>

            <FieldSidebar
              selectedField={selectedField}
              onFieldSelect={handleFieldSelect}
              activeScreenIndex={activeScreenIndex}
              onSaveField={handleSaveField}
              onCancel={() => setSelectedField(null)}
              showFieldModal={selectedField !== null}
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

      {isPreviewOpen && (
        <Preview isOpen={true} onClose={() => setIsPreviewOpen(false)} />
      )}
    </Layout>
  );
};

export default DataCollectionFormBuilderPage;