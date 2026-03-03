import { Link } from 'react-router-dom';

export default function CTA() {
   return (
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 dark:from-gray-950 dark:via-indigo-950/80 dark:to-gray-950 py-24">
         {/* Ambient decoration */}
         <div className="absolute inset-0 pointer-events-none">
            <div
               className="absolute w-[400px] h-[400px] rounded-full bg-indigo-500/[0.06] blur-[100px]"
               style={{ top: '-20%', left: '10%', animation: 'auth-float 16s ease-in-out infinite' }}
            />
            <div
               className="absolute w-[300px] h-[300px] rounded-full bg-violet-500/[0.05] blur-[80px]"
               style={{ bottom: '-15%', right: '15%', animation: 'auth-float-alt 14s ease-in-out infinite -3s' }}
            />
            <div
               className="absolute inset-0 opacity-[0.015]"
               style={{
                  backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                  backgroundSize: '28px 28px',
               }}
            />
         </div>

         <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <div
               className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-indigo-300 text-xs font-medium tracking-wide mb-6"
            >
               <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
               GET STARTED TODAY
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
               Ready to Start Your{' '}
               <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
                  Learning Journey
               </span>?
            </h2>

            <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed mb-10">
               Whether you're eager to learn or passionate about teaching, our platform is the perfect place to grow your skills and career.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
               <Link
                  to="/register/student"
                  className="px-7 py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
               >
                  Register as Student
               </Link>
               <Link
                  to="/register/instructor"
                  className="px-7 py-3.5 rounded-xl text-sm font-semibold text-white/90 border border-white/[0.12] hover:bg-white/[0.06] hover:border-white/[0.2] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
               >
                  Become an Instructor
               </Link>
            </div>
         </div>
      </section>
   );
}
