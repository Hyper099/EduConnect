import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import API from '../utils/api';
import { toast } from '../utils/toast';

// ═══════════════════════════════════════════════════
// FLOATING LABEL INPUT
// ═══════════════════════════════════════════════════
function FloatingInput({ label, type = 'text', name, value, onChange, delay = 0 }) {
   const [focused, setFocused] = useState(false);
   const [visible, setVisible] = useState(false);
   const id = `auth-${name}`;
   const isActive = focused || (value && value.length > 0);

   useEffect(() => {
      const t = setTimeout(() => setVisible(true), delay);
      return () => clearTimeout(t);
   }, [delay]);

   return (
      <div
         className={`relative transition-all duration-500 ease-out ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
         }`}
      >
         <input
            id={id}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            required
            autoComplete={type === 'password' ? 'new-password' : name === 'email' ? 'email' : 'off'}
            className={`
               peer w-full px-4 pt-6 pb-2 rounded-xl border-2 bg-white/[0.04] text-white
               outline-none transition-all duration-300 text-[15px]
               ${focused
                  ? 'border-indigo-400/70 shadow-[0_0_25px_-5px_rgba(99,102,241,0.3)]'
                  : 'border-white/[0.08] hover:border-white/[0.15]'
               }
            `}
         />
         <label
            htmlFor={id}
            className={`
               absolute left-4 transition-all duration-300 pointer-events-none select-none
               ${isActive
                  ? 'top-1.5 text-[11px] font-semibold tracking-wide text-indigo-400'
                  : 'top-[14px] text-[15px] text-white/30'
               }
            `}
         >
            {label}
         </label>
      </div>
   );
}

