import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../utils/api";

export default function StudentDashboard() {
   const [enrolledCourses, setEnrolledCourses] = useState([]);
   const [stats, setStats] = useState({
      completedCourses: 0,
      inProgressCourses: 0,
      totalHoursLearned: 0,
      certificatesEarned: 0,
   });
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState("");

   const navigate = useNavigate();
   const navigateToCart = () => {
      navigate('/cart');
   };

   useEffect(() => {
      const fetchData = async () => {
         try {
            const token = localStorage.getItem("token");

            const [enrolledResponse, statsResponse] =
               await Promise.all([
                  API.get("/student/course/enrolled", {
                     headers: { token },
                  }),
                  API.get("/student/stats", {
                     headers: { token },
                  }),
               ]);
            setEnrolledCourses(enrolledResponse.data);
            setStats(statsResponse.data);
         } catch (err) {
            setError("Failed to load dashboard data", err);
         } finally {
            setLoading(false);
         }
      };

      fetchData();
   }, []);

   const calculateProgress = (completedLessons, totalLessons) =>
      totalLessons > 0
         ? Math.round((completedLessons / totalLessons) * 100)
         : 0;

   if (loading) {
      return (
         <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
         </div>
      );
   }

   // Stats Data (for mapping)
   const statsData = [
      { label: "Completed Courses", value: stats.completedCourses, color: "text-green-600" },
      { label: "In Progress", value: stats.inProgressCourses, color: "text-blue-600" },
      { label: "Certificates", value: stats.certificatesEarned, color: "text-yellow-600" },
   ];

   // Error Message UI
   const errorMessage = error && (
      <div className="bg-red-100 dark:bg-red-900/30 border-l-4 border-red-500 text-red-700 dark:text-red-400 p-4 mb-4" role="alert">
         {error}
      </div>
   );

   return (
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
         <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
               <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Student Dashboard</h1>
               {/* <button
                  onClick={navigateToCart}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded flex items-center"
               >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  View Cart
               </button> */}
            </div>

            {errorMessage}

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
               {statsData.map((stat, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                     <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
                        {stat.label}
                     </h3>
                     <p className={`text-3xl font-bold ${stat.color}`}>
                        {stat.value}
                     </p>
                  </div>
               ))}
            </div>



            {/* Enrolled Courses */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
               <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Your Enrolled Courses</h2>
               {enrolledCourses.length === 0 ? (
                  <p className="text-gray-600 dark:text-gray-400">You are not enrolled in any courses yet.</p>
               ) : (
                  <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                     {enrolledCourses.map((course, index) => (
                        <li key={index} className="py-4">
                           <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">{course.title}</h3>
                           <p className="text-sm text-gray-500 dark:text-gray-400">{course.instructor}</p>
                           <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-2">
                              <div
                                 className="bg-indigo-600 h-2.5 rounded-full"
                                 style={{ width: `${calculateProgress(course.completed_lessons, course.total_lessons)}%` }}
                              ></div>
                           </div>
                           <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {calculateProgress(course.completed_lessons, course.total_lessons)}% completed
                           </p>
                        </li>
                     ))}
                  </ul>
               )}
            </div>

            {/* Footer */}
            <footer className="text-center py-4 text-gray-500 dark:text-gray-400 text-sm">
               © 2025 Your E-Learning Platform. All rights reserved.
            </footer>
         </div>
      </div>
   );
}
