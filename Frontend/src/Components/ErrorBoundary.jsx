import { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ErrorBoundary extends Component {
   constructor(props) {
      super(props);
      this.state = { hasError: false, error: null };
   }

   static getDerivedStateFromError(error) {
      return { hasError: true, error };
   }

   componentDidCatch(error, errorInfo) {
      console.error('ErrorBoundary caught:', error, errorInfo);
   }

   render() {
      if (this.state.hasError) {
         return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
               <div className="text-center max-w-md">
                  <div className="text-6xl mb-4">⚠️</div>
                  <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                     Something went wrong
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                     An unexpected error occurred. Please try refreshing the page.
                  </p>
                  <div className="flex gap-3 justify-center">
                     <button
                        onClick={() => window.location.reload()}
                        className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition font-medium"
                     >
                        Refresh Page
                     </button>
                     <Link
                        to="/"
                        onClick={() => this.setState({ hasError: false, error: null })}
                        className="px-5 py-2.5 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg transition font-medium"
                     >
                        Go Home
                     </Link>
                  </div>
               </div>
            </div>
         );
      }

      return this.props.children;
   }
}
