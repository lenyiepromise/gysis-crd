import { supabase } from '@/lib/supabase'
import Link from 'next/link'

// This is a Server Component. It runs on the server to fetch data FAST.
export const revalidate = 0; // Disable caching so you see new orders instantly

export default async function Dashboard() {
  
  // 1. Fetch all projects from Supabase
  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return <div className="p-10 text-red-500">Error loading data: {error.message}</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Project Dashboard</h1>
            <p className="text-gray-500">Gysis Client Requests</p>
          </div>
          <Link href="/wizard" className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800">
            + New Request
          </Link>
        </div>

        {/* The Grid of Orders */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {projects?.map((project) => (
            <div key={project.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
              
              {/* Status Badge */}
              <div className="flex justify-between items-start mb-4">
                <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded uppercase">
                  {project.status}
                </span>
                <span className="text-xs text-gray-400">
                  {new Date(project.created_at).toLocaleDateString()}
                </span>
              </div>

              {/* Title & Platform */}
              <h3 className="font-bold text-lg mb-1">{project.title}</h3>
              <p className="text-sm text-gray-500 capitalize mb-4">{project.platform_type} App</p>

              {/* Brand DNA Visualizer */}
              <div className="flex items-center gap-2 p-2 bg-gray-50 rounded border">
                <div 
                  className="w-6 h-6 rounded-full border shadow-sm"
                  style={{ backgroundColor: project.brand_config?.color || '#000' }} 
                ></div>
                <span className="text-xs font-mono text-gray-600">
                   {project.brand_config?.color}
                </span>
              </div>

            </div>
          ))}

          {/* Empty State */}
          {projects?.length === 0 && (
            <div className="col-span-full text-center py-20 text-gray-400">
              No projects yet. Go create one!
            </div>
          )}

        </div>
      </div>
    </div>
  )
}