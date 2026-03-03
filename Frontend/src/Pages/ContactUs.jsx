import { useState } from "react";

export default function ContactUs() {
   const [formData, setFormData] = useState({
      name: "",
      email: "",
      subject: "",
      message: ""
   });
   const [formStatus, setFormStatus] = useState(null);
   const [isSubmitting, setIsSubmitting] = useState(false);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prevState => ({
         ...prevState,
         [name]: value
      }));
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      if (!formData.name || !formData.email || !formData.message) {
         setFormStatus({ type: "error", message: "Please fill out all required fields." });
         return;
      }

      setIsSubmitting(true);
      setFormStatus({ type: "loading", message: "Sending your message..." });

      // Simulate API call
      setTimeout(() => {
         setIsSubmitting(false);
         setFormStatus({ type: "success", message: "Thank you! Your message has been sent successfully." });
         setFormData({ name: "", email: "", subject: "", message: "" });
      }, 1500);
   };

   return (
      <section className="text-gray-600 dark:text-gray-400 body-font bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-900 py-12 px-4">
         <div className="container mx-auto max-w-4xl">
            {/* Header */}
            <div className="text-center mb-12">
               <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Get in Touch</h2>
               <p className="text-lg text-gray-600 dark:text-gray-400 mx-auto max-w-xl">
                  Have questions about our courses? Need support? We'd love to hear from you!
               </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
               {/* Contact Information */}
               <div className="lg:w-1/3 bg-indigo-600 text-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-bold mb-6">Contact Information</h3>

                  <div className="space-y-6">
                     <div className="flex items-start">
                        <div className="bg-indigo-500 p-2 rounded mr-4">
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                           </svg>
                        </div>
                        <div>
                           <h4 className="font-semibold">Our Address</h4>
                           <p className="mt-1 text-indigo-100">123 Education Street, Learning City, 10001</p>
                        </div>
                     </div>

                     <div className="flex items-start">
                        <div className="bg-indigo-500 p-2 rounded mr-4">
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                           </svg>
                        </div>
                        <div>
                           <h4 className="font-semibold">Email Us</h4>
                           <p className="mt-1 text-indigo-100">support@learningplatform.com</p>
                        </div>
                     </div>

                     <div className="flex items-start">
                        <div className="bg-indigo-500 p-2 rounded mr-4">
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                           </svg>
                        </div>
                        <div>
                           <h4 className="font-semibold">Call Us</h4>
                           <p className="mt-1 text-indigo-100">+1 (555) 123-4567</p>
                        </div>
                     </div>
                  </div>

                  <div className="mt-12">
                     <h4 className="font-semibold mb-4">Follow Us</h4>
                     <div className="flex space-x-4">
                        {["facebook", "twitter", "instagram", "linkedin"].map(social => (
                           <a key={social} href="#" className="bg-indigo-500 p-2 rounded-full hover:bg-white hover:text-indigo-600 transition-colors">
                              <span className="sr-only">{social}</span>
                              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                 <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                              </svg>
                           </a>
                        ))}
                     </div>
                  </div>
               </div>

               {/* Contact Form */}
               <div className="lg:w-2/3 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send Us a Message</h3>

                  {formStatus && (
                     <div
                        className={`p-4 mb-6 rounded ${formStatus.type === 'error'
                              ? 'bg-red-50 text-red-700 border-l-4 border-red-500 dark:bg-red-900/30 dark:text-red-400'
                              : formStatus.type === 'success'
                                 ? 'bg-green-50 text-green-700 border-l-4 border-green-500 dark:bg-green-900/30 dark:text-green-400'
                                 : 'bg-blue-50 text-blue-700 border-l-4 border-blue-500 dark:bg-blue-900/30 dark:text-blue-400'
                           }`}
                     >
                        {formStatus.message}
                     </div>
                  )}

                  <form onSubmit={handleSubmit}>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                           <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                           <input
                              type="text"
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition-colors dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                              placeholder="John Doe"
                              required
                           />
                        </div>
                        <div>
                           <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                           <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition-colors dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                              placeholder="john@example.com"
                              required
                           />
                        </div>
                     </div>

                     <div className="mt-6">
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
                        <input
                           type="text"
                           id="subject"
                           name="subject"
                           value={formData.subject}
                           onChange={handleChange}
                           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition-colors dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                           placeholder="How can we help you?"
                        />
                     </div>

                     <div className="mt-6">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Message</label>
                        <textarea
                           id="message"
                           name="message"
                           value={formData.message}
                           onChange={handleChange}
                           rows="5"
                           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition-colors dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                           placeholder="Tell us what you need help with..."
                           required
                        />
                     </div>

                     <div className="mt-8">
                        <button
                           type="submit"
                           disabled={isSubmitting}
                           className={`w-full md:w-auto px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium 
                              ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-indigo-700'} 
                              transition-colors flex items-center justify-center`}
                        >
                           {isSubmitting ? (
                              <>
                                 <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                 </svg>
                                 Sending...
                              </>
                           ) : "Send Message"}
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </section>
   );
}