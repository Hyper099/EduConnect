import { Link } from 'react-router-dom';

export default function Footer() {
   return (
      <footer className="bg-gray-950 text-gray-300 border-t border-white/[0.04]">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
               {/* Brand */}
               <div className="lg:col-span-1">
                  <Link to="/" className="flex items-center gap-2.5 mb-4">
                     <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-md shadow-indigo-500/20">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                           <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                        </svg>
                     </div>
                     <span className="text-lg font-bold text-white tracking-tight">
                        Edu<span className="text-indigo-400">Connect</span>
                     </span>
                  </Link>
                  <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                     Empowering learners worldwide with expert-led courses. Unlock your potential and advance your career with us.
                  </p>
               </div>

               {/* Quick Links */}
               <div>
                  <h3 className="text-white font-semibold text-sm tracking-wide mb-4">QUICK LINKS</h3>
                  <ul className="space-y-2.5">
                     {[
                        { to: '/courses', label: 'Browse Courses' },
                        { to: '/about', label: 'About Us' },
                        { to: '/contact', label: 'Contact Us' },
                        { to: '/register/instructor', label: 'Become an Instructor' },
                     ].map(({ to, label }) => (
                        <li key={to}>
                           <Link to={to} className="text-gray-500 text-sm hover:text-indigo-400 transition-colors duration-200">
                              {label}
                           </Link>
                        </li>
                     ))}
                  </ul>
               </div>

               {/* Support */}
               <div>
                  <h3 className="text-white font-semibold text-sm tracking-wide mb-4">SUPPORT</h3>
                  <ul className="space-y-2.5">
                     {['Help Center', 'Privacy Policy', 'Terms of Service', 'FAQ'].map((item) => (
                        <li key={item}>
                           <a href="#" className="text-gray-500 text-sm hover:text-indigo-400 transition-colors duration-200">
                              {item}
                           </a>
                        </li>
                     ))}
                  </ul>
               </div>

               {/* Newsletter */}
               <div>
                  <h3 className="text-white font-semibold text-sm tracking-wide mb-4">STAY UPDATED</h3>
                  <p className="text-gray-500 text-sm mb-3">Get the latest courses and offers in your inbox.</p>
                  <form onSubmit={(e) => e.preventDefault()} className="flex">
                     <input
                        type="email"
                        placeholder="Your email"
                        className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-l-xl px-3.5 py-2.5 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-all"
                     />
                     <button
                        type="submit"
                        className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white px-4 py-2.5 rounded-r-xl text-sm font-medium transition-all duration-200"
                     >
                        Subscribe
                     </button>
                  </form>
               </div>
            </div>
         </div>

         {/* Bottom Bar */}
         <div className="border-t border-white/[0.04]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
               <p className="text-gray-600 text-sm">
                  &copy; {new Date().getFullYear()} EduConnect. All rights reserved.
               </p>
               <div className="flex gap-5">
                  {['GitHub', 'Twitter', 'LinkedIn'].map((name) => (
                     <a key={name} href="#" className="text-gray-600 hover:text-indigo-400 transition-colors duration-200 text-sm">
                        {name}
                     </a>
                  ))}
               </div>
            </div>
         </div>
      </footer>
   );
}
