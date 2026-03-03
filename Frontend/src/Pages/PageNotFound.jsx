import { Link } from 'react-router-dom';

export default function PageNotFound() {
   return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-6">
         <div className="text-center max-w-lg">
            <div className="mb-8">
               <span className="text-9xl font-bold text-indigo-600 dark:text-indigo-400">404</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
               Page Not Found
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
               Sorry, the page you're looking for doesn't exist or has been moved.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
               <Link
                  to="/"
                  className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
               >
                  Go Home
               </Link>
               <Link
                  to="/courses"
                  className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-medium"
               >
                  Browse Courses
               </Link>
            </div>
         </div>
      </main>
   );
}
