import { lazy, Suspense } from 'react';
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import Navbar from './Common/Navbar';
import ErrorBoundary from './Components/ErrorBoundary';
import ToastContainer from './Components/Toast';
import { CartProvider } from './Context/CartContext';
import { ThemeProvider } from './Context/ThemeContext';

// Lazy-loaded route components for code splitting
const AboutUs = lazy(() => import('./Pages/AboutUs'));
const Cart = lazy(() => import('./Pages/Cart'));
const ContactUs = lazy(() => import('./Pages/ContactUs'));
const Courses = lazy(() => import('./Pages/Courses/Course1'));
const InstructorDashboard = lazy(() => import('./Pages/Dashboards/InstructorDashboard'));
const StudentDashboard = lazy(() => import('./Pages/Dashboards/StudentDashboard'));
const LandingPage = lazy(() => import('./Pages/LandingPage'));
const AuthPage = lazy(() => import('./Pages/AuthPage'));
const PageNotFound = lazy(() => import('./Pages/PageNotFound'));
const ProfilePage = lazy(() => import('./Pages/ProfilePage'));

const PageLoader = () => (
  <div className="flex justify-center items-center min-h-screen dark:bg-gray-900">
    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
  </div>
);

function App() {
  const location = useLocation();
  const hideNavbarRoutes = ['/register/student', '/register/instructor', '/login'];

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register/student" element={<AuthPage />} />
          <Route path="/register/instructor" element={<AuthPage />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/dashboard/student" element={<StudentDashboard />} />
          <Route path="/dashboard/instructor" element={<InstructorDashboard />} />
          <Route path='/contact' element={<ContactUs />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <ThemeProvider>
        <CartProvider>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
          <ToastContainer />
        </CartProvider>
      </ThemeProvider>
    </Router>
  );
}
