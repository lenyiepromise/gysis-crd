"use client"
import { useWizardStore } from '@/store/useWizardStore'
import BrandPreview from '@/components/wizard/BrandPreview'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function WizardPage() {
  // FIX: This hook is now properly INSIDE the function
  const { step, formData, setField, toggleFeature, nextStep, prevStep } = useWizardStore()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submitOrder = async () => {
    setIsSubmitting(true)
    
    // Insert data including the new Features list
    const { error } = await supabase
      .from('projects') 
      .insert({
        title: formData.projectName,
        platform_type: formData.projectType,
        brand_config: { color: formData.brandColor },
        features: formData.features, // <--- Sending features to DB
        status: 'pending_review'
      })

    setIsSubmitting(false)

    if (error) {
        alert('Error: ' + error.message)
    } else {
        alert('Success! Project Created.')
        router.push('/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-10 px-4 pb-20">
      
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-extrabold text-gray-900">Gysis Product Builder</h1>
      </div>

      <div className="max-w-4xl w-full bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100 p-8">
        
        {/* Progress Bar (Updated to 4 Steps) */}
        <div className="flex items-center gap-2 mb-8 text-sm font-medium border-b pb-4 overflow-x-auto">
            <span className={step >= 1 ? "text-black font-bold" : "text-gray-400"}>1. Basics</span>
            <span className="text-gray-300">/</span>
            <span className={step >= 2 ? "text-black font-bold" : "text-gray-400"}>2. Branding</span>
            <span className="text-gray-300">/</span>
            <span className={step >= 3 ? "text-black font-bold" : "text-gray-400"}>3. Features</span>
            <span className="text-gray-300">/</span>
            <span className={step >= 4 ? "text-black font-bold" : "text-gray-400"}>4. Submit</span>
        </div>

        {/* STEP 1: BASICS */}
        {step === 1 && (
            <div className="space-y-6 max-w-md mx-auto py-10">
                <label className="block">
                    <span className="text-gray-900 font-bold text-lg mb-2 block">Project Name</span>
                    <input 
                        className="w-full rounded-xl border border-gray-300 p-4"
                        placeholder="e.g. Uber for Mechanics"
                        value={formData.projectName}
                        onChange={(e) => setField('projectName', e.target.value)}
                    />
                </label>
                <button 
                    onClick={nextStep}
                    disabled={!formData.projectName}
                    className="w-full bg-black text-white px-6 py-4 rounded-xl font-bold hover:bg-gray-800 disabled:opacity-50"
                >
                    Next Step
                </button>
            </div>
        )}

        {/* STEP 2: BRANDING */}
        {step === 2 && (
            <div className="space-y-8">
                <BrandPreview />
                <div className="flex gap-4 justify-end pt-4 border-t">
                    <button onClick={prevStep} className="px-6 py-3 border rounded-lg">Back</button>
                    <button onClick={nextStep} className="bg-black text-white px-8 py-3 rounded-lg font-bold">Next Step</button>
                </div>
            </div>
        )}

        {/* STEP 3: FEATURES (NEW) */}
        {step === 3 && (
            <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-800">Select Core Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* List of features to toggle */}
                    {['User Login', 'Payments (Stripe)', 'Chat System', 'Map / GPS', 'Admin Panel', 'File Upload', 'Push Notifications', 'Social Feed'].map((feat) => (
                        <button
                            key={feat}
                            onClick={() => toggleFeature(feat)}
                            className={`p-4 rounded-xl border text-left transition-all ${
                                formData.features.includes(feat)
                                    ? 'border-black bg-black text-white shadow-lg'
                                    : 'border-gray-200 hover:border-black text-gray-600'
                            }`}
                        >
                            <div className="flex justify-between items-center">
                                <span>{feat}</span>
                                {formData.features.includes(feat) && <span>✓</span>}
                            </div>
                        </button>
                    ))}
                </div>
                <div className="flex gap-4 justify-end pt-6 border-t mt-4">
                    <button onClick={prevStep} className="px-6 py-3 border rounded-lg">Back</button>
                    <button onClick={nextStep} className="bg-black text-white px-8 py-3 rounded-lg font-bold">Review & Submit</button>
                </div>
            </div>
        )}

        {/* STEP 4: REVIEW & SUBMIT */}
        {step === 4 && (
            <div className="text-center space-y-8 py-8">
                <div className="bg-gray-50 border border-gray-200 p-8 rounded-2xl inline-block text-left w-full max-w-md">
                    <h3 className="font-bold text-gray-400 uppercase text-xs tracking-wider mb-6 border-b pb-2">Summary</h3>
                    
                    <div className="space-y-4">
                        <p className="flex justify-between"><span className="text-gray-500">Name</span> <b>{formData.projectName}</b></p>
                        <p className="flex justify-between"><span className="text-gray-500">Type</span> <b className="capitalize">{formData.projectType}</b></p>
                        <p className="flex justify-between"><span className="text-gray-500">Color</span> <span className="w-4 h-4 rounded-full" style={{background: formData.brandColor}}></span></p>
                        
                        <div className="pt-4 border-t">
                            <span className="text-gray-500 text-sm block mb-2">Selected Features:</span>
                            <div className="flex flex-wrap gap-2">
                                {formData.features.length === 0 ? <span className="text-xs text-gray-400">None selected</span> : 
                                    formData.features.map(f => (
                                        <span key={f} className="text-xs bg-white border px-2 py-1 rounded">{f}</span>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="flex justify-center gap-4">
                    <button onClick={prevStep} className="px-6 py-3 text-gray-500">Back</button>
                    <button 
                        onClick={submitOrder} 
                        disabled={isSubmitting}
                        className="bg-green-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-green-700 disabled:opacity-70"
                    >
                        {isSubmitting ? 'Sending...' : '🚀 Launch Project'}
                    </button>
                </div>
            </div>
        )}

      </div>
    </div>
  )
}