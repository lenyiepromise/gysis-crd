"use client"
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '@/lib/supabase' // <--- Use our working client

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border">
        <h1 className="text-2xl font-bold mb-6 text-center">Gysis Login</h1>
        
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={['google', 'github']} // Email/Password only
          redirectTo="http://localhost:3000/dashboard"
        />
      </div>
    </div>
  )
}