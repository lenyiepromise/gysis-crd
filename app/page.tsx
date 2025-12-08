import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 border-b">
        <div className="text-2xl font-black tracking-tighter">GYSIS CRD</div>
        <div className="flex gap-4 text-sm font-medium">
          <Link href="/dashboard" className="text-gray-500 hover:text-black">
            Admin Login
          </Link>
          <Link href="/wizard" className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition">
            Start Project
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-4 py-32 max-w-4xl mx-auto">
        <div className="inline-block bg-gray-100 text-gray-800 px-4 py-1 rounded-full text-xs font-bold mb-6 tracking-wide uppercase">
          The new standard for software specs
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-gray-900 leading-tight">
          Turn your idea into a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Product Spec</span> in minutes.
        </h1>
        <p className="text-xl text-gray-500 mb-10 max-w-2xl">
          Don't write boring documents. Use the Gysis Builder to visualize your app, define features, and get a quote instantly.
        </p>
        
        <div className="flex gap-4">
          <Link href="/wizard" className="bg-black text-white text-lg px-8 py-4 rounded-xl font-bold shadow-xl hover:scale-105 transition-transform">
            Build my App Spec &rarr;
          </Link>
          <button className="px-8 py-4 rounded-xl font-bold text-gray-600 border border-gray-200 hover:border-black transition">
            How it works
          </button>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="bg-gray-50 py-20 px-6 border-t">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl mb-4">🎨</div>
            <h3 className="text-xl font-bold mb-2">Visual Branding</h3>
            <p className="text-gray-500">Don't just describe colors. See them applied to your future app in real-time.</p>
          </div>
          <div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-2xl mb-4">🧩</div>
            <h3 className="text-xl font-bold mb-2">Feature Stacks</h3>
            <p className="text-gray-500">Select from pre-built modules like Chat, Payments, and Maps to define scope.</p>
          </div>
          <div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-2xl mb-4">⚡</div>
            <h3 className="text-xl font-bold mb-2">Instant Quote</h3>
            <p className="text-gray-500">Get a development estimate immediately based on the complexity of your stack.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center text-gray-400 text-sm border-t">
        &copy; 2025 Gysis Marketplace. All rights reserved.
      </footer>
    </main>
  )
}