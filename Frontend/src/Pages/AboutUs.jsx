
export default function AboutUs() {
   return (
      <section className="text-gray-600 dark:text-gray-400 body-font bg-gray-50 dark:bg-gray-900">
         {/* Hero Section */}
         <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
            <div className="text-center lg:w-2/3 w-full">
               <h1 className="title-font sm:text-4xl text-3xl mb-4 font-bold text-gray-900 dark:text-white">
                  Empowering Education For Everyone
               </h1>
               <p className="mb-8 leading-relaxed text-lg text-gray-600 dark:text-gray-400">
                  We're on a mission to create a world where anyone can learn anything they want, anywhere, anytime. By connecting students to the best instructors around the globe, we help people reach their goals and pursue their dreams.
               </p>
               <div className="flex justify-center">
                  <button className="inline-flex text-white bg-indigo-600 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-700 rounded-lg text-lg transition-colors">
                     Explore Courses
                  </button>
                  <button className="ml-4 inline-flex text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-700 border-0 py-2 px-6 focus:outline-none hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg text-lg transition-colors">
                     Meet Our Team
                  </button>
               </div>
            </div>
         </div>

         {/* Our Story Section */}
         <div className="container px-5 py-12 mx-auto">
            <div className="flex flex-col text-center w-full mb-20">
               <h2 className="text-3xl font-bold title-font mb-4 text-gray-900 dark:text-white">Our Story</h2>
               <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-600 dark:text-gray-400">
                  Founded in 2018, our platform began as a small collection of programming tutorials. Today, we've grown into a comprehensive learning ecosystem with thousands of courses across dozens of categories, serving millions of students worldwide.
               </p>
            </div>
            <div className="flex flex-wrap -m-4">
               {/* Timeline Item 1 */}
               <div className="p-4 md:w-1/3 flex">
                  <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 flex-shrink-0 mb-4">
                     <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                        <path d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                     </svg>
                  </div>
                  <div className="flex-grow pl-6">
                     <h2 className="text-gray-900 dark:text-white text-lg title-font font-medium mb-2">2018: The Beginning</h2>
                     <p className="leading-relaxed text-base text-gray-600 dark:text-gray-400">
                        Started with 5 courses and 200 students in our first month. Our focus was exclusively on programming courses.
                     </p>
                  </div>
               </div>
               {/* Timeline Item 2 */}
               <div className="p-4 md:w-1/3 flex">
                  <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 flex-shrink-0 mb-4">
                     <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                        <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10m-4-10h8"></path>
                     </svg>
                  </div>
                  <div className="flex-grow pl-6">
                     <h2 className="text-gray-900 dark:text-white text-lg title-font font-medium mb-2">2020: Growth & Expansion</h2>
                     <p className="leading-relaxed text-base text-gray-600 dark:text-gray-400">
                        Expanded to 500+ courses across 10 categories, serving over 50,000 students. Introduced our mobile app and community forums.
                     </p>
                  </div>
               </div>
               {/* Timeline Item 3 */}
               <div className="p-4 md:w-1/3 flex">
                  <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 flex-shrink-0 mb-4">
                     <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                     </svg>
                  </div>
                  <div className="flex-grow pl-6">
                     <h2 className="text-gray-900 dark:text-white text-lg title-font font-medium mb-2">Today: Leading Education</h2>
                     <p className="leading-relaxed text-base text-gray-600 dark:text-gray-400">
                        Now offers 2,000+ courses across 50+ categories, with millions of students in over 190 countries. Our instructor network includes 5,000+ experts.
                     </p>
                  </div>
               </div>
            </div>
         </div>

         {/* Mission & Values Section */}
         <div className="container px-5 py-24 mx-auto">
            <div className="text-center mb-20">
               <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Mission & Values</h2>
               <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-600 dark:text-gray-400">
                  We believe in the transformative power of education. Our mission is to create a more skilled and educated global workforce.
               </p>
            </div>
            <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
               {/* Value Item 1 */}
               <div className="p-2 sm:w-1/2 w-full">
                  <div className="bg-white dark:bg-gray-800 rounded flex p-4 h-full items-center shadow-md">
                     <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" className="text-indigo-600 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                        <path d="M22 4L12 14.01l-3-3"></path>
                     </svg>
                     <span className="title-font font-medium text-gray-900 dark:text-white">Accessibility For All</span>
                  </div>
               </div>
               {/* Value Item 2 */}
               <div className="p-2 sm:w-1/2 w-full">
                  <div className="bg-white dark:bg-gray-800 rounded flex p-4 h-full items-center shadow-md">
                     <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" className="text-indigo-600 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                        <path d="M22 4L12 14.01l-3-3"></path>
                     </svg>
                     <span className="title-font font-medium text-gray-900 dark:text-white">Excellence In Teaching</span>
                  </div>
               </div>
               {/* Value Item 3 */}
               <div className="p-2 sm:w-1/2 w-full">
                  <div className="bg-white dark:bg-gray-800 rounded flex p-4 h-full items-center shadow-md">
                     <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" className="text-indigo-600 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                        <path d="M22 4L12 14.01l-3-3"></path>
                     </svg>
                     <span className="title-font font-medium text-gray-900 dark:text-white">Innovation In Learning</span>
                  </div>
               </div>
               {/* Value Item 4 */}
               <div className="p-2 sm:w-1/2 w-full">
                  <div className="bg-white dark:bg-gray-800 rounded flex p-4 h-full items-center shadow-md">
                     <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" className="text-indigo-600 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                        <path d="M22 4L12 14.01l-3-3"></path>
                     </svg>
                     <span className="title-font font-medium text-gray-900 dark:text-white">Student Success First</span>
                  </div>
               </div>
            </div>
         </div>

         {/* Team Section */}
         <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-col text-center w-full mb-20">
               <h2 className="text-3xl font-bold title-font mb-4 text-gray-900 dark:text-white">Our Leadership Team</h2>
               <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-600 dark:text-gray-400">
                  Meet the passionate team behind our mission to transform education and empower learners worldwide.
               </p>
            </div>
            <div className="flex flex-wrap -m-4">
               {/* Team Member 1 */}
               <div className="p-4 lg:w-1/4 md:w-1/2">
                  <div className="h-full flex flex-col items-center text-center">
                     <div className="w-32 h-32 mb-4 bg-indigo-100 dark:bg-indigo-900/40 rounded-full flex items-center justify-center">
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" className="w-12 h-12 text-indigo-600" viewBox="0 0 24 24">
                           <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                           <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                     </div>
                     <div className="w-full">
                        <h2 className="title-font font-medium text-lg text-gray-900 dark:text-white">Sarah Johnson</h2>
                        <h3 className="text-gray-500 dark:text-gray-400 mb-3">Chief Executive Officer</h3>
                        <p className="mb-4 text-gray-600 dark:text-gray-400">Former education policy advisor with 15+ years of experience in EdTech.</p>
                        <span className="inline-flex">
                           <a className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 cursor-pointer">
                              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                 <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                              </svg>
                           </a>
                           <a className="ml-2 text-gray-500 dark:text-gray-400 hover:text-indigo-600 cursor-pointer">
                              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                 <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                              </svg>
                           </a>
                           <a className="ml-2 text-gray-500 dark:text-gray-400 hover:text-indigo-600 cursor-pointer">
                              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                 <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                              </svg>
                           </a>
                        </span>
                     </div>
                  </div>
               </div>
               {/* Team Member 2 */}
               <div className="p-4 lg:w-1/4 md:w-1/2">
                  <div className="h-full flex flex-col items-center text-center">
                     <div className="w-32 h-32 mb-4 bg-indigo-100 dark:bg-indigo-900/40 rounded-full flex items-center justify-center">
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" className="w-12 h-12 text-indigo-600" viewBox="0 0 24 24">
                           <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                           <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                     </div>
                     <div className="w-full">
                        <h2 className="title-font font-medium text-lg text-gray-900 dark:text-white">David Rodriguez</h2>
                        <h3 className="text-gray-500 dark:text-gray-400 mb-3">Chief Technology Officer</h3>
                        <p className="mb-4 text-gray-600 dark:text-gray-400">Previously led engineering teams at top tech companies for</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}