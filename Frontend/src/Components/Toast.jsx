import { useCallback, useEffect, useState } from 'react';
import { subscribeToast } from '../utils/toast';

const ICONS = {
   success: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
   ),
   error: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
   ),
   warning: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
   ),
   info: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
   ),
};

const STYLES = {
   success: 'bg-green-50 dark:bg-green-900/40 text-green-800 dark:text-green-300 border-green-200 dark:border-green-700',
   error: 'bg-red-50 dark:bg-red-900/40 text-red-800 dark:text-red-300 border-red-200 dark:border-red-700',
   warning: 'bg-yellow-50 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-700',
   info: 'bg-blue-50 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-700',
};

function ToastItem({ toast: t, onRemove }) {
   const [isExiting, setIsExiting] = useState(false);

   useEffect(() => {
      const timer = setTimeout(() => {
         setIsExiting(true);
         setTimeout(() => onRemove(t.id), 300);
      }, t.duration);
      return () => clearTimeout(timer);
   }, [t, onRemove]);

   return (
      <div
         className={`flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg max-w-sm w-full transition-all duration-300 ${
            isExiting ? 'opacity-0 translate-x-full' : 'opacity-100 translate-x-0'
         } ${STYLES[t.type]}`}
      >
         <span className="flex-shrink-0">{ICONS[t.type]}</span>
         <p className="text-sm font-medium flex-1">{t.message}</p>
         <button
            onClick={() => {
               setIsExiting(true);
               setTimeout(() => onRemove(t.id), 300);
            }}
            className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity"
         >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
         </button>
      </div>
   );
}

export default function ToastContainer() {
   const [toasts, setToasts] = useState([]);

   useEffect(() => {
      return subscribeToast((newToast) => {
         setToasts((prev) => [...prev, newToast]);
      });
   }, []);

   const removeToast = useCallback((id) => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
   }, []);

   if (toasts.length === 0) return null;

   return (
      <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2">
         {toasts.map((t) => (
            <ToastItem key={t.id} toast={t} onRemove={removeToast} />
         ))}
      </div>
   );
}
