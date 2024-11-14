

import { create } from "zustand";
import { mergeWith } from "lodash";

export const usePartnerStore = create((set, get) => ({
  partnerData: null,       
  partnerDraft: null,      
  versions: [],            
  selectedVersion: null,   

  setPartnerData: (data) =>
    set({
      partnerData: data,
      partnerDraft: { ...data }, 
    }),

  updatePartnerDraft: (updates) =>
    set((state) => {
      const newDraft = mergeWith({}, state.partnerDraft, updates, (objValue, srcValue) => {
        if (Array.isArray(objValue)) {
          return srcValue; 
        }
      });
      return {
        partnerDraft: newDraft,
      };
    }),

  savePartnerDraft: async (createNewVersion = false) => {
    const state = get();
    const { partnerDraft, partnerData } = state;

    console.log("Partner draft before saving:", partnerDraft);

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
      const response = await fetch(
        `http://localhost:3000/partners/category/${categoryName}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ partnerId, isActive }),
        }
      );
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

  
  fetchPartnerData: async (partnerName, version = null) => {
    try {
      
      const url = version
        ? `http://localhost:3000/partners/${partnerName}?version=${version}`
        : `http://localhost:3000/partners/${partnerName}`;
      const response = await fetch(url);
      const data = await response.json();

      
      set({
        partnerData: data,
        partnerDraft: { ...data },
        selectedVersion: data.config.version, 
      });

      
      const currentVersion = data.config.version;
      const versions = [];
      for (let i = currentVersion; i >= Math.max(1, currentVersion - 9); i--) {
        versions.push(i);
      }
      set({configurations: versions }); 
    } catch (error) {
      console.error("Failed to fetch partner data:", error);
    }
  },

  discardPartnerDraft: () =>
    set((state) => ({
      partnerDraft: { ...state.partnerData },
    })),

  
  updateScreens: async () => {
    const state = get();
    const { partnerDraft, partnerData } = state;

    const partnerName = partnerData.name;
    const configVersion = partnerData.config.version;
    const categoryName = 'Data Collection'; 
    const screens = partnerDraft.screens;

    try {
      const response = await fetch(
        `http://localhost:3000/partners/${partnerData.id}/config/${configVersion}/category/${categoryName}/screens`,
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
        
        set({
          partnerData: {
            ...partnerData,
            screens: result.data.screens,
          },
          partnerDraft: {
            ...partnerDraft,
            screens: result.data.screens,
          },
        });
      }
    } catch (error) {
      console.error("Failed to update screens:", error);
    }
  },

  fetchVersions: async (partnerName) => {
    try {
      
      const response = await fetch(
        `http://localhost:3000/partners/${partnerName}/versions`
      );
      const versionsData = await response.json();

      
      set({ versions: versionsData });
    } catch (error) {
      console.error("Failed to fetch versions:", error);
    }
  },

  
  setSelectedVersion: (version) => set({ selectedVersion: version }),

}));