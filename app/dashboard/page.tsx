"use client"
import { supabase } from '@/lib/supabase'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Dashboard() {
  const [projects, setProjects] = useState<any[]>([])
  const [userEmail, setUserEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function loadData() {
       const { data: { session } } = await supabase.auth.getSession()
       
       if (!session) {
         router.push('/login')
         return
       }

       setUserEmail(session.user.email || '')
       
       // CHANGE TO YOUR EMAIL
       const adminCheck = session.user.email === 'lenyiepromise@gmail.com'
       setIsAdmin(adminCheck)

       let query = supabase.from('projects').select('*').order('created_at', { ascending: false })
       
       // If NOT admin, only show MY projects
       if (!adminCheck) query = query.eq('user_id', session.user.id)
       
       const { data } = await query
       if (data) setProjects(data)
       setLoading(false)
    }

    loadData()
  }, [router])

  if (loading) return <div className="min-h-screen flex items-center justify-center font-mono text-gysis-main animate-pulse">LOADING_DASHBOARD...</div>

  return (
    <div className="min-h-screen bg-[#F5F7FA] p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="flex justify-between items-end mb-10 border-b border-gray-200 pb-6">
          <div>
            <h1 className="text-3xl font-mono font-bold text-gysis-main uppercase">
              {isAdmin ? 'System_Admin' : 'Client_Portal'}
            </h1>
            <p className="font-mono text-xs text-gray-400 mt-1">LOGGED IN AS: {userEmail}</p>
          </div>
          <Link href="/wizard" className="bg-gysis-main text-white px-6 py-3 font-mono font-bold text-sm shadow-[4px_4px_0px_#FFB703]">
            + NEW_SPEC
          </Link>
        </div>

        {/* PROJECT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link key={project.id} href={`/dashboard/${project.id}`} className="block group">
                <div className="bg-white border-2 border-gray-200 group-hover:border-gysis-main transition p-6 h-full flex flex-col">
                    <div className="flex justify-between mb-4">
                        <span className="font-mono text-[10px] text-gray-400">ID: {project.id.slice(0, 8)}</span>
                        <span className={`font-mono text-[10px] px-2 py-1 uppercase font-bold
                            ${project.status === 'pending_review' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100'}`}>
                            {project.status.replace('_', ' ')}
                        </span>
                    </div>
                    <h3 className="font-bold text-xl text-gysis-main mb-2">{project.title}</h3>
                    <p className="font-mono text-xs text-gray-500 uppercase">{project.platform_type}</p>
                </div>
            </Link>
          ))}
        </div>

        {projects.length === 0 && (
            <div className="text-center py-20 text-gray-400 font-mono">NO PROJECTS FOUND.</div>
        )}

      </div>
    </div>
  )
}