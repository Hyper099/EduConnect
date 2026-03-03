import { Book, Clock, Search, Sliders, Users, X } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useCart } from '../../Context/CartContext';
import API from '../../utils/api';
import { toast } from '../../utils/toast';

export default function CoursesPage() {
   const [courses, setCourses] = useState([]);
   const [searchTerm, setSearchTerm] = useState('');
   const [selectedCourse, setSelectedCourse] = useState(null);
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState(null);
   const [enrolledCourses, setEnrolledCourses] = useState([]);
   const [cart, setCart] = useState([]);
   const [sidebarOpen, setSidebarOpen] = useState(false);

   // Filter states
   const [categoryFilters, setCategoryFilters] = useState([]);
   const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
   const [levelFilters, setLevelFilters] = useState([]);
   const [sortOption, setSortOption] = useState('popular');

   const levels = ['Beginner', 'Intermediate', 'Advanced'];

   const { fetchCartCount } = useCart();

   // Derive unique categories from fetched courses
   const categories = useMemo(() => {
      const cats = courses.map(c => c.category).filter(Boolean);
      return [...new Set(cats)].sort();
   }, [courses]);

   // Derive max price from courses
   const maxPrice = useMemo(() => {
      if (courses.length === 0) return 10000;
      return Math.ceil(Math.max(...courses.map(c => Number(c.price) || 0)) / 100) * 100 || 10000;
   }, [courses]);

   // Fetch all courses
   useEffect(() => {
      const fetchCourses = async () => {
         try {
            const response = await API.get('/course');
            setCourses(response.data);
            const max = Math.ceil(Math.max(...response.data.map(c => Number(c.price) || 0)) / 100) * 100 || 10000;
            setPriceRange(prev => ({ ...prev, max }));
         } catch (err) {
            console.error('Error fetching courses:', err);
            setError('Failed to load courses. Please try again later.');
         } finally {
            setIsLoading(false);
         }
      };
      fetchCourses();
   }, []);

   // Fetch enrolled courses
   useEffect(() => {
      const fetchEnrolledCourses = async () => {
         const token = localStorage.getItem('token');
         if (!token) return;
         try {
            const response = await API.get('/student/course/enrolled', {
               headers: { token },
            });
            setEnrolledCourses(response.data.map(course => course.id));
         } catch {
            // user may not be a student - silently handle
         }
      };
      fetchEnrolledCourses();
   }, []);

   // Fetch cart items
   useEffect(() => {
      const fetchCartItems = async () => {
         const token = localStorage.getItem('token');
         if (!token) return;
         try {
            const response = await API.get('/cart', {
               headers: { token },
            });
            setCart(response.data.cartItems || []);
         } catch {
            // silently handle
         }
      };
      fetchCartItems();
   }, []);

   // Check if in cart
   const isInCart = useCallback((courseId) => {
      return cart.some(item => (item.id || item.courseId) === courseId);
   }, [cart]);

   // Add to cart
   const addToCart = useCallback(async (course) => {
      if (isInCart(course.id)) {
         toast.warning('This course is already in your cart.');
         return;
      }
      try {
         const token = localStorage.getItem('token');
         if (!token) {
            toast.info('Please log in to add courses to your cart.');
            return;
         }
         await API.post('/cart', { courseId: course.id }, {
            headers: { token },
         });
         setCart(prev => [...prev, course]);
         toast.success('Course added to cart!');
         fetchCartCount();
      } catch (err) {
         console.error('Error adding to cart:', err);
         toast.error('Failed to add course to cart.');
      }
   }, [isInCart, fetchCartCount]);

   // Filter handling
   const toggleCategoryFilter = useCallback((category) => {
      setCategoryFilters(prev =>
         prev.includes(category)
            ? prev.filter(c => c !== category)
            : [...prev, category]
      );
   }, []);

   const toggleLevelFilter = useCallback((level) => {
      setLevelFilters(prev =>
         prev.includes(level)
            ? prev.filter(l => l !== level)
            : [...prev, level]
      );
   }, []);

   // Determine "level" from duration (since DB doesn't have a level field)
   const getCourseLevel = (course) => {
      const duration = Number(course.duration) || 0;
      if (duration <= 30) return 'Beginner';
      if (duration <= 60) return 'Intermediate';
      return 'Advanced';
   };

   // Apply filters
   const filteredCourses = useMemo(() => {
      return courses.filter(course => {
         const matchesSearch =
            course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.description?.toLowerCase().includes(searchTerm.toLowerCase());
         const matchesCategory =
            categoryFilters.length === 0 || categoryFilters.includes(course.category);
         const matchesPrice =
            Number(course.price) >= priceRange.min && Number(course.price) <= priceRange.max;
         const courseLevel = getCourseLevel(course);
         const matchesLevel =
            levelFilters.length === 0 || levelFilters.includes(courseLevel);
         return matchesSearch && matchesCategory && matchesPrice && matchesLevel;
      });
   }, [courses, searchTerm, categoryFilters, priceRange, levelFilters]);

   // Sort courses
   const sortedCourses = useMemo(() => {
      return [...filteredCourses].sort((a, b) => {
         switch (sortOption) {
            case 'price-low':
               return Number(a.price) - Number(b.price);
            case 'price-high':
               return Number(b.price) - Number(a.price);
            case 'newest':
               return new Date(b.created_at) - new Date(a.created_at);
            default: // popular
               return (Number(b.students) || 0) - (Number(a.students) || 0);
         }
      });
   }, [filteredCourses, sortOption]);

   // Clear all filters
   const clearFilters = useCallback(() => {
      setSearchTerm('');
      setCategoryFilters([]);
      setPriceRange({ min: 0, max: maxPrice });
      setLevelFilters([]);
      setSortOption('popular');
   }, [maxPrice]);

   const hasActiveFilters = categoryFilters.length > 0 || levelFilters.length > 0 || priceRange.max < maxPrice;

   // --- Filter Sidebar Content (shared between desktop & mobile) ---
   const FilterContent = ({ isMobile = false }) => (
      <div className="mb-6">
         <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">Filters</h2>
            <button onClick={clearFilters} className="text-sm text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
               Clear All
            </button>
         </div>

         {/* Sort */}
         <div className="mb-6">
            <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Sort By</h3>
            <select
               value={sortOption}
               onChange={(e) => setSortOption(e.target.value)}
               className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
            >
               <option value="popular">Most Popular</option>
               <option value="newest">Newest First</option>
               <option value="price-low">Price: Low to High</option>
               <option value="price-high">Price: High to Low</option>
            </select>
         </div>

         {/* Categories */}
         {categories.length > 0 && (
            <div className="mb-6">
               <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Categories</h3>
               <div className="space-y-2">
                  {categories.map((category) => (
                     <label key={category} className="flex items-center cursor-pointer">
                        <input
                           type="checkbox"
                           checked={categoryFilters.includes(category)}
                           onChange={() => toggleCategoryFilter(category)}
                           className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <span className="ml-2 text-gray-700 dark:text-gray-300 capitalize">{category}</span>
                     </label>
                  ))}
               </div>
            </div>
         )}

         {/* Price Range */}
         <div className="mb-6">
            <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Price Range</h3>
            <div className="flex items-center justify-between mb-2">
               <span className="text-gray-600 dark:text-gray-400 text-sm">₹{priceRange.min}</span>
               <span className="text-gray-600 dark:text-gray-400 text-sm">₹{priceRange.max}</span>
            </div>
            <input
               type="range"
               min="0"
               max={maxPrice}
               step="100"
               value={priceRange.max}
               onChange={(e) => setPriceRange(prev => ({ ...prev, max: parseInt(e.target.value) }))}
               className="w-full accent-indigo-600"
            />
         </div>

         {/* Level */}
         <div className="mb-6">
            <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Level</h3>
            <div className="space-y-2">
               {levels.map((level) => (
                  <label key={level} className="flex items-center cursor-pointer">
                     <input
                        type="checkbox"
                        checked={levelFilters.includes(level)}
                        onChange={() => toggleLevelFilter(level)}
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                     />
                     <span className="ml-2 text-gray-700 dark:text-gray-300">{level}</span>
                  </label>
               ))}
            </div>
         </div>

         {isMobile && (
            <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
               <button
                  onClick={clearFilters}
                  className="w-full bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 py-2 px-4 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors mb-3"
               >
                  Clear All Filters
               </button>
               <button
                  onClick={() => setSidebarOpen(false)}
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
               >
                  Apply Filters
               </button>
            </div>
         )}
      </div>
   );

   // Error state
   if (error) {
      return (
         <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="bg-red-100 dark:bg-red-900/30 border-l-4 border-red-500 text-red-700 dark:text-red-400 p-6 rounded-lg shadow-md max-w-md">
               <p className="font-bold text-lg mb-1">Error</p>
               <p>{error}</p>
               <button
                  onClick={() => window.location.reload()}
                  className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
               >
                  Retry
               </button>
            </div>
         </div>
      );
   }

   return (
      <section className="text-gray-600 dark:text-gray-300 body-font bg-gray-50 dark:bg-gray-900 min-h-screen">
         <div className="relative flex">
            {/* Filter Sidebar - Desktop */}
            <div className="hidden md:block w-64 shrink-0 bg-white dark:bg-gray-800 shadow-md p-6 min-h-screen sticky top-0 overflow-y-auto">
               <FilterContent />
            </div>

            {/* Mobile Filter Sidebar */}
            {sidebarOpen && (
               <div className="fixed inset-0 z-40 md:hidden">
                  <div className="absolute inset-0 bg-gray-600/75 dark:bg-black/60" onClick={() => setSidebarOpen(false)} />
                  <div className="absolute inset-y-0 left-0 w-full max-w-xs bg-white dark:bg-gray-800 shadow-xl p-6 overflow-y-auto">
                     <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">Filters</h2>
                        <button onClick={() => setSidebarOpen(false)} className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">
                           <X size={24} />
                        </button>
                     </div>
                     <FilterContent isMobile />
                  </div>
               </div>
            )}

            {/* Main Content */}
            <div className="flex-1 p-4 mt-2">
               <div className="container mx-auto">
                  <div className="text-center mb-8">
                     <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Explore Our Courses</h1>
                     <p className="text-xl text-gray-600 dark:text-gray-400 mx-auto leading-relaxed max-w-2xl">
                        Discover high-quality courses designed to help you master new skills and advance your career.
                     </p>
                  </div>

                  {/* Search Bar + Mobile Filter Button */}
                  <div className="flex flex-col md:flex-row gap-4 mb-8 max-w-4xl mx-auto">
                     <div className="relative flex-grow">
                        <input
                           type="text"
                           placeholder="Search courses..."
                           value={searchTerm}
                           onChange={(e) => setSearchTerm(e.target.value)}
                           className="w-full px-4 py-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 outline-none transition-all"
                        />
                        <Search size={18} className="absolute left-3 top-3 text-gray-400" />
                     </div>
                     <button
                        className="md:hidden flex items-center justify-center px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-gray-700 dark:text-gray-200"
                        onClick={() => setSidebarOpen(true)}
                     >
                        <Sliders size={18} className="mr-2" />
                        Filters
                     </button>
                  </div>

                  {/* Results Summary */}
                  <div className="flex justify-between items-center mb-6">
                     <p className="text-gray-600 dark:text-gray-400">
                        Showing {sortedCourses.length} of {courses.length} courses
                     </p>
                     <div className="hidden md:flex items-center">
                        <span className="mr-2 text-gray-700 dark:text-gray-300">Sort by:</span>
                        <select
                           value={sortOption}
                           onChange={(e) => setSortOption(e.target.value)}
                           className="p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
                        >
                           <option value="popular">Most Popular</option>
                           <option value="newest">Newest First</option>
                           <option value="price-low">Price: Low to High</option>
                           <option value="price-high">Price: High to Low</option>
                        </select>
                     </div>
                  </div>

                  {/* Filter Tags */}
                  {hasActiveFilters && (
                     <div className="flex flex-wrap gap-2 mb-6">
                        {categoryFilters.map(cat => (
                           <div key={cat} className="flex items-center bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-300 px-3 py-1 rounded-full text-sm capitalize">
                              {cat}
                              <button onClick={() => toggleCategoryFilter(cat)} className="ml-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800">
                                 <X size={14} />
                              </button>
                           </div>
                        ))}
                        {levelFilters.map(level => (
                           <div key={level} className="flex items-center bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300 px-3 py-1 rounded-full text-sm">
                              {level}
                              <button onClick={() => toggleLevelFilter(level)} className="ml-2 text-green-600 dark:text-green-400 hover:text-green-800">
                                 <X size={14} />
                              </button>
                           </div>
                        ))}
                        {priceRange.max < maxPrice && (
                           <div className="flex items-center bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-sm">
                              Under ₹{priceRange.max}
                              <button onClick={() => setPriceRange(prev => ({ ...prev, max: maxPrice }))} className="ml-2 text-blue-600 dark:text-blue-400 hover:text-blue-800">
                                 <X size={14} />
                              </button>
                           </div>
                        )}
                     </div>
                  )}

                  {/* Loading State */}
                  {isLoading ? (
                     <div className="flex justify-center items-center h-64">
                        <div className="w-16 h-16 border-4 border-indigo-400 border-t-indigo-600 rounded-full animate-spin" />
                     </div>
                  ) : (
                     <>
                        {sortedCourses.length > 0 ? (
                           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                              {sortedCourses.map((course) => {
                                 const level = getCourseLevel(course);
                                 return (
                                    <div
                                       key={course.id}
                                       className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                                       onClick={() => setSelectedCourse(course)}
                                    >
                                       {/* Course Header */}
                                       <div className="h-44 bg-gradient-to-r from-indigo-500 to-purple-600 relative">
                                          {course.category && (
                                             <div className="absolute top-4 right-4 bg-yellow-400 text-xs font-bold px-2 py-1 rounded-full text-gray-800 capitalize">
                                                {course.category}
                                             </div>
                                          )}
                                          <div className="absolute bottom-4 left-4 bg-black/60 text-white text-xs font-medium px-2 py-1 rounded">
                                             {level}
                                          </div>
                                       </div>

                                       <div className="p-5">
                                          <h2 className="text-lg text-gray-900 dark:text-white font-bold mb-1 line-clamp-1">
                                             {course.title}
                                          </h2>

                                          {course.instructor_name && (
                                             <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                                                by {course.instructor_name}
                                             </p>
                                          )}

                                          <p className="leading-relaxed text-sm mb-3 text-gray-600 dark:text-gray-400 line-clamp-2">
                                             {course.description}
                                          </p>

                                          <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs mb-3 gap-3">
                                             <div className="flex items-center">
                                                <Clock size={13} className="mr-1" />
                                                {course.duration} days
                                             </div>
                                             <div className="flex items-center">
                                                <Users size={13} className="mr-1" />
                                                {Number(course.students || 0).toLocaleString()} enrolled
                                             </div>
                                          </div>

                                          <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
                                             <span className="text-indigo-600 dark:text-indigo-400 text-xl font-bold">
                                                ₹{Number(course.price).toLocaleString()}
                                             </span>
                                             <button
                                                onClick={(e) => {
                                                   e.stopPropagation();
                                                   setSelectedCourse(course);
                                                }}
                                                className="text-white bg-indigo-600 hover:bg-indigo-700 py-2 px-4 rounded-lg shadow text-sm transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                             >
                                                View Details
                                             </button>
                                          </div>
                                       </div>
                                    </div>
                                 );
                              })}
                           </div>
                        ) : (
                           <div className="w-full text-center py-16">
                              <Search size={48} className="text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                              <p className="text-xl text-gray-500 dark:text-gray-400">No courses found matching your criteria.</p>
                              <button
                                 onClick={clearFilters}
                                 className="mt-4 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium"
                              >
                                 Clear all filters
                              </button>
                           </div>
                        )}
                     </>
                  )}
               </div>
            </div>
         </div>

         {/* Course Detail Modal */}
         {selectedCourse && (
            <div
               className="fixed inset-0 flex items-center justify-center z-50 p-4"
               style={{ backdropFilter: 'blur(8px)' }}
               onClick={(e) => {
                  if (e.target === e.currentTarget) setSelectedCourse(null);
               }}
            >
               <div className="fixed inset-0 bg-black/40 dark:bg-black/60" />
               <div className="bg-white dark:bg-gray-800 w-full max-w-2xl rounded-xl shadow-2xl z-10 overflow-hidden max-h-[90vh] overflow-y-auto">
                  {/* Modal Header */}
                  <div className="h-44 bg-gradient-to-r from-indigo-600 to-purple-700 relative shrink-0">
                     <button
                        className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 rounded-full p-1.5 hover:bg-white dark:hover:bg-gray-700 transition-colors"
                        onClick={() => setSelectedCourse(null)}
                     >
                        <X size={20} className="text-gray-800 dark:text-gray-200" />
                     </button>
                     <div className="absolute bottom-4 left-6 flex gap-2">
                        {selectedCourse.category && (
                           <span className="bg-yellow-400 text-xs font-bold px-2 py-1 rounded-full text-gray-800 capitalize">
                              {selectedCourse.category}
                           </span>
                        )}
                        <span className="bg-black/60 text-white text-xs font-medium px-2 py-1 rounded">
                           {getCourseLevel(selectedCourse)}
                        </span>
                     </div>
                  </div>

                  {/* Modal Content */}
                  <div className="p-6 md:p-8">
                     <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                        {selectedCourse.title}
                     </h2>

                     {selectedCourse.instructor_name && (
                        <p className="text-gray-500 dark:text-gray-400 mb-4">
                           by <span className="font-medium text-gray-700 dark:text-gray-300">{selectedCourse.instructor_name}</span>
                        </p>
                     )}

                     <div className="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 gap-4 mb-6">
                        <div className="flex items-center">
                           <Clock size={16} className="mr-1" />
                           {selectedCourse.duration} days duration
                        </div>
                        <div className="flex items-center">
                           <Users size={16} className="mr-1" />
                           {Number(selectedCourse.students || 0).toLocaleString()} students
                        </div>
                        <div className="flex items-center">
                           <Book size={16} className="mr-1" />
                           {selectedCourse.access_period} days access
                        </div>
                     </div>

                     <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg mb-6">
                        <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Course Highlights</h3>
                        <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                           <li>{selectedCourse.access_period}-day access period</li>
                           <li>Certificate of completion</li>
                           <li>Expert instruction</li>
                           <li>Downloadable resources</li>
                        </ul>
                     </div>

                     <div className="mb-6">
                        <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Description</h3>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{selectedCourse.description}</p>
                     </div>

                     <div className="flex flex-col sm:flex-row justify-between items-center bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg gap-4">
                        <div>
                           <span className="text-indigo-600 dark:text-indigo-400 text-3xl font-bold block">
                              ₹{Number(selectedCourse.price).toLocaleString()}
                           </span>
                           <span className="text-gray-500 dark:text-gray-400 text-sm">30-day money back guarantee</span>
                        </div>
                        <div className="flex gap-3">
                           {enrolledCourses.includes(selectedCourse.id) ? (
                              <button className="bg-green-600 text-white px-6 py-2 rounded-lg cursor-default font-medium" disabled>
                                 ✓ Enrolled
                              </button>
                           ) : isInCart(selectedCourse.id) ? (
                              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg cursor-default font-medium" disabled>
                                 In Cart
                              </button>
                           ) : (
                              <button
                                 className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                                 onClick={() => addToCart(selectedCourse)}
                              >
                                 Add to Cart
                              </button>
                           )}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         )}
      </section>
   );
}
