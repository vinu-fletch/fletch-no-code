// stores/partnerStore.js

import { create } from "zustand";

export const usePartnerStore = create((set, get) => ({
  partnerData: null, // Data fetched from the backend
  partnerDraft: null, // Local draft for unsaved changes

  setPartnerData: (data) =>
    set({
      partnerData: data,
      partnerDraft: { ...data }, // Initialize the draft with the fetched data
    }),

  updatePartnerDraft: (updates) =>
    set((state) => {
      const newDraft = {
        ...state.partnerDraft,
        ...updates,
      };

      return {
        partnerDraft: newDraft,
      };
    }),

  savePartnerDraft: async (createNewVersion = false) => {
    const state = get();
    const { partnerDraft, partnerData } = state;

    try {
      const response = await fetch(
        `http://localhost:3000/partners/${partnerDraft.id}/config`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            config: { ...partnerDraft.config },
            partnerId: partnerDraft.id,
            configId: partnerData.config.id,
            createNewVersion,
          }),
        }
      );
      const updatedConfig = await response.json();
      set({
        partnerData: {
          ...partnerDraft,
          config: updatedConfig,
        },
        partnerDraft: {
          ...partnerDraft,
          config: updatedConfig,
        },
      });
    } catch (error) {
      console.error("Failed to save partner config:", error);
    }
  },

  updateCategoryStatus: async (partnerId, categoryName, isActive) => {
    try {
      const response = await fetch(`http://localhost:3000/partners/category/${categoryName}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ partnerId, isActive }),
      });
      const result = await response.json();
      if (result.success) {
        set((state) => ({
          partnerData: {
            ...state.partnerData,
            categories: state.partnerData.categories.map((cat) =>
              cat.name === categoryName ? { ...cat, is_active: isActive } : cat
            ),
          },
        }));
      }
    } catch (error) {
      console.error("Failed to update category:", error);
    }
  },

  discardPartnerDraft: () =>
    set((state) => ({
      partnerDraft: { ...state.partnerData },
    })),

    //  Function to update screens of any category
  updateScreens: async () => {
    const state = get();
    const { partnerDraft, partnerData } = state;

    const partnerName = partnerData.name;
    const configVersion = partnerData.config.version;
    const categoryName = 'Data Collection'; // Replace with actual category name if needed
    const screens = partnerDraft.screens;

    try {
      const response = await fetch(
        `http://localhost:3000/partners/${partnerName}/config/${configVersion}/category/${categoryName}/screens`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            screens,
          }),
        }
      );
      const result = await response.json();

      if (result.success) {
        // Update partnerData and partnerDraft with the new screens
        set({
          partnerData: {
            ...partnerData,
            screens: result.screens,
          },
          partnerDraft: {
            ...partnerDraft,
            screens: result.screens,
          },
        });
      }
    } catch (error) {
      console.error("Failed to update screens:", error);
    }
  },
  
}));