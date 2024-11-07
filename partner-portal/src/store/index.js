import {create} from "zustand";

export const usePartnerStore = create((set) => ({
  partnerData: null, // Initially null, will hold the partner data

  setPartnerData: (data) => set({ partnerData: data }),

  updateGlobalConfig: (newConfig) =>
    set((state) => ({
      partnerData: {
        ...state.partnerData,
        config: {
          ...state.partnerData.config,
          globalConfig: { ...state.partnerData.config.globalConfig, ...newConfig },
        },
      },
    })),
}));