// ═══════════════════════════════════════════════════
// SUBMIT BUTTON WITH LOADING SPINNER
// ═══════════════════════════════════════════════════
function SubmitButton({ text, loading, delay = 0 }) {
   const [visible, setVisible] = useState(false);

   useEffect(() => {
      const t = setTimeout(() => setVisible(true), delay);
      return () => clearTimeout(t);
   }, [delay]);

   return (
      <div className={`transition-all duration-500 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
         <button
            type="submit"
            disabled={loading}
            className={`
               group relative w-full py-3.5 rounded-xl font-semibold text-[15px] tracking-wide
               overflow-hidden transition-all duration-300 text-white
               ${loading
                  ? 'bg-indigo-500/50 cursor-wait'
                  : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 hover:shadow-[0_8px_30px_-5px_rgba(99,102,241,0.4)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-none'
               }
            `}
         >
            <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
            <span className="relative flex items-center justify-center gap-2">
               {loading && (
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
               )}
               {loading ? 'Please wait...' : text}
            </span>
         </button>
      </div>
   );
}

// ═══════════════════════════════════════════════════
// ROLE TOGGLE — STUDENT / INSTRUCTOR
// ═══════════════════════════════════════════════════
function RoleToggle({ role, onRoleChange, delay = 0 }) {
   const [visible, setVisible] = useState(false);

   useEffect(() => {
      const t = setTimeout(() => setVisible(true), delay);
      return () => clearTimeout(t);
   }, [delay]);

   return (
      <div className={`transition-all duration-500 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
         <div className="relative flex bg-white/[0.04] rounded-xl p-1 border border-white/[0.08]">
            <div
               className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-gradient-to-r from-indigo-600/80 to-violet-600/80 rounded-lg transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
               style={{ transform: role === 'student' ? 'translateX(4px)' : 'translateX(calc(100% + 4px))' }}
            />
            <button
               type="button"
               onClick={() => onRoleChange('student')}
               className={`relative z-10 flex-1 py-2.5 text-sm font-medium rounded-lg transition-colors duration-300 cursor-pointer ${
                  role === 'student' ? 'text-white' : 'text-white/40 hover:text-white/60'
               }`}
            >
               🎓 Student
            </button>
            <button
               type="button"
               onClick={() => onRoleChange('instructor')}
               className={`relative z-10 flex-1 py-2.5 text-sm font-medium rounded-lg transition-colors duration-300 cursor-pointer ${
                  role === 'instructor' ? 'text-white' : 'text-white/40 hover:text-white/60'
               }`}
            >
               📚 Instructor
            </button>
         </div>
      </div>
   );
}

// ═══════════════════════════════════════════════════
// DECORATIVE PANEL (slides between left ↔ right)
// ═══════════════════════════════════════════════════
function DecorativePanel({ isLogin, onSwitch }) {
   return (
      <div className="relative h-full w-full overflow-hidden rounded-3xl m-3">
         {/* Animated gradient base */}
         <div
            className="absolute inset-0"
            style={{
               background: 'linear-gradient(135deg, #3730a3 0%, #6d28d9 35%, #7c3aed 65%, #4338ca 100%)',
               backgroundSize: '300% 300%',
               animation: 'auth-gradient 12s ease infinite',
            }}
         />

         {/* Dot grid texture */}
         <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
               backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
               backgroundSize: '24px 24px',
            }}
         />

         {/* Floating shapes */}
         <div className="absolute inset-0">
            <div
               className="absolute w-52 h-52 rounded-full bg-indigo-300/[0.07] blur-3xl"
               style={{ top: '8%', left: '10%', animation: 'auth-float 16s ease-in-out infinite' }}
            />
            <div
               className="absolute w-28 h-28 rounded-full border-2 border-white/[0.07]"
               style={{ top: '22%', right: '12%', animation: 'auth-float-alt 12s ease-in-out infinite -2s' }}
            />
            <div
               className="absolute w-36 h-36 rounded-full bg-violet-400/[0.06] blur-2xl"
               style={{ bottom: '15%', left: '15%', animation: 'auth-float-alt 14s ease-in-out infinite -3s' }}
            />
            <div
               className="absolute w-4 h-4 rounded-full bg-cyan-300/25"
               style={{ top: '45%', left: '60%', animation: 'auth-float 8s ease-in-out infinite -1s' }}
            />
            <div
               className="absolute w-44 h-44 rounded-full border border-white/[0.04]"
               style={{ bottom: '5%', right: '10%', animation: 'auth-float 18s ease-in-out infinite -5s' }}
            />
            <div
               className="absolute w-16 h-16 rounded-lg bg-indigo-400/[0.06] rotate-45"
               style={{ top: '62%', left: '35%', animation: 'auth-float-alt 10s ease-in-out infinite -4s' }}
            />
            <div
               className="absolute w-2.5 h-2.5 rounded-full bg-white/20"
               style={{ top: '35%', left: '25%', animation: 'auth-float 6s ease-in-out infinite' }}
            />
            <div
               className="absolute w-2 h-2 rounded-full bg-white/15"
               style={{ top: '72%', right: '28%', animation: 'auth-float-alt 7s ease-in-out infinite -2s' }}
            />
            <div
               className="absolute w-3 h-3 rounded-full bg-cyan-200/15"
               style={{ top: '15%', left: '55%', animation: 'auth-float 9s ease-in-out infinite -6s' }}
            />
         </div>

         {/* Content */}
         <div className="relative z-10 flex flex-col items-center justify-center h-full px-12 text-center">
            {/* Logo icon */}
            <div
               className="w-16 h-16 mx-auto rounded-2xl bg-white/[0.08] backdrop-blur-sm flex items-center justify-center border border-white/[0.1] mb-6"
               style={{ animation: 'auth-fade-in 0.6s ease-out 0.3s both' }}
            >
               <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
               </svg>
            </div>

            {/* Dynamic heading */}
            <h2
               key={isLogin ? 'welcome' : 'join'}
               className="text-3xl font-bold text-white mb-3"
               style={{ animation: 'auth-fade-in 0.5s ease-out' }}
            >
               {isLogin ? 'Welcome Back!' : 'Join EduConnect'}
            </h2>
            <p
               key={isLogin ? 'desc-login' : 'desc-reg'}
               className="text-white/50 text-sm max-w-[280px] mx-auto leading-relaxed"
               style={{ animation: 'auth-fade-in 0.5s ease-out 0.1s both' }}
            >
               {isLogin
                  ? 'Sign in to continue your learning journey and access all your courses.'
                  : 'Create an account to explore thousands of courses and start learning today.'
               }
            </p>

            {/* Divider */}
            <div className="w-12 h-px bg-white/20 mx-auto my-8" />

            {/* CTA to switch */}
            <p className="text-white/35 text-sm mb-3">
               {isLogin ? "Don't have an account?" : 'Already have an account?'}
            </p>
            <button
               onClick={() => onSwitch(isLogin ? 'student' : 'login')}
               className="group px-8 py-2.5 rounded-xl border-2 border-white/20 text-white text-sm font-medium
                  hover:bg-white/10 hover:border-white/30 transition-all duration-300
                  hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
               {isLogin ? 'Create Account' : 'Sign In'}
               <span className="inline-block ml-1.5 transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>
         </div>
      </div>
   );
}

