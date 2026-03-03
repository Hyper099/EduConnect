import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { useState } from 'react';

export default function Testimonials() {
   const testimonials = [
      {
         id: 1,
         name: "Alice Johnson",
         role: "UI/UX Designer",
         company: "Designlab",
         feedback: "This platform transformed my learning experience. The courses are well-structured and the instructors truly care about student success. I've completed 3 courses and each one helped me advance my career.",
         image: "/api/placeholder/80/80",
         rating: 5
      },
      {
         id: 2,
         name: "Mark Robinson",
         role: "Senior Developer",
         company: "TechFusion",
         feedback: "Teaching on this platform has been amazing. The interface is smooth, the students are engaged, and the support team is always ready to help. My courses have reached over 2,000 students worldwide!",
         image: "/api/placeholder/80/80",
         rating: 5
      },
      {
         id: 3,
         name: "Sophie Turner",
         role: "Marketing Specialist",
         company: "GrowthGenius",
         feedback: "I loved the interactive content and practical assignments. The instructors are incredibly supportive and the community forums helped me connect with peers in my field. Worth every penny!",
         image: "/api/placeholder/80/80",
         rating: 4
      },
      {
         id: 4,
         name: "David Chen",
         role: "Data Scientist",
         company: "AnalyticsAI",
         feedback: "As someone transitioning careers, these courses provided exactly what I needed - practical skills with real-world applications. The certificate I earned helped me land my dream job.",
         image: "/api/placeholder/80/80",
         rating: 5
      },
      {
         id: 5,
         name: "Priya Sharma",
         role: "Product Manager",
         company: "InnovateCorp",
         feedback: "The quality of content surpassed my expectations. I especially appreciated the industry insights and case studies that complemented the theoretical knowledge. Highly recommended!",
         image: "/api/placeholder/80/80",
         rating: 5
      }
   ];

   const [activeIndex, setActiveIndex] = useState(0);
   const visibleTestimonials = 3;

   const nextSlide = () => {
      setActiveIndex((prevIndex) =>
         (prevIndex + 1) % (testimonials.length - visibleTestimonials + 1)
      );
   };

   const prevSlide = () => {
      setActiveIndex((prevIndex) =>
         prevIndex === 0 ? testimonials.length - visibleTestimonials : prevIndex - 1
      );
   };

   return (
      <section className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 py-24">
         <div className="container mx-auto px-4">
            <div className="text-center mb-12">
               <div className="inline-block px-3 py-1 rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400 font-medium text-sm mb-4">
                  TESTIMONIALS
               </div>
               <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">What Our Community Says</h2>
               <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Join thousands of satisfied students and instructors who have transformed their learning and teaching experience with us.
               </p>
            </div>

            <div className="relative">
               <div className="flex flex-wrap -mx-4">
                  {testimonials.slice(activeIndex, activeIndex + visibleTestimonials).map((testimonial) => (
                     <div key={testimonial.id} className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 h-full flex flex-col hover:shadow-xl transition-shadow duration-300 relative">
                           <div className="absolute -top-4 -right-4 bg-indigo-500 p-3 rounded-full shadow-lg text-white">
                              <Quote size={24} />
                           </div>
                           <div className="flex items-center mb-6">
                              <img
                                 src={testimonial.image}
                                 alt={testimonial.name}
                                 className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md"
                              />
                              <div className="ml-4">
                                 <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{testimonial.name}</h3>
                                 <p className="text-indigo-600 dark:text-indigo-400">{testimonial.role}</p>
                                 <p className="text-gray-500 dark:text-gray-400 text-sm">{testimonial.company}</p>
                              </div>
                           </div>
                           <div className="flex mb-4">
                              {[...Array(5)].map((_, i) => (
                                 <Star
                                    key={i}
                                    size={16}
                                    className={i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 dark:text-gray-600"}
                                 />
                              ))}
                           </div>
                           <p className="text-gray-600 dark:text-gray-300 italic flex-grow">"{testimonial.feedback}"</p>
                        </div>
                     </div>
                  ))}
               </div>

               {/* Navigation Controls */}
               <div className="flex justify-center mt-8 space-x-4">
                  <button
                     onClick={prevSlide}
                     className="p-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 shadow-sm text-gray-600 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 hover:text-indigo-600 transition-colors"
                     aria-label="Previous testimonials"
                  >
                     <ChevronLeft size={24} />
                  </button>
                  <div className="flex space-x-2 items-center">
                     {[...Array(testimonials.length - visibleTestimonials + 1)].map((_, i) => (
                        <button
                           key={i}
                           onClick={() => setActiveIndex(i)}
                           className={`w-3 h-3 rounded-full ${activeIndex === i ? "bg-indigo-600" : "bg-gray-300 dark:bg-gray-600"
                              } transition-colors`}
                           aria-label={`Go to slide ${i + 1}`}
                        />
                     ))}
                  </div>
                  <button
                     onClick={nextSlide}
                     className="p-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 shadow-sm text-gray-600 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 hover:text-indigo-600 transition-colors"
                     aria-label="Next testimonials"
                  >
                     <ChevronRight size={24} />
                  </button>
               </div>
            </div>

            <div className="mt-16 bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 max-w-4xl mx-auto">
               <div className="flex flex-col md:flex-row items-center">
                  <div className="mb-6 md:mb-0 md:mr-8">
                     <div className="bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400 rounded-full p-5 inline-block">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                     </div>
                  </div>
                  <div>
                     <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Join Our Community of Learners</h3>
                     <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Become part of our thriving learning community and take your skills to the next level with expert-led courses.
                     </p>
                     <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">
                        Get Started Today
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}