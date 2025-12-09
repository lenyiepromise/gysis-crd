import { create } from 'zustand'

type WizardState = {
  step: number
  formData: {
    projectName: string
    description: string  // <--- NEW
    projectType: string
    brandColor: string
    features: string[]
    attachments: string[] // <--- NEW (Stores URLs)
  }
  setField: (field: string, value: any) => void
  toggleFeature: (feature: string) => void
  addAttachment: (url: string) => void // <--- NEW ACTION
  nextStep: () => void
  prevStep: () => void
}

export const useWizardStore = create<WizardState>((set) => ({
  step: 1,
  formData: {
    projectName: '',
    description: '', // <--- NEW
    projectType: 'web',
    brandColor: '#000000',
    features: [],
    attachments: []  // <--- NEW
  },
  
  setField: (field, value) => 
    set((state) => ({ 
      formData: { ...state.formData, [field]: value } 
    })),

  toggleFeature: (feature) =>
    set((state) => {
      const current = state.formData.features;
      const updated = current.includes(feature)
        ? current.filter((f) => f !== feature)
        : [...current, feature];
      return { formData: { ...state.formData, features: updated } };
    }),

  // <--- NEW: Add an image URL to the list
  addAttachment: (url) => 
    set((state) => ({
      formData: { ...state.formData, attachments: [...state.formData.attachments, url] }
    })),

  nextStep: () => set((state) => ({ step: state.step + 1 })),
  prevStep: () => set((state) => ({ step: state.step - 1 })),
}))