// ═══════════════════════════════════════════════════
// MOBILE DECORATIVE HEADER
// ═══════════════════════════════════════════════════
function MobileHeader({ isLogin }) {
   return (
      <div className="relative h-44 overflow-hidden flex-shrink-0">
         <div
            className="absolute inset-0"
            style={{
               background: 'linear-gradient(135deg, #3730a3, #6d28d9, #7c3aed)',
               backgroundSize: '200% 200%',
               animation: 'auth-gradient 10s ease infinite',
            }}
         />
         <div
            className="absolute w-36 h-36 rounded-full bg-white/[0.04] blur-2xl"
            style={{ top: '-15%', right: '-8%', animation: 'auth-float 10s ease-in-out infinite' }}
         />
         <div
            className="absolute w-20 h-20 rounded-full border-2 border-white/[0.06]"
            style={{ bottom: '10%', left: '8%', animation: 'auth-float-alt 8s ease-in-out infinite' }}
         />
         <div
            className="absolute w-3 h-3 rounded-full bg-cyan-300/20"
            style={{ top: '30%', left: '65%', animation: 'auth-float 6s ease-in-out infinite -2s' }}
         />
         <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
            <div className="w-12 h-12 rounded-xl bg-white/[0.08] backdrop-blur-sm flex items-center justify-center border border-white/[0.1] mb-3">
               <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
               </svg>
            </div>
            <h1 className="text-xl font-bold tracking-tight">EduConnect</h1>
            <p className="text-white/50 text-xs mt-0.5">
               {isLogin ? 'Welcome back to your learning journey' : 'Start your learning adventure'}
            </p>
         </div>
      </div>
   );
}

// ═══════════════════════════════════════════════════
// LOGIN FORM CONTENT
// ═══════════════════════════════════════════════════
function LoginFormContent({ data, setData, error, loading, onSubmit, onSwitch }) {
   const handleChange = (e) => setData((d) => ({ ...d, [e.target.name]: e.target.value }));

   return (
      <div className="w-full max-w-sm mx-auto">
         {/* Header */}
         <div className="mb-8">
            <h1
               className="text-3xl font-bold text-white mb-2"
               style={{ animation: 'auth-fade-in 0.5s ease-out' }}
            >
               Sign In
            </h1>
            <p
               className="text-white/35 text-sm"
               style={{ animation: 'auth-fade-in 0.5s ease-out 0.1s both' }}
            >
               Enter your credentials to access your account
            </p>
         </div>

         {/* Error */}
         {error && (
            <div
               className="mb-5 px-4 py-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm"
               style={{ animation: 'auth-fade-in 0.3s ease-out' }}
            >
               {error}
            </div>
         )}

         {/* Form */}
         <form onSubmit={onSubmit} className="space-y-4">
            <FloatingInput label="Email Address" type="email" name="email" value={data.email} onChange={handleChange} delay={200} />
            <FloatingInput label="Password" type="password" name="password" value={data.password} onChange={handleChange} delay={300} />

            <div className="pt-2">
               <SubmitButton text="Sign In" loading={loading} delay={400} />
            </div>
         </form>

         {/* Switch link (mobile + desktop fallback) */}
         <div className="mt-8 text-center" style={{ animation: 'auth-fade-in 0.5s ease-out 0.5s both' }}>
            <p className="text-white/25 text-sm">
               Don&apos;t have an account?{' '}
               <button
                  type="button"
                  onClick={() => onSwitch('student')}
                  className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors cursor-pointer"
               >
                  Create Account
               </button>
            </p>
         </div>
      </div>
   );
}

