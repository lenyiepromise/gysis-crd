"use client"
import { useWizardStore } from '@/store/useWizardStore'

export default function BrandPreview() {
  const { formData, setField } = useWizardStore()

  return (
    <div className="flex gap-8 border p-6 rounded-xl bg-white">
      {/* Controls */}
      <div className="w-1/3 space-y-4">
        <label className="block text-sm font-bold">Brand Color</label>
        <div className="flex items-center gap-2">
            <input 
              type="color" 
              value={formData.brandColor}
              onChange={(e) => setField('brandColor', e.target.value)}
              className="h-10 w-10 cursor-pointer"
            />
            <span>{formData.brandColor}</span>
        </div>
        
        <label className="block text-sm font-bold mt-4">Platform</label>
        <select 
            className="w-full border p-2 rounded"
            value={formData.projectType}
            onChange={(e) => setField('projectType', e.target.value)}
        >
            <option value="web">Web Platform</option>
            <option value="mobile">Mobile App</option>
        </select>
      </div>

      {/* Mock Phone */}
      <div className="w-2/3 flex justify-center bg-gray-100 p-4 rounded-xl">
        <div className="bg-white border-4 border-gray-800 rounded-3xl h-64 w-32 overflow-hidden relative shadow-xl">
            {/* Header */}
            <div 
                className="h-10 w-full flex items-center justify-center text-white text-[10px] font-bold"
                style={{ backgroundColor: formData.brandColor }}
            >
                {formData.projectName || 'Your App'}
            </div>
            {/* Body */}
            <div className="p-2 space-y-2">
                <div className="h-4 bg-gray-100 rounded w-full"></div>
                <div className="h-12 bg-gray-100 rounded w-full"></div>
                <div 
                    className="mt-2 py-1 px-2 rounded text-white text-[10px] text-center"
                    style={{ backgroundColor: formData.brandColor }}
                >
                    Button
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}