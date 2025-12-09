"use client"
import { supabase } from '@/lib/supabase'
import { useEffect, useState, use } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function ProjectDetails({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const [project, setProject] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function loadProject() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return router.push('/login')

      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', resolvedParams.id)
        .single()

      if (error) {
        alert("Project not found in DB")
        router.push('/dashboard')
      } else {
        setProject(data)
      }
      setLoading(false)
    }
    loadProject()
  }, [resolvedParams.id, router])

  if (loading) return <div className="p-10 font-mono">LOADING...</div>
  if (!project) return null

  return (
    <div className="min-h-screen bg-[#F5F7FA] p-8">
      <Link href="/dashboard" className="font-mono text-xs mb-6 inline-block">&larr; BACK</Link>
      <div className="bg-white p-8 border-2 border-gray-200">
        <h1 className="text-3xl font-bold text-gysis-main mb-4">{project.title}</h1>
        <p className="text-gray-600">{project.description}</p>
      </div>
    </div>
  )
}