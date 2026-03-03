import { useEffect, useRef, useState } from "react";
import { FaBars, FaMoon, FaSearch, FaShoppingCart, FaSignOutAlt, FaSun, FaTimes } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import { useTheme } from "../Context/ThemeContext";
import API from "../utils/api";

export default function Navbar() {
   const [user, setUser] = useState(null);
   const navigate = useNavigate();
   const location = useLocation();
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const [searchQuery, setSearchQuery] = useState("");
   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
   const [isSignupOpen, setIsSignupOpen] = useState(false);
   const [scrolled, setScrolled] = useState(false);
   const signupRef = useRef();
   const dropdownRef = useRef();
   const { cartCount } = useCart();
   const { theme, toggleTheme } = useTheme();

   // Scroll detection for glassmorphism
   useEffect(() => {
      const handleScroll = () => setScrolled(window.scrollY > 10);
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
   }, []);

   // Outside-click handler
   useEffect(() => {
      const handleClickOutside = (event) => {
         if (signupRef.current && !signupRef.current.contains(event.target)) setIsSignupOpen(false);
         if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setIsDropdownOpen(false);
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
   }, []);

   // Close mobile menu on route change
   useEffect(() => { setIsMenuOpen(false); }, [location.pathname]);

   // Fetch user on mount
   useEffect(() => {
      const fetchUser = async () => {
         const token = localStorage.getItem("token");
         const role = localStorage.getItem("role");
         if (token && role) {
            try {
               const response = await API.get(`/${role}/details`, { headers: { token } });
               setUser(response.data);
            } catch { /* token invalid */ }
         }
      };
      fetchUser();
   }, []);

   const handleLogout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      setUser(null);
      navigate("/");
   };

   const isActive = (path) => location.pathname === path;

   const navLinks = [
      { to: "/", label: "Home" },
      { to: "/courses", label: "Courses" },
      { to: "/about", label: "About" },
      { to: "/contact", label: "Contact" },
   ];

   return (
      <>
         <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
               scrolled
                  ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.08)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.3)]"
                  : "bg-white dark:bg-gray-900"
            }`}
         >
            <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 lg:px-6">
               {/* Logo */}
               <Link to="/" className="flex items-center gap-2.5 group">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-md shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-shadow duration-300">
                     <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                     </svg>
                  </div>
                  <span className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">
                     Edu<span className="text-indigo-600 dark:text-indigo-400">Connect</span>
                  </span>
               </Link>

               {/* Desktop Nav */}
               <nav className="hidden lg:flex items-center gap-1">
                  {navLinks.map(({ to, label }) => (
                     <Link
                        key={to}
                        to={to}
                        className={`relative px-3.5 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                           isActive(to)
                              ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10"
                              : "text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                        }`}
                     >
                        {label}
                     </Link>
                  ))}
               </nav>

               {/* Desktop Right */}
               <div className="hidden lg:flex items-center gap-2">
                  {/* Search */}
                  <div className="relative">
                     <input
                        type="text"
                        placeholder="Search courses..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-52 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm rounded-xl py-2 pl-9 pr-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:bg-white dark:focus:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200"
                     />
                     <FaSearch className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500 text-xs" />
                  </div>

                  {/* Theme toggle */}
                  <button
                     onClick={toggleTheme}
                     className="p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200"
                     aria-label="Toggle theme"
                  >
                     {theme === "dark" ? <FaSun size={16} /> : <FaMoon size={16} />}
                  </button>

                  {user ? (
                     <>
                        {/* Cart (students only) */}
                        {localStorage.getItem("role") !== "instructor" && (
                           <Link
                              to="/cart"
                              className="relative p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200"
                           >
                              <FaShoppingCart size={16} />
                              {cartCount > 0 && (
                                 <span className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center leading-none shadow-sm">
                                    {cartCount}
                                 </span>
                              )}
                           </Link>
                        )}

                        {/* User dropdown */}
                        <div className="relative" ref={dropdownRef}>
                           <button
                              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                           >
                              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white text-xs font-bold">
                                 {user.firstName?.charAt(0)?.toUpperCase()}
                              </div>
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{user.firstName}</span>
                              <svg className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                           </button>

                           <div
                              className={`absolute right-0 mt-2 w-52 bg-white dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700 rounded-xl shadow-lg shadow-black/5 dark:shadow-black/20 overflow-hidden transition-all duration-200 origin-top-right ${
                                 isDropdownOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                              }`}
                           >
                              <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                                 <p className="text-sm font-medium text-gray-900 dark:text-white">{user.firstName} {user.lastName}</p>
                                 <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{localStorage.getItem("role")}</p>
                              </div>
                              <div className="py-1">
                                 <Link
                                    to={`/dashboard/${localStorage.getItem("role")}`}
                                    onClick={() => setIsDropdownOpen(false)}
                                    className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                                 >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>
                                    Dashboard
                                 </Link>
                                 <Link
                                    to="/profile"
                                    onClick={() => setIsDropdownOpen(false)}
                                    className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                                 >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
                                    Profile
                                 </Link>
                              </div>
                              <div className="border-t border-gray-100 dark:border-gray-700 py-1">
                                 <button
                                    onClick={() => { handleLogout(); setIsDropdownOpen(false); }}
                                    className="flex items-center gap-2.5 w-full px-4 py-2 text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
                                 >
                                    <FaSignOutAlt className="text-xs" /> Sign out
                                 </button>
                              </div>
                           </div>
                        </div>
                     </>
                  ) : (
                     <div className="flex items-center gap-2 ml-1">
                        <Link
                           to="/login"
                           className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                        >
                           Log in
                        </Link>
                        <div className="relative" ref={signupRef}>
                           <button
                              onClick={() => setIsSignupOpen(!isSignupOpen)}
                              className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl hover:from-indigo-500 hover:to-violet-500 shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all duration-200"
                           >
                              Sign Up
                           </button>
                           <div
                              className={`absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700 rounded-xl shadow-lg shadow-black/5 dark:shadow-black/20 overflow-hidden transition-all duration-200 origin-top-right ${
                                 isSignupOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                              }`}
                           >
                              <Link
                                 to="/register/student"
                                 onClick={() => setIsSignupOpen(false)}
                                 className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                              >
                                 <span>🎓</span> As Student
                              </Link>
                              <Link
                                 to="/register/instructor"
                                 onClick={() => setIsSignupOpen(false)}
                                 className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                              >
                                 <span>📚</span> As Instructor
                              </Link>
                           </div>
                        </div>
                     </div>
                  )}
               </div>

               {/* Mobile Hamburger */}
               <button
                  className="lg:hidden p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  aria-label="Toggle menu"
               >
                  {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
               </button>
            </div>
         </header>

         {/* Spacer for fixed header */}
         <div className="h-[56px]" />

         {/* Mobile Overlay */}
         <div
            className={`fixed inset-0 bg-black/40 z-40 lg:hidden transition-opacity duration-300 ${
               isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={() => setIsMenuOpen(false)}
         />

         {/* Mobile Drawer */}
         <div
            className={`fixed top-0 right-0 h-full w-[300px] bg-white dark:bg-gray-900 z-50 lg:hidden shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] ${
               isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
         >
            <div className="flex flex-col h-full">
               {/* Drawer header */}
               <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
                  <span className="text-base font-bold text-gray-900 dark:text-white">Menu</span>
                  <button
                     onClick={() => setIsMenuOpen(false)}
                     className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition"
                  >
                     <FaTimes size={16} />
                  </button>
               </div>

               {/* Search */}
               <div className="px-5 py-3">
                  <div className="relative">
                     <input
                        type="text"
                        placeholder="Search courses..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm rounded-xl py-2.5 pl-9 pr-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 placeholder-gray-400 dark:placeholder-gray-500"
                     />
                     <FaSearch className="absolute left-3 top-3 text-gray-400 dark:text-gray-500 text-xs" />
                  </div>
               </div>

               {/* Nav links */}
               <nav className="flex flex-col px-3 py-1">
                  {navLinks.map(({ to, label }) => (
                     <Link
                        key={to}
                        to={to}
                        onClick={() => setIsMenuOpen(false)}
                        className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                           isActive(to)
                              ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10"
                              : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                        }`}
                     >
                        {label}
                     </Link>
                  ))}
               </nav>

               {/* Theme toggle */}
               <div className="mx-5 my-2 flex items-center justify-between px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                  <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">Dark Mode</span>
                  <button
                     onClick={toggleTheme}
                     className="p-1.5 rounded-lg bg-white dark:bg-gray-700 shadow-sm text-gray-600 dark:text-gray-300 transition"
                     aria-label="Toggle theme"
                  >
                     {theme === "dark" ? <FaSun size={14} /> : <FaMoon size={14} />}
                  </button>
               </div>

               {/* Spacer */}
               <div className="flex-1" />

               {/* Bottom actions */}
               <div className="px-5 py-5 border-t border-gray-100 dark:border-gray-800">
                  {user ? (
                     <div className="space-y-2">
                        <div className="flex items-center gap-3 px-2 py-2">
                           <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
                              {user.firstName?.charAt(0)?.toUpperCase()}
                           </div>
                           <div className="min-w-0">
                              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user.firstName}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{localStorage.getItem("role")}</p>
                           </div>
                           {localStorage.getItem("role") !== "instructor" && (
                              <Link to="/cart" onClick={() => setIsMenuOpen(false)} className="relative ml-auto p-2 text-gray-500 dark:text-gray-400">
                                 <FaShoppingCart size={16} />
                                 {cartCount > 0 && (
                                    <span className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center leading-none">
                                       {cartCount}
                                    </span>
                                 )}
                              </Link>
                           )}
                        </div>
                        <Link
                           to={`/dashboard/${localStorage.getItem("role")}`}
                           onClick={() => setIsMenuOpen(false)}
                           className="block w-full text-center py-2.5 rounded-xl text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                        >
                           Dashboard
                        </Link>
                        <button
                           onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                           className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition"
                        >
                           <FaSignOutAlt className="text-xs" /> Sign out
                        </button>
                     </div>
                  ) : (
                     <div className="space-y-2">
                        <Link
                           to="/login"
                           onClick={() => setIsMenuOpen(false)}
                           className="block w-full text-center py-2.5 rounded-xl text-sm font-medium border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                        >
                           Log in
                        </Link>
                        <Link
                           to="/register/student"
                           onClick={() => setIsMenuOpen(false)}
                           className="block w-full text-center py-2.5 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-md shadow-indigo-500/20 transition"
                        >
                           Sign Up
                        </Link>
                     </div>
                  )}
               </div>
            </div>
         </div>
      </>
   );
}