// ═══════════════════════════════════════════════════
// REGISTER FORM CONTENT
// ═══════════════════════════════════════════════════
function RegisterFormContent({ data, setData, role, onRoleChange, error, loading, onSubmit, onSwitch }) {
   const handleChange = (e) => setData((d) => ({ ...d, [e.target.name]: e.target.value }));

   // Password strength
   const pwLen = data.password?.length || 0;
   const strength = pwLen >= 12 ? 3 : pwLen >= 8 ? 2 : pwLen >= 6 ? 1 : 0;
   const strengthColors = ['bg-rose-400', 'bg-amber-400', 'bg-lime-400', 'bg-emerald-400'];
   const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong'];

   return (
      <div className="w-full max-w-sm mx-auto">
         {/* Header */}
         <div className="mb-6">
            <h1
               className="text-3xl font-bold text-white mb-2"
               style={{ animation: 'auth-fade-in 0.5s ease-out' }}
            >
               Create Account
            </h1>
            <p
               className="text-white/35 text-sm"
               style={{ animation: 'auth-fade-in 0.5s ease-out 0.1s both' }}
            >
               Fill in your details to get started
            </p>
         </div>

         {/* Error */}
         {error && (
            <div
               className="mb-4 px-4 py-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm"
               style={{ animation: 'auth-fade-in 0.3s ease-out' }}
            >
               {error}
            </div>
         )}

         {/* Form */}
         <form onSubmit={onSubmit} className="space-y-4">
            <RoleToggle role={role} onRoleChange={onRoleChange} delay={150} />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
               <FloatingInput label="First Name" name="firstName" value={data.firstName} onChange={handleChange} delay={250} />
               <FloatingInput label="Last Name" name="lastName" value={data.lastName} onChange={handleChange} delay={300} />
            </div>

            <FloatingInput label="Email Address" type="email" name="email" value={data.email} onChange={handleChange} delay={350} />

            <div>
               <FloatingInput label="Password" type="password" name="password" value={data.password} onChange={handleChange} delay={400} />
               {pwLen > 0 && (
                  <div className="flex items-center gap-2 mt-2 px-1">
                     <div className="flex-1 flex gap-1">
                        {[0, 1, 2, 3].map((i) => (
                           <div
                              key={i}
                              className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                                 i <= strength ? strengthColors[strength] : 'bg-white/[0.06]'
                              }`}
                           />
                        ))}
                     </div>
                     <span className="text-[10px] text-white/30 font-medium min-w-[34px] text-right">
                        {strengthLabels[strength]}
                     </span>
                  </div>
               )}
            </div>

            <div className="pt-1">
               <SubmitButton text="Create Account" loading={loading} delay={450} />
            </div>
         </form>

         {/* Switch link */}
         <div className="mt-6 text-center" style={{ animation: 'auth-fade-in 0.5s ease-out 0.55s both' }}>
            <p className="text-white/25 text-sm">
               Already have an account?{' '}
               <button
                  type="button"
                  onClick={() => onSwitch('login')}
                  className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors cursor-pointer"
               >
                  Sign In
               </button>
            </p>
         </div>
      </div>
   );
}

// ═══════════════════════════════════════════════════
// MAIN AUTH PAGE
// ═══════════════════════════════════════════════════
export default function AuthPage() {
   const location = useLocation();
   const navigate = useNavigate();

   const getInitialMode = () => {
      if (location.pathname.includes('/register/instructor')) return 'instructor';
      if (location.pathname.includes('/register')) return 'student';
      return 'login';
   };

   const [mode, setMode] = useState(getInitialMode);
   const [formKey, setFormKey] = useState(0);
   const [isAnimating, setIsAnimating] = useState(false);

   const isLogin = mode === 'login';

   // ── Login State ──
   const [loginData, setLoginData] = useState({ email: '', password: '' });
   const [loginLoading, setLoginLoading] = useState(false);
   const [loginError, setLoginError] = useState('');

   // ── Register State ──
   const [registerData, setRegisterData] = useState({ firstName: '', lastName: '', email: '', password: '' });
   const [registerRole, setRegisterRole] = useState(mode === 'instructor' ? 'instructor' : 'student');
   const [registerLoading, setRegisterLoading] = useState(false);
   const [registerError, setRegisterError] = useState('');

   // ── Mode Switch ──
   const switchMode = (newMode) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setMode(newMode);
      setFormKey((k) => k + 1);
      setLoginError('');
      setRegisterError('');

      // Update URL without React Router navigation (prevents unmount/remount)
      const url =
         newMode === 'login' ? '/login'
            : newMode === 'instructor' ? '/register/instructor'
               : '/register/student';
      window.history.replaceState(null, '', url);

      if (newMode === 'instructor') setRegisterRole('instructor');
      else if (newMode === 'student') setRegisterRole('student');

      setTimeout(() => setIsAnimating(false), 800);
   };

   // ── Role change within register form ──
   const handleRoleChange = (newRole) => {
      setRegisterRole(newRole);
      setMode(newRole); // 'student' or 'instructor'
      const url = newRole === 'instructor' ? '/register/instructor' : '/register/student';
      window.history.replaceState(null, '', url);
   };

   // ── Login Handler ──
   const handleLogin = async (e) => {
      e.preventDefault();
      if (!loginData.email || !loginData.password) {
         setLoginError('All fields are required');
         return;
      }
      setLoginLoading(true);
      setLoginError('');
      try {
         const res = await API.post('/auth/login', loginData);
         const { token, role } = res.data;
         localStorage.setItem('token', token);
         localStorage.setItem('role', role);
         toast.success('Logged in successfully!');
         navigate(role === 'student' ? '/dashboard/student' : '/dashboard/instructor');
      } catch (err) {
         setLoginError(err.response?.data?.message || 'Invalid email or password');
      } finally {
         setLoginLoading(false);
      }
   };

   // ── Register Handler ──
   const handleRegister = async (e) => {
      e.preventDefault();
      const { firstName, lastName, email, password } = registerData;
      if (!firstName || !lastName || !email || !password) {
         setRegisterError('All fields are required');
         return;
      }
      setRegisterLoading(true);
      setRegisterError('');
      try {
         const endpoint = registerRole === 'instructor' ? '/instructor/signup' : '/student/signup';
         const res = await API.post(endpoint, registerData);
         toast.success(res.data.message || 'Registration successful!');
         setRegisterData({ firstName: '', lastName: '', email: '', password: '' });
         setTimeout(() => switchMode('login'), 1500);
      } catch (err) {
         setRegisterError(err.response?.data?.error || 'Registration failed. Please try again.');
      } finally {
         setRegisterLoading(false);
      }
   };

   return (
      <div
         className="min-h-screen bg-slate-950 relative overflow-hidden"
         style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
         {/* Subtle ambient background */}
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.08),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(139,92,246,0.06),transparent_50%)]" />

         {/* ─────────── MOBILE LAYOUT ─────────── */}
         <div className="flex flex-col min-h-screen lg:hidden">
            <MobileHeader isLogin={isLogin} />

            <div className="flex-1 flex items-start justify-center px-5 py-8 relative z-10">
               <div key={formKey} className="w-full" style={{ animation: 'auth-fade-in 0.5s ease-out' }}>
                  {isLogin ? (
                     <LoginFormContent
                        data={loginData}
                        setData={setLoginData}
                        error={loginError}
                        loading={loginLoading}
                        onSubmit={handleLogin}
                        onSwitch={switchMode}
                     />
                  ) : (
                     <RegisterFormContent
                        data={registerData}
                        setData={setRegisterData}
                        role={registerRole}
                        onRoleChange={handleRoleChange}
                        error={registerError}
                        loading={registerLoading}
                        onSubmit={handleRegister}
                        onSwitch={switchMode}
                     />
                  )}
               </div>
            </div>
         </div>

         {/* ─────────── DESKTOP LAYOUT ─────────── */}
         <div className="hidden lg:block relative min-h-screen">
            {/* Form layers (both always in DOM for smooth transitions) */}
            <div className="absolute inset-0 flex">
               {/* LEFT half → Register form (visible when panel covers RIGHT) */}
               <div
                  className={`w-1/2 flex items-center justify-center p-12 transition-all duration-[600ms] ease-out ${
                     !isLogin
                        ? 'opacity-100 translate-x-0 delay-200'
                        : 'opacity-0 -translate-x-8 pointer-events-none'
                  }`}
               >
                  <div key={`reg-${formKey}`} className="w-full max-w-md">
                     <RegisterFormContent
                        data={registerData}
                        setData={setRegisterData}
                        role={registerRole}
                        onRoleChange={handleRoleChange}
                        error={registerError}
                        loading={registerLoading}
                        onSubmit={handleRegister}
                        onSwitch={switchMode}
                     />
                  </div>
               </div>

               {/* RIGHT half → Login form (visible when panel covers LEFT) */}
               <div
                  className={`w-1/2 flex items-center justify-center p-12 transition-all duration-[600ms] ease-out ${
                     isLogin
                        ? 'opacity-100 translate-x-0 delay-200'
                        : 'opacity-0 translate-x-8 pointer-events-none'
                  }`}
               >
                  <div key={`login-${formKey}`} className="w-full max-w-md">
                     <LoginFormContent
                        data={loginData}
                        setData={setLoginData}
                        error={loginError}
                        loading={loginLoading}
                        onSubmit={handleLogin}
                        onSwitch={switchMode}
                     />
                  </div>
               </div>
            </div>

            {/* ── Sliding Decorative Overlay ── */}
            <div
               className={`absolute top-0 h-full w-1/2 z-20 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                  isLogin ? 'translate-x-0' : 'translate-x-full'
               }`}
            >
               <DecorativePanel isLogin={isLogin} onSwitch={switchMode} />
            </div>
         </div>
      </div>
   );
}
