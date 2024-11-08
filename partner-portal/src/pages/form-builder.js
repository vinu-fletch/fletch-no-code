// pages/form-builder.js

import { useState, useEffect } from "react";
import {
  Flex,
  Box,
  useDisclosure,
} from "@chakra-ui/react";
import FieldSidebar from "../components/FieldSidebar";
import Canvas from "../components/Canvas";
import BottomTabs from "../components/BottomTabs";
import Layout from "../components/Layout";

import Head from "next/head";
import { usePartnerStore } from "../store";
import {ConfirmationModal} from "../components/modal/ConfirmationModal";
import { ScreenSettings } from "@/components/ScreenSettings";
import { DataCollectionToggle } from "@/components/data-collection/Toggle";

const FormBuilderPage = ({ globalSettings }) => {
  const [screens, setScreens] = useState([
    {
      name: "Screen 1",
      backgroundColor: "",
      heading: "",
      continueButtonText: "",
      fields: [],
    },
  ]);
  const [activeScreenIndex, setActiveScreenIndex] = useState(0);


  const [selectedField, setSelectedField] = useState(null);
  const [dataCollectionEnabled, setDataCollectionEnabled] = useState(true);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const partnerData = usePartnerStore((state) => state.partnerData);
  const updateCategoryStatus = usePartnerStore(
    (state) => state.updateCategoryStatus
  );

  const dataCollectionCategory = partnerData?.categories?.find(
    (category) => category.name === "Data Collection"
  );

  useEffect(() => {
    if (dataCollectionCategory) {
      setDataCollectionEnabled(dataCollectionCategory.is_active);
    }
  }, [dataCollectionCategory]);

  const handleFieldSelect = (field) => {
    setSelectedField(field);
  };

  const handleScreenUpdate = (screens) => {
    setScreens(screens);
  }

  const handleSaveField = (fieldAttributes) => {
    const updatedScreens = [...screens];
    updatedScreens[activeScreenIndex].fields.push({
      ...selectedField,
      attributes: fieldAttributes,
    });
    setScreens(updatedScreens);
    setSelectedField(null);
  };

  const handleDataCollectionToggle = (value) => {
    const newValue = value === "enable";
    if (newValue !== dataCollectionEnabled) {
      onOpen();
    }
  };

  const confirmToggleDataCollection = () => {
    updateCategoryStatus(partnerData.id,"Data Collection", !dataCollectionEnabled);
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

        <DataCollectionToggle dataCollectionEnabled={dataCollectionEnabled} confirmToggleDataCollection={confirmToggleDataCollection} handleDataCollectionToggle={handleDataCollectionToggle}/>

        <ScreenSettings screens={screens} activeScreenIndex={activeScreenIndex} onUpdateScreen={handleScreenUpdate} />

        <Flex flex="1">
          <Box flex="1" p={4} border="1px solid" borderColor="gray.300" m={4}>
            <Canvas
              screens={screens}
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

        <BottomTabs
          screens={screens}
          setScreens={setScreens}
          activeScreenIndex={activeScreenIndex}
          setActiveScreenIndex={setActiveScreenIndex}
        />

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

export default FormBuilderPage;