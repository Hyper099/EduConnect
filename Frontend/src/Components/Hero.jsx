import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function AnimatedCounter({ target, label, suffix = '' }) {
   const [count, setCount] = useState(0);

   useEffect(() => {
      let start = 0;
      const duration = 1800;
      const step = target / (duration / 16);
      const timer = setInterval(() => {
         start += step;
         if (start >= target) {
            setCount(target);
            clearInterval(timer);
         } else {
            setCount(Math.floor(start));
         }
      }, 16);
      return () => clearInterval(timer);
   }, [target]);

   return (
      <div className="text-center">
         <div className="text-2xl md:text-3xl font-bold text-white">
            {count.toLocaleString()}{suffix}
         </div>
         <div className="text-sm text-indigo-200/70 mt-1">{label}</div>
      </div>
   );
}

const categories = [
   {
      name: 'Web Development',
      icon: (
         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
         </svg>
      ),
      color: 'from-blue-500 to-cyan-500',
   },
   {
      name: 'Data Science',
      icon: (
         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
         </svg>
      ),
      color: 'from-violet-500 to-purple-500',
   },
   {
      name: 'UX / UI Design',
      icon: (
         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
         </svg>
      ),
      color: 'from-pink-500 to-rose-500',
   },
   {
      name: 'Finance',
      icon: (
         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182S11.275 7.5 12 7.5c.768 0 1.536.22 2.121.659" />
         </svg>
      ),
      color: 'from-emerald-500 to-teal-500',
   },
];

export default function Hero() {
   return (
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 dark:from-gray-950 dark:via-indigo-950/80 dark:to-gray-950">
         {/* Ambient blurs */}
         <div className="absolute inset-0 pointer-events-none">
            <div
               className="absolute w-[500px] h-[500px] rounded-full bg-indigo-500/[0.07] blur-[120px]"
               style={{ top: '-10%', right: '-5%', animation: 'auth-float 20s ease-in-out infinite' }}
            />
            <div
               className="absolute w-[400px] h-[400px] rounded-full bg-violet-500/[0.06] blur-[100px]"
               style={{ bottom: '-10%', left: '-5%', animation: 'auth-float-alt 18s ease-in-out infinite -3s' }}
            />
            <div
               className="absolute w-24 h-24 rounded-full border border-white/[0.03]"
               style={{ top: '20%', right: '15%', animation: 'auth-float 14s ease-in-out infinite -2s' }}
            />
            <div
               className="absolute w-3 h-3 rounded-full bg-cyan-400/20"
               style={{ top: '35%', left: '12%', animation: 'auth-float-alt 8s ease-in-out infinite' }}
            />
            <div
               className="absolute w-2 h-2 rounded-full bg-violet-400/25"
               style={{ bottom: '30%', right: '20%', animation: 'auth-float 10s ease-in-out infinite -4s' }}
            />
            <div
               className="absolute w-40 h-40 rounded-full border border-white/[0.02]"
               style={{ bottom: '10%', right: '30%', animation: 'auth-float-alt 16s ease-in-out infinite -5s' }}
            />
         </div>

         {/* Dot grid overlay */}
         <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
               backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
               backgroundSize: '32px 32px',
            }}
         />

         <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 lg:pt-28 lg:pb-32">
            <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
               {/* ── Left: Copy ── */}
               <div className="flex-1 text-center lg:text-left max-w-2xl">
                  <div
                     className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-indigo-300 text-xs font-medium tracking-wide mb-6"
                     style={{ animation: 'auth-fade-in 0.6s ease-out' }}
                  >
                     <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                     TRUSTED BY 2,500+ LEARNERS
                  </div>

                  <h1
                     className="text-4xl sm:text-5xl lg:text-[56px] font-bold leading-[1.1] text-white mb-6"
                     style={{ animation: 'auth-fade-in 0.6s ease-out 0.1s both' }}
                  >
                     Unlock Your Potential with{' '}
                     <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
                        Expert-Led Courses
                     </span>
                  </h1>

                  <p
                     className="text-lg text-gray-400 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
                     style={{ animation: 'auth-fade-in 0.6s ease-out 0.2s both' }}
                  >
                     Join thousands of learners mastering new skills and advancing their careers through our premium online courses.
                  </p>

                  <div
                     className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
                     style={{ animation: 'auth-fade-in 0.6s ease-out 0.3s both' }}
                  >
                     <Link
                        to="/courses"
                        className="px-7 py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-center"
                     >
                        Browse Courses
                     </Link>
                     <Link
                        to="/register/student"
                        className="px-7 py-3.5 rounded-xl text-sm font-semibold text-white/90 border border-white/[0.12] hover:bg-white/[0.06] hover:border-white/[0.2] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-center"
                     >
                        Get Started Free
                     </Link>
                  </div>

                  {/* Stats */}
                  <div
                     className="mt-14 grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0"
                     style={{ animation: 'auth-fade-in 0.6s ease-out 0.4s both' }}
                  >
                     <AnimatedCounter target={2500} label="Students" suffix="+" />
                     <AnimatedCounter target={150} label="Courses" suffix="+" />
                     <AnimatedCounter target={49} label="Rating" suffix="/5" />
                  </div>
               </div>

               {/* ── Right: Category cards ── */}
               <div
                  className="flex-shrink-0 w-full max-w-md"
                  style={{ animation: 'auth-fade-in 0.8s ease-out 0.3s both' }}
               >
                  <div className="bg-white/[0.04] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-6">
                     <h3 className="text-white font-semibold text-lg mb-1">Explore Top Categories</h3>
                     <p className="text-gray-500 text-sm mb-5">Start learning from the best</p>

                     <div className="grid grid-cols-1 gap-2.5">
                        {categories.map((cat) => (
                           <Link
                              key={cat.name}
                              to="/courses"
                              className="group flex items-center gap-3.5 p-3 rounded-xl hover:bg-white/[0.04] transition-colors duration-200"
                           >
                              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white shadow-lg shadow-black/10 group-hover:scale-105 transition-transform duration-200`}>
                                 {cat.icon}
                              </div>
                              <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{cat.name}</span>
                              <svg className="w-4 h-4 text-gray-600 ml-auto opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                           </Link>
                        ))}
                     </div>

                     <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center gap-3">
                        <div className="flex -space-x-2">
                           {['bg-indigo-500', 'bg-violet-500', 'bg-rose-500', 'bg-amber-500'].map((bg, i) => (
                              <div key={i} className={`w-7 h-7 rounded-full ${bg} border-2 border-slate-900 flex items-center justify-center text-white text-[10px] font-bold`}>
                                 {['A', 'M', 'S', 'D'][i]}
                              </div>
                           ))}
                        </div>
                        <div>
                           <p className="text-xs text-white/60">
                              <span className="text-white font-medium">2,500+</span> students already learning
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Bottom wave */}
         <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 100" fill="none" className="w-full text-white dark:text-gray-900">
               <path
                  d="M0 60L48 55C96 50 192 40 288 36.7C384 33 480 37 576 43.3C672 50 768 60 864 58.3C960 57 1056 43 1152 38.3C1248 33 1344 37 1392 39L1440 41V101H0V60Z"
                  fill="currentColor"
               />
            </svg>
         </div>
      </section>
   );
}
