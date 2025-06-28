import Navbar from './shop/navbar/navbar.jsx'
import Footer from './shop/footer/footer.jsx'


export default function About() {
	return(
		<>
		<Navbar/>



	    <section class="bg-primary text-white py-16">
	        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
	            <h1 class="text-4xl font-bold mb-4">Contact Us</h1>
	            <p class="text-xl">Get in touch with our vision care experts</p>
	        </div>
	    </section>

	    
	    <section class="py-16">
	        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
	            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
	                
	                <div>
	                    <h2 class="text-3xl font-bold mb-6">Send us a Message</h2>
	                    <form id="contactForm" class="space-y-6">
	                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
	                            <div>
	                                <label for="firstName" class="block text-sm font-medium text-gray-700 mb-2">First Name</label>
	                                <input type="text" id="firstName" name="firstName" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"/>
	                            </div>
	                            <div>
	                                <label for="lastName" class="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
	                                <input type="text" id="lastName" name="lastName" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"/>
	                            </div>
	                        </div>
	                        <div>
	                            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email</label>
	                            <input type="email" id="email" name="email" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"/>
	                        </div>
	                        <div>
	                            <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">Phone</label>
	                            <input type="tel" id="phone" name="phone" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"/>
	                        </div>
	                        <div>
	                            <label for="subject" class="block text-sm font-medium text-gray-700 mb-2">Subject</label>
	                            <select id="subject" name="subject" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
	                                <option value="">Select a subject</option>
	                                <option value="general">General Inquiry</option>
	                                <option value="appointment">Schedule Appointment</option>
	                                <option value="product">Product Question</option>
	                                <option value="support">Customer Support</option>
	                                <option value="other">Other</option>
	                            </select>
	                        </div>
	                        <div>
	                            <label for="message" class="block text-sm font-medium text-gray-700 mb-2">Message</label>
	                            <textarea id="message" name="message" rows="5" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"></textarea>
	                        </div>
	                        <button type="submit" class="w-full bg-primary text-white py-3 px-6 rounded-md hover:bg-blue-700 transition duration-300">Send Message</button>
	                    </form>
	                </div>

	                
	                <div>
	                    <h2 class="text-3xl font-bold mb-6">Get in Touch</h2>
	                    <div class="space-y-6">
	                        <div class="flex items-start space-x-4">
	                            <div class="bg-blue-100 p-3 rounded-full">
	                                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
	                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
	                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
	                                </svg>
	                            </div>
	                            <div>
	                                <h3 class="text-lg font-semibold mb-2">Visit Our Store</h3>
	                                <p class="text-gray-600">123 Vision Street<br/>City, State Banadir<br/>Somalia</p>
	                            </div>
	                        </div>
	                        <div class="flex items-start space-x-4">
	                            <div class="bg-blue-100 p-3 rounded-full">
	                                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
	                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
	                                </svg>
	                            </div>
	                            <div>
	                                <h3 class="text-lg font-semibold mb-2">Call Us</h3>
	                                <p class="text-gray-600">Phone: (555) 123-4567<br/>Toll Free: 1-800-VISION<br/>Fax: (555) 123-4568</p>
	                            </div>
	                        </div>
	                        <div class="flex items-start space-x-4">
	                            <div class="bg-blue-100 p-3 rounded-full">
	                                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
	                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
	                                </svg>
	                            </div>
	                            <div>
	                                <h3 class="text-lg font-semibold mb-2">Email Us</h3>
	                                <p class="text-gray-600">info@visioncraft.com<br/>support@visioncraft.com<br/>appointments@visioncraft.com</p>
	                            </div>
	                        </div>
	                        <div class="flex items-start space-x-4">
	                            <div class="bg-blue-100 p-3 rounded-full">
	                                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
	                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
	                                </svg>
	                            </div>
	                            <div>
	                                <h3 class="text-lg font-semibold mb-2">Store Hours</h3>
	                                <p class="text-gray-600">
	                                    Monday - Friday: 9:00 AM - 7:00 PM<br/>
	                                    Saturday: 9:00 AM - 6:00 PM<br/>
	                                    Sunday: 11:00 AM - 5:00 PM
	                                </p>
	                            </div>
	                        </div>
	                    </div>
	                </div>
	            </div>
	        </div>
	    </section>

	    
	    <section class="py-16 bg-white">
	        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
	            <h2 class="text-3xl font-bold text-center mb-8">Find Us</h2>
	            <div class="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
	                <p class="text-gray-600">Interactive Map Would Be Here</p>
	            </div>
	        </div>
	    </section>

		<Footer/>

		</>
	)
}