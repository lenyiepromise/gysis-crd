import { create } from 'zustand'

type WizardState = {
  step: number
  formData: {
    projectName: string
    projectType: string
    brandColor: string
  }
  setField: (field: string, value: string) => void
  nextStep: () => void
  prevStep: () => void
}

export const useWizardStore = create<WizardState>((set) => ({
  step: 1,
  formData: {
    projectName: '',
    projectType: 'web',
    brandColor: '#000000',
  },
  setField: (field, value) => 
    set((state) => ({ 
      formData: { ...state.formData, [field]: value } 
    })),
  nextStep: () => set((state) => ({ step: state.step + 1 })),
  prevStep: () => set((state) => ({ step: state.step - 1 })),
}))