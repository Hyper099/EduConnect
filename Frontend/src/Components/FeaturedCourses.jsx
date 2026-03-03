
export default function FeaturedCourses() {
   const courses = [
      {
         id: 1,
         title: "Web Development Bootcamp",
         description: "Master front-end and back-end development in this comprehensive course.",
         instructor: "John Doe",
         image: "https://source.unsplash.com/400x300/?coding,programming"
      },
      {
         id: 2,
         title: "Digital Marketing Essentials",
         description: "Learn the secrets of SEO, social media marketing, and more.",
         instructor: "Jane Smith",
         image: "https://source.unsplash.com/400x300/?marketing,seo"
      },
      {
         id: 3,
         title: "Graphic Design Masterclass",
         description: "Unleash your creativity with this step-by-step design course.",
         instructor: "Emily Johnson",
         image: "https://source.unsplash.com/400x300/?design,graphics"
      }
   ];

   return (
      <section className="text-gray-700 dark:text-gray-300 body-font">
         <div className="container px-5 py-24 mx-auto">
            <h2 className="text-3xl font-bold text-center text-indigo-500 dark:text-indigo-400 mb-12">Featured Courses</h2>
            <div className="flex flex-wrap -m-4">
               {courses.map(course => (
                  <div key={course.id} className="lg:w-1/3 md:w-1/2 p-4 w-full">
                     <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-md bg-white dark:bg-gray-800">
                        <img
                           className="lg:h-48 md:h-36 w-full object-cover object-center"
                           src={course.image}
                           alt={course.title}
                        />
                        <div className="p-6">
                           <h3 className="text-lg font-medium text-gray-900 dark:text-white">{course.title}</h3>
                           <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{course.description}</p>
                           <p className="mt-2 text-sm text-indigo-500 dark:text-indigo-400">Instructor: {course.instructor}</p>
                           <button className="mt-4 text-white bg-indigo-500 py-2 px-4 rounded hover:bg-indigo-600">
                              View Details
                           </button>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>
   );
}
