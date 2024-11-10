// pages/Offers.js

import { useState, useEffect } from 'react';
import { Flex, useDisclosure } from '@chakra-ui/react';
import Layout from '@/components/Layout';
import { CategoryToggle } from '../../components/CategoryToggle';
import { ConfirmationModal } from '../../components/modal/ConfirmationModal';
import { usePartnerStore } from '../../store';

const OffersPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Zustand store hooks
  const partnerData = usePartnerStore((state) => state.partnerData);
  const updateCategoryStatus = usePartnerStore((state) => state.updateCategoryStatus);

  const [categoryEnabled, setCategoryEnabled] = useState(true);
  const categoryName = 'Offers';

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

  // Toggle category with confirmation modal
  const handleCategoryToggle = (value) => {
    const newValue = value === 'enable';
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
        </Flex>
      </Flex>

      <ConfirmationModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={confirmToggleCategory}
        title="Confirm Action"
        description={`Are you sure you want to ${
          categoryEnabled ? 'disable' : 'enable'
        } ${categoryName}?`}
      />
    </Layout>
  );
};

export default OffersPage;