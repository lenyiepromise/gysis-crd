import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gysis-main text-white selection:bg-gysis-pop selection:text-gysis-main">
      
      {/* HERO SECTION */}
      <section className="flex flex-col items-center justify-center text-center px-4 py-32 max-w-5xl mx-auto relative overflow-hidden">
        
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>

        <div className="z-10 flex flex-col items-center">
            <div className="inline-block border border-gysis-pop/30 bg-gysis-pop/10 text-gysis-pop px-4 py-1 rounded-none text-xs font-mono font-bold mb-8 tracking-widest uppercase">
              System_Online v1.0
            </div>
            
            <h1 className="text-5xl md:text-7xl font-mono font-bold tracking-tighter mb-8 leading-tight">
              DEFINE SOFTWARE.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gysis-pop to-yellow-200">
                BUILD FASTER.
              </span>
            </h1>
            
            <p className="text-xl text-gray-400 mb-12 max-w-2xl font-sans font-light leading-relaxed">
              Stop writing vague documents. Use the Gysis Builder to visually configure your app stack, generate specs, and get an instant quote.
            </p>
            
            <div className="flex flex-col md:flex-row gap-6 w-full md:w-auto">
              <Link href="/wizard" className="bg-gysis-pop text-gysis-main text-lg px-8 py-4 rounded-sm font-mono font-bold hover:bg-white hover:translate-x-1 hover:translate-y-1 transition-all shadow-[6px_6px_0px_0px_rgba(255,255,255,0.2)]">
                [ INITIALIZE_PROJECT ]
              </Link>
              <button className="px-8 py-4 rounded-sm font-mono font-bold text-white border border-white/20 hover:bg-white/10 transition flex items-center justify-center gap-2">
                <span>READ_DOCS</span>
                <span className="text-xs">↗</span>
              </button>
            </div>
        </div>
      </section>

      {/* FEATURE GRID */}
      <section className="bg-white text-gysis-main py-24 px-6 border-t border-gysis-pop">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Feature 1 */}
          <div className="p-8 border-2 border-gysis-main hover:shadow-[8px_8px_0px_#023047] transition-all group">
            <div className="w-12 h-12 bg-gysis-main text-gysis-pop flex items-center justify-center text-2xl mb-6 font-mono font-bold group-hover:bg-gysis-pop group-hover:text-gysis-main transition-colors">
              01
            </div>
            <h3 className="text-2xl font-mono font-bold mb-3 uppercase">Visual_Spec</h3>
            <p className="text-gray-600 leading-relaxed">Don't describe colors. Pick them. Don't describe layouts. Upload them. See your product before code is written.</p>
          </div>

          {/* Feature 2 */}
          <div className="p-8 border-2 border-gysis-main hover:shadow-[8px_8px_0px_#023047] transition-all group">
            <div className="w-12 h-12 bg-gysis-main text-gysis-pop flex items-center justify-center text-2xl mb-6 font-mono font-bold group-hover:bg-gysis-pop group-hover:text-gysis-main transition-colors">
              02
            </div>
            <h3 className="text-2xl font-mono font-bold mb-3 uppercase">Tech_Stack</h3>
            <p className="text-gray-600 leading-relaxed">Select pre-built modules like Stripe Payments, Chat Systems, and Maps to instantly define project scope.</p>
          </div>

          {/* Feature 3 */}
          <div className="p-8 border-2 border-gysis-main hover:shadow-[8px_8px_0px_#023047] transition-all group">
            <div className="w-12 h-12 bg-gysis-main text-gysis-pop flex items-center justify-center text-2xl mb-6 font-mono font-bold group-hover:bg-gysis-pop group-hover:text-gysis-main transition-colors">
              03
            </div>
            <h3 className="text-2xl font-mono font-bold mb-3 uppercase">Auto_Quote</h3>
            <p className="text-gray-600 leading-relaxed">Receive an intelligent price estimation immediately based on your selected feature complexity.</p>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gysis-main text-gray-500 py-12 text-center text-xs font-mono border-t border-white/10">
        <p>&copy; 2025 Gysis CRD</p>
      </footer>
    </main>
  )
}