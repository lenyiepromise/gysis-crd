"use client"
import { useWizardStore } from '@/store/useWizardStore'
import BrandPreview from '@/components/wizard/BrandPreview'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
const { step, formData, setField, toggleFeature, nextStep, prevStep } = useWizardStore()

export default function WizardPage() {
  const { step, formData, setField, nextStep, prevStep } = useWizardStore()
  const router = useRouter()

  const submitOrder = async () => {
    // Save to Supabase
    const { error } = await supabase
      .from('projects')
      .insert({
        title: formData.projectName,
        platform_type: formData.projectType,
        brand_config: { color: formData.brandColor },
        features: formData.features,
        status: 'pending'
      })

    if (error) alert(error.message)
    else {
        alert('Order Sent!')
        router.push('/dashboard')
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center pt-20 bg-gray-50">
      <div className="max-w-2xl w-full bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Create Gysis Spec: Step {step}</h1>

        {step === 1 && (
            <div>
                <label className="block mb-2">Project Name</label>
                <input 
                    className="border p-3 w-full rounded mb-4" 
                    placeholder="e.g. Uber for Mechanics"
                    value={formData.projectName}
                    onChange={(e) => setField('projectName', e.target.value)}
                />
                <button onClick={nextStep} className="bg-black text-white px-4 py-2 rounded">Next</button>
            </div>
        )}

        {step === 2 && (
            <div className="space-y-4">
                <BrandPreview />
                <div className="flex gap-2">
                    <button onClick={prevStep} className="border px-4 py-2 rounded">Back</button>
                    <button onClick={nextStep} className="bg-black text-white px-4 py-2 rounded">Next</button>
                </div>
            </div>
        )}

        {step === 3 && (
            <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-800">What features do you need?</h2>
                <div className="grid grid-cols-2 gap-4">
                    {['User Login', 'Payments (Stripe)', 'Chat System', 'Map / GPS', 'Admin Panel', 'File Upload'].map((feat) => (
                        <button
                            key={feat}
                            onClick={() => toggleFeature(feat)}
                            className={`p-4 rounded-xl border text-left transition-all ${
                                formData.features.includes(feat)
                                    ? 'border-black bg-black text-white shadow-lg'
                                    : 'border-gray-200 hover:border-black text-gray-600'
                            }`}
                        >
                            {feat}
                        </button>
                    ))}
                </div>
                <div className="flex gap-2 mt-6">
                    <button onClick={prevStep} className="border px-4 py-2 rounded">Back</button>
                    <button onClick={nextStep} className="bg-black text-white px-4 py-2 rounded">Next</button>
                </div>
            </div>
        )}

        {step === 4 && (
            <div className="text-center">
                <p className="mb-4">Ready to submit <strong>{formData.projectName}</strong>?</p>
                <div className="flex justify-center gap-2">
                    <button onClick={prevStep} className="border px-4 py-2 rounded">Back</button>
                    <button onClick={submitOrder} className="bg-green-600 text-white px-4 py-2 rounded font-bold">Submit</button>
                </div>
            </div>
        )}
      </div>
    </div>
  )
}