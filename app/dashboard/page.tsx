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
       
       // CHANGE TO YOUR ADMIN EMAIL
       const adminCheck = session.user.email === 'admin@gysis.com'
       setIsAdmin(adminCheck)

       let query = supabase.from('projects').select('*').order('created_at', { ascending: false })
       
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
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6 border-b border-gray-200 pb-6">
          <div>
            <h1 className="text-3xl font-mono font-bold text-gysis-main tracking-tighter uppercase mb-2">
              {isAdmin ? 'System_Admin' : 'Client_Portal'}
            </h1>
            <div className="flex items-center gap-2 text-xs font-mono text-gray-500">
               <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
               LOGGED IN AS: <span className="text-gysis-main font-bold">{userEmail}</span>
            </div>
          </div>
          
          <div className="flex gap-4 items-center">
            <button 
                onClick={async () => { await supabase.auth.signOut(); router.push('/login'); }}
                className="font-mono text-xs text-gray-400 hover:text-red-600 uppercase tracking-widest px-4"
            >
                [ Sign_Out ]
            </button>
            <Link href="/wizard" className="bg-gysis-main text-white px-6 py-3 rounded-none font-mono font-bold text-sm shadow-[4px_4px_0px_0px_#FFB703] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all border border-gysis-main">
              + NEW_SPEC
            </Link>
          </div>
        </div>

        {/* PROJECT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link key={project.id} href={`/dashboard/${project.id}`} className="block group">
                
                <div className="bg-white border-2 border-gray-200 group-hover:border-gysis-main transition-all duration-200 h-full flex flex-col relative">
                    
                    {/* STATUS BAR */}
                    <div className={`h-1 w-full ${
                        project.status === 'pending_review' ? 'bg-yellow-400' :
                        project.status === 'quoted' ? 'bg-blue-500' :
                        project.status === 'project_started' ? 'bg-green-500' : 'bg-gray-300'
                    }`}></div>

                    <div className="p-6 flex-1 flex flex-col">
                        
                        {/* ID & DATE */}
                        <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-3">
                            <span className="font-mono text-[10px] text-gray-400 uppercase tracking-wider">
                                ID: {project.id.slice(0, 8)}
                            </span>
                            <span className={`font-mono text-[10px] px-2 py-0.5 rounded-sm uppercase font-bold
                                ${project.status === 'pending_review' ? 'text-yellow-700 bg-yellow-50' : 
                                  project.status === 'quoted' ? 'text-blue-700 bg-blue-50' :
                                  project.status === 'project_started' ? 'text-green-700 bg-green-50' : 'text-gray-500'}`}>
                                {project.status.replace('_', ' ')}
                            </span>
                        </div>

                        {/* TITLE & PRICE */}
                        <div className="mb-6">
                            <h3 className="font-sans font-bold text-xl text-gysis-main mb-1 group-hover:text-gysis-light transition-colors truncate">
                                {project.title}
                            </h3>
                            <div className="flex justify-between items-end mt-2">
                                <span className="font-mono text-xs text-gray-500 uppercase bg-gray-100 px-2 py-1 rounded-sm">
                                    {project.platform_type}
                                </span>
                                
                                {/* PRICE TAG (NEW) */}
                                {project.price ? (
                                    <span className="font-mono font-bold text-xl text-gysis-pop drop-shadow-sm">
                                        ${parseInt(project.price).toLocaleString()}
                                    </span>
                                ) : (
                                    <span className="font-mono text-[10px] text-gray-300 uppercase">
                                        Calculating...
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* FEATURES */}
                        <div className="mt-auto">
                            <p className="font-mono text-[10px] text-gray-400 mb-2 uppercase">Modules:</p>
                            <div className="flex flex-wrap gap-1">
                                {(project.features as string[])?.slice(0, 3).map((feat, i) => (
                                <span key={i} className="font-mono text-[10px] bg-white border border-gray-300 text-gray-600 px-2 py-1">
                                    {feat}
                                </span>
                                ))}
                                {(project.features as string[])?.length > 3 && (
                                    <span className="font-mono text-[10px] text-gray-400 px-1 pt-1">...</span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* FOOTER */}
                    <div className="bg-gray-50 p-3 border-t border-gray-200 flex justify-between items-center">
                         <div className="flex items-center gap-2">
                            <div 
                                className="w-3 h-3 rounded-none border border-gray-300"
                                style={{ backgroundColor: project.brand_config?.color || '#000' }} 
                            ></div>
                            <span className="font-mono text-[10px] text-gray-500">HEX: {project.brand_config?.color}</span>
                         </div>
                         <span className="font-mono text-[10px] text-gysis-main group-hover:underline">OPEN_SPEC &rarr;</span>
                    </div>

                </div>
            </Link>
          ))}

          {/* EMPTY STATE */}
          {projects.length === 0 && (
            <div className="col-span-full py-20 text-center border-2 border-dashed border-gray-300 bg-gray-50">
              <p className="font-mono text-gray-500 mb-4 uppercase text-xs tracking-widest">Database_Empty</p>
              <Link href="/wizard" className="text-gysis-main font-bold font-mono hover:text-gysis-pop border-b-2 border-gysis-main pb-1">INITIALIZE_FIRST_PROJECT</Link>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}