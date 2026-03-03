import { Award, BookOpen, Briefcase, Calendar, DollarSign, Mail, MapPin, Phone, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import API from '../utils/api';

const ProfilePage = () => {
   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const navigate = useNavigate();
   const role = localStorage.getItem('role');

   useEffect(() => {
      const fetchUserProfile = async () => {
         const token = localStorage.getItem('token');
         const role = localStorage.getItem('role');

         if (!token || !role) {
            navigate('/login');
            return;
         }

         try {
            setLoading(true);
            const response = await API.get(`/${role}/details`, {
               headers: { token }
            });
            setUser(response.data);
         } catch (err) {
            setError('Failed to load profile. Please try again later.');
            console.error('Error fetching user details:', err);
         } finally {
            setLoading(false);
         }
      };

      fetchUserProfile();
   }, [navigate]);

   if (loading) {
      return (
         <div className="flex flex-col justify-center items-center h-screen space-y-4 dark:bg-gray-900">
            <div className="w-16 h-16 border-4 border-indigo-400 border-t-indigo-600 rounded-full animate-spin"></div>
            <div className="text-xl font-semibold text-gray-700 dark:text-gray-300">Loading profile...</div>
         </div>
      );
   }

   if (error) {
      return (
         <div className="container mx-auto px-4 py-8">
            <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-400 px-4 py-3 rounded mb-4">
               {error}
            </div>
            <button
               onClick={() => window.location.reload()}
               className="bg-indigo-600 text-white px-4 py-2 rounded"
            >
               Try Again
            </button>
         </div>
      );
   }

   if (!user) return null;

   return (
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
         <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-6">
               {/* Sidebar */}
               <div className="md:w-1/4">
                  <ProfileSidebar user={user} role={role} />
               </div>

               {/* Main Content */}
               <div className="md:w-3/4">
                  {role === 'student' ? (
                     <StudentDashboard user={user} />
                  ) : (
                     <InstructorDashboard user={user} />
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};

const ProfileSidebar = ({ user, role }) => {
   // Dummy instructor description if needed
   const instructorDescription = role === 'instructor'
      ? "Passionate educator with over 8 years of experience in teaching and curriculum development. Specializing in interactive learning and student engagement techniques."
      : "";

   return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
         <div className="flex flex-col items-center text-center mb-6">
            <div className="w-32 h-32 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mb-4">
               {user.profileImage ? (
                  <img
                     src={user.profileImage}
                     alt={user.name}
                     className="w-32 h-32 rounded-full object-cover"
                  />
               ) : (
                  <span className="text-indigo-600 text-4xl font-bold">
                     {user.name?.charAt(0) || "U"}
                  </span>
               )}
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{user.name}</h2>
            <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 px-3 py-1 rounded-full text-sm font-medium mt-2 capitalize">
               {role}
            </span>
         </div>

         {role === 'instructor' && instructorDescription && (
            <div className="mb-6">
               <h3 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-2">About</h3>
               <p className="text-gray-600 dark:text-gray-400 text-sm">{instructorDescription}</p>
            </div>
         )}

         <div className="space-y-4">
            <div className="flex items-center">
               <Mail size={18} className="text-gray-500 dark:text-gray-400 mr-3" />
               <span className="text-gray-700 dark:text-gray-300 text-sm">{user.email}</span>
            </div>

            {user.phone && (
               <div className="flex items-center">
                  <Phone size={18} className="text-gray-500 dark:text-gray-400 mr-3" />
                  <span className="text-gray-700 dark:text-gray-300 text-sm">{user.phone}</span>
               </div>
            )}

            {user.location && (
               <div className="flex items-center">
                  <MapPin size={18} className="text-gray-500 dark:text-gray-400 mr-3" />
                  <span className="text-gray-700 dark:text-gray-300 text-sm">{user.location}</span>
               </div>
            )}

            {role === 'instructor' && user.expertise && (
               <div className="flex items-center">
                  <Briefcase size={18} className="text-gray-500 dark:text-gray-400 mr-3" />
                  <span className="text-gray-700 dark:text-gray-300 text-sm">{user.expertise}</span>
               </div>
            )}

            {role === 'student' && user.major && (
               <div className="flex items-center">
                  <BookOpen size={18} className="text-gray-500 dark:text-gray-400 mr-3" />
                  <span className="text-gray-700 dark:text-gray-300 text-sm">{user.major}</span>
               </div>
            )}
         </div>

         <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition duration-200">
               Edit Profile
            </button>
         </div>
      </div>
   );
};

const InstructorDashboard = ({ user }) => {
   // Dummy data for instructor dashboard
   const revenueData = [
      { month: 'Jan', revenue: 2400 },
      { month: 'Feb', revenue: 3600 },
      { month: 'Mar', revenue: 2800 },
      { month: 'Apr', revenue: 4200 },
      { month: 'May', revenue: 5100 },
      { month: 'Jun', revenue: 4800 },
   ];

   const studentEnrollmentData = [
      { month: 'Jan', students: 15 },
      { month: 'Feb', students: 23 },
      { month: 'Mar', students: 18 },
      { month: 'Apr', students: 29 },
      { month: 'May', students: 35 },
      { month: 'Jun', students: 32 },
   ];

   const metrics = [
      {
         title: 'Total Revenue',
         value: '$12,480',
         icon: <DollarSign size={24} className="text-green-500" />,
         bgColor: 'bg-green-50 dark:bg-green-900/20'
      },
      {
         title: 'Active Students',
         value: '152',
         icon: <Users size={24} className="text-blue-500" />,
         bgColor: 'bg-blue-50 dark:bg-blue-900/20'
      },
      {
         title: 'Courses',
         value: '8',
         icon: <BookOpen size={24} className="text-purple-500" />,
         bgColor: 'bg-purple-50 dark:bg-purple-900/20'
      }
   ];

   return (
      <div className="space-y-6">
         <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Instructor Profile</h1>

         {/* Metrics */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {metrics.map((metric, index) => (
               <div key={index} className={`${metric.bgColor} p-6 rounded-lg shadow-sm`}>
                  <div className="flex justify-between items-center">
                     <div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">{metric.title}</p>
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{metric.value}</h3>
                     </div>
                     <div className="p-3 rounded-full bg-white dark:bg-gray-700 shadow-sm">
                        {metric.icon}
                     </div>
                  </div>
               </div>
            ))}
         </div>

         {/* Charts */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
               <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Revenue Overview</h3>
               <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={revenueData}>
                     <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                     <XAxis dataKey="month" stroke="#9CA3AF" />
                     <YAxis stroke="#9CA3AF" />
                     <Tooltip />
                     <Line type="monotone" dataKey="revenue" stroke="#4F46E5" strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
               </ResponsiveContainer>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
               <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Student Enrollment</h3>
               <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={studentEnrollmentData}>
                     <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                     <XAxis dataKey="month" stroke="#9CA3AF" />
                     <YAxis stroke="#9CA3AF" />
                     <Tooltip />
                     <Line type="monotone" dataKey="students" stroke="#8B5CF6" strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* Recent Courses */}
         <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
               <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Recent Courses</h3>
               <button className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 text-sm font-medium">View All</button>
            </div>
            <div className="overflow-x-auto">
               <table className="min-w-full">
                  <thead>
                     <tr className="bg-gray-50 dark:bg-gray-700">
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Course Name</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Students</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Completion Rate</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Revenue</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                     <tr>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-white">Advanced Web Development</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">42</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">78%</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">$3,850</td>
                     </tr>
                     <tr>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-white">React for Beginners</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">68</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">92%</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">$5,240</td>
                     </tr>
                     <tr>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-white">UX/UI Fundamentals</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">35</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">65%</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">$2,450</td>
                     </tr>
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   );
};

const StudentDashboard = ({ user }) => {
   // Dummy data for student dashboard
   const progressData = [
      { course: 'React', completed: 75 },
      { course: 'Node.js', completed: 45 },
      { course: 'CSS', completed: 90 },
      { course: 'UX Design', completed: 30 }
   ];

   const activityData = [
      { month: 'Jan', hours: 12 },
      { month: 'Feb', hours: 19 },
      { month: 'Mar', hours: 15 },
      { month: 'Apr', hours: 25 },
      { month: 'May', hours: 22 },
      { month: 'Jun', hours: 30 },
   ];

   const metrics = [
      {
         title: 'Courses Enrolled',
         value: '5',
         icon: <BookOpen size={24} className="text-indigo-500" />,
         bgColor: 'bg-indigo-50 dark:bg-indigo-900/20'
      },
      {
         title: 'Completed Courses',
         value: '3',
         icon: <Award size={24} className="text-green-500" />,
         bgColor: 'bg-green-50 dark:bg-green-900/20'
      },
      {
         title: 'Study Hours',
         value: '124',
         icon: <Calendar size={24} className="text-blue-500" />,
         bgColor: 'bg-blue-50 dark:bg-blue-900/20'
      }
   ];

   return (
      <div className="space-y-6">
         <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Student Dashboard</h1>

         {/* Metrics */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {metrics.map((metric, index) => (
               <div key={index} className={`${metric.bgColor} p-6 rounded-lg shadow-sm`}>
                  <div className="flex justify-between items-center">
                     <div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">{metric.title}</p>
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{metric.value}</h3>
                     </div>
                     <div className="p-3 rounded-full bg-white dark:bg-gray-700 shadow-sm">
                        {metric.icon}
                     </div>
                  </div>
               </div>
            ))}
         </div>

         {/* Learning Activity */}
         <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Learning Activity</h3>
            <ResponsiveContainer width="100%" height={300}>
               <LineChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip />
                  <Line type="monotone" dataKey="hours" stroke="#4F46E5" strokeWidth={2} dot={{ r: 4 }} />
               </LineChart>
            </ResponsiveContainer>
         </div>

         {/* Course Progress */}
         <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
               <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Course Progress</h3>
               <button className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 text-sm font-medium">View All Courses</button>
            </div>
            <div className="space-y-6">
               {progressData.map((course, index) => (
                  <div key={index} className="space-y-2">
                     <div className="flex justify-between items-center">
                        <span className="text-gray-700 dark:text-gray-300 font-medium">{course.course}</span>
                        <span className="text-gray-600 dark:text-gray-400 text-sm">{course.completed}%</span>
                     </div>
                     <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                           className="bg-indigo-600 h-2 rounded-full"
                           style={{ width: `${course.completed}%` }}
                        ></div>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* Upcoming Deadlines */}
         <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
               <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Upcoming Deadlines</h3>
               <button className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 text-sm font-medium">View Calendar</button>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
               <div className="py-4">
                  <div className="flex justify-between">
                     <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">Final Project Submission</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">React for Beginners</p>
                     </div>
                     <div className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 px-3 py-1 rounded-full text-xs font-medium self-start">
                        2 days left
                     </div>
                  </div>
               </div>
               <div className="py-4">
                  <div className="flex justify-between">
                     <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">Module 3 Quiz</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">UX Design Basics</p>
                     </div>
                     <div className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 px-3 py-1 rounded-full text-xs font-medium self-start">
                        5 days left
                     </div>
                  </div>
               </div>
               <div className="py-4">
                  <div className="flex justify-between">
                     <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">Group Presentation</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">Advanced CSS Techniques</p>
                     </div>
                     <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-3 py-1 rounded-full text-xs font-medium self-start">
                        2 weeks left
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ProfilePage;