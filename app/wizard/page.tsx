"use client"
import { useWizardStore } from '@/store/useWizardStore'
import BrandPreview from '@/components/wizard/BrandPreview'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { generateAiQuote } from '@/app/actions/estimate'

export default function WizardPage() {
  const { step, formData, setField, toggleFeature, addAttachment, nextStep, prevStep } = useWizardStore()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  // HANDLE FILE UPLOAD
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setIsUploading(true);
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage.from('uploads').upload(fileName, file);
    if (uploadError) {
      alert('Upload failed: ' + uploadError.message);
      setIsUploading(false);
      return;
    }
    const { data } = supabase.storage.from('uploads').getPublicUrl(fileName);
    addAttachment(data.publicUrl);
    setIsUploading(false);
  }

  const submitOrder = async () => {
    setIsSubmitting(true)
    
    // 1. Auth Check
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
        alert("ACCESS DENIED: Please login.")
        router.push('/login')
        return
    }

    // 2. Calculate Exact Price 🧮
    let finalPrice = null;
    let finalStatus = 'pending_review'; // Default if calculation fails

    try {
        const calculation = await generateAiQuote(formData);
        if (calculation && calculation.estimated_price) {
            finalPrice = calculation.estimated_price;
            finalStatus = 'quoted'; // <--- IMPORTANT: Sets status to QUOTED so user can see it
        }
    } catch (e) {
        console.error("Calculation failed");
    }

    // 3. Save to Database
    const { error } = await supabase.from('projects').insert({
        user_id: session.user.id,
        title: formData.projectName,
        description: formData.description,
        platform_type: formData.projectType,
        brand_config: { color: formData.brandColor },
        features: formData.features,
        attachments: formData.attachments,
        
        // SAVE THE EXACT PRICE
        price: finalPrice, 
        status: finalStatus
    })

    setIsSubmitting(false)

    if (error) {
        alert('Error: ' + error.message)
    } else {
        // No alert box! Just go straight to the dashboard to see the price.
        router.push(`/dashboard`) 
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col items-center pt-10 px-4 pb-20">
      
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-mono font-bold text-gysis-main uppercase tracking-tight">System Configurator</h1>
        <p className="font-mono text-xs text-gray-500 mt-2">STEP {step} OF 4</p>
      </div>

      <div className="max-w-4xl w-full bg-white shadow-sm border-2 border-gysis-main p-8 md:p-12">
        
        {/* PROGRESS BAR (Tech Style) */}
        <div className="flex items-center gap-1 mb-10 text-xs font-mono font-bold border-b-2 border-gray-100 pb-6">
            {['BASICS', 'BRANDING', 'MODULES', 'CONFIRM'].map((label, i) => (
                <div key={label} className="flex items-center">
                    <span className={step >= i + 1 ? "text-gysis-main bg-gysis-pop/20 px-2 py-1" : "text-gray-300 px-2"}>
                        0{i+1}._{label}
                    </span>
                    {i < 3 && <span className="text-gray-300 mx-2">/</span>}
                </div>
            ))}
        </div>

        {/* STEP 1: BASICS */}
        {step === 1 && (
            <div className="space-y-8 max-w-lg mx-auto">
                <label className="block">
                    <span className="font-mono font-bold text-xs uppercase text-gray-500 mb-2 block">Project_Codename</span>
                    <input 
                        className="w-full border-2 border-gray-200 p-4 font-mono focus:border-gysis-main focus:outline-none transition-colors rounded-none bg-gray-50 focus:bg-white"
                        placeholder="E.G. UBER_FOR_X"
                        value={formData.projectName}
                        onChange={(e) => setField('projectName', e.target.value)}
                        autoFocus
                    />
                </label>
                
                <label className="block">
                    <span className="font-mono font-bold text-xs uppercase text-gray-500 mb-2 block">System_Description</span>
                    <textarea 
                        className="w-full border-2 border-gray-200 p-4 font-mono focus:border-gysis-main focus:outline-none transition-colors rounded-none bg-gray-50 focus:bg-white h-40 resize-none"
                        placeholder="DESCRIBE CORE FUNCTIONALITY..."
                        value={formData.description}
                        onChange={(e) => setField('description', e.target.value)}
                    />
                </label>

                <button 
                    onClick={nextStep}
                    disabled={!formData.projectName}
                    className="w-full bg-gysis-main text-white px-6 py-5 font-mono font-bold hover:bg-gysis-light disabled:opacity-50 transition-colors uppercase tracking-widest"
                >
                    INITIALIZE_BRANDING &rarr;
                </button>
            </div>
        )}

        {/* STEP 2: BRANDING */}
        {step === 2 && (
            <div className="space-y-8">
                <BrandPreview />
                
                <div className="border-t-2 border-gray-100 pt-8">
                    <h3 className="font-mono font-bold text-sm uppercase mb-4 text-gysis-main">Visual_References</h3>
                    
                    <div className="flex flex-col md:flex-row gap-4 items-start">
                        <label className="cursor-pointer bg-white border-2 border-dashed border-gray-300 px-6 py-4 hover:border-gysis-main hover:bg-gray-50 transition flex flex-col items-center gap-2 group w-full md:w-auto">
                            <span className="font-mono text-xs font-bold text-gray-400 group-hover:text-gysis-main uppercase">{isUploading ? 'UPLOADING...' : '+ UPLOAD_FILE'}</span>
                            <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} disabled={isUploading} />
                        </label>

                        {formData.attachments.length > 0 && (
                            <div className="flex gap-2 overflow-x-auto pb-2">
                                {formData.attachments.map((url, i) => (
                                    <img key={i} src={url} className="h-20 w-20 object-cover border border-gray-200" alt="Ref" />
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex gap-4 justify-end pt-8 border-t-2 border-gray-100">
                    <button onClick={prevStep} className="px-6 py-3 border-2 border-gray-200 font-mono text-xs font-bold hover:border-black transition uppercase">Back</button>
                    <button onClick={nextStep} className="bg-gysis-main text-white px-8 py-3 font-mono font-bold text-xs hover:bg-gysis-light uppercase tracking-wider">Confirm_Visuals</button>
                </div>
            </div>
        )}

        {/* STEP 3: FEATURES */}
        {step === 3 && (
            <div className="space-y-8">
                <h2 className="font-mono font-bold text-lg uppercase text-gysis-main">Select_Modules</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {['User Login', 'Payments (Stripe)', 'Chat System', 'Map / GPS', 'Admin Panel', 'File Upload', 'Push Notifications', 'Social Feed'].map((feat) => (
                        <button
                            key={feat}
                            onClick={() => toggleFeature(feat)}
                            className={`p-4 border-2 text-left transition-all font-mono text-xs font-bold uppercase ${
                                formData.features.includes(feat)
                                    ? 'border-gysis-main bg-gysis-main text-white'
                                    : 'border-gray-200 hover:border-gysis-main text-gray-400 hover:text-gysis-main'
                            }`}
                        >
                            <div className="flex justify-between items-center">
                                <span>{feat}</span>
                                {formData.features.includes(feat) && <span className="text-gysis-pop">●</span>}
                            </div>
                        </button>
                    ))}
                </div>
                <div className="flex gap-4 justify-end pt-8 border-t-2 border-gray-100 mt-4">
                    <button onClick={prevStep} className="px-6 py-3 border-2 border-gray-200 font-mono text-xs font-bold hover:border-black transition uppercase">Back</button>
                    <button onClick={nextStep} className="bg-gysis-main text-white px-8 py-3 font-mono font-bold text-xs hover:bg-gysis-light uppercase tracking-wider">Review_Spec</button>
                </div>
            </div>
        )}

        {/* STEP 4: SUBMIT */}
        {step === 4 && (
            <div className="text-center space-y-8 py-8">
                <div className="bg-gray-50 border-2 border-gray-200 p-8 text-left w-full max-w-lg mx-auto">
                    <h3 className="font-mono font-bold text-gray-400 uppercase text-xs mb-6 border-b border-gray-200 pb-2">Manifest_Summary</h3>
                    
                    <div className="space-y-4 font-mono text-sm">
                        <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="text-gray-500">CODENAME</span>
                            <span className="font-bold text-gysis-main uppercase">{formData.projectName}</span>
                        </div>
                        
                        <div className="flex justify-between border-b border-gray-200 pb-2">
                             <span className="text-gray-500">TYPE</span>
                             <span className="font-bold uppercase">{formData.projectType}</span>
                        </div>

                        <div className="py-2">
                            <span className="text-gray-500 block mb-2 text-xs">MODULES_INSTALLED:</span>
                            <div className="flex flex-wrap gap-2">
                                {formData.features.map(f => (
                                    <span key={f} className="text-[10px] bg-white border border-gray-300 px-2 py-1 uppercase">{f}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="flex justify-center gap-4">
                    <button onClick={prevStep} className="px-6 py-3 font-mono text-xs font-bold text-gray-400 hover:text-black">EDIT_CONFIG</button>
                    <button 
                        onClick={submitOrder} 
                        disabled={isSubmitting}
                        className="bg-gysis-pop text-gysis-main border-2 border-gysis-pop px-10 py-4 font-mono font-bold text-sm hover:bg-white hover:text-gysis-main transition-colors uppercase tracking-widest shadow-[4px_4px_0px_0px_#023047]"
                    >
                        {isSubmitting ? 'TRANSMITTING...' : 'EXECUTE_ORDER'}
                    </button>
                </div>
            </div>
        )}

      </div>
    </div>
  )
}