import { create } from 'zustand'

type WizardState = {
  step: number
  formData: {
    projectName: string
    projectType: string
    brandColor: string
    features: string[] // <--- NEW: Array of strings
  }
  setField: (field: string, value: any) => void
  toggleFeature: (feature: string) => void // <--- NEW: Action to add/remove features
  nextStep: () => void
  prevStep: () => void
}

export const useWizardStore = create<WizardState>((set) => ({
  step: 1,
  formData: {
    projectName: '',
    projectType: 'web',
    brandColor: '#000000',
    features: [] // <--- NEW: Start empty
  },
  
  setField: (field, value) => 
    set((state) => ({ 
      formData: { ...state.formData, [field]: value } 
    })),

  // <--- NEW LOGIC: If it exists, remove it. If not, add it.
  toggleFeature: (feature) =>
    set((state) => {
      const current = state.formData.features;
      const updated = current.includes(feature)
        ? current.filter((f) => f !== feature) // Remove
        : [...current, feature]; // Add
      return { formData: { ...state.formData, features: updated } };
    }),

  nextStep: () => set((state) => ({ step: state.step + 1 })),
  prevStep: () => set((state) => ({ step: state.step - 1 })),
}))