import Navbar from './shop/navbar/navbar.jsx'
import Footer from './shop/footer/footer.jsx'


export default function About() {
	return(
		<>
		<Navbar/>
	  
	    
	    <section class="bg-white py-16">
	        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
	            <div class="text-center mb-12">
	                <h2 class="text-3xl font-bold mb-4">Our Mission & Values</h2>
	                <p class="text-gray-600 max-w-2xl mx-auto">
	                    We are dedicated to providing exceptional vision care and premium eyewear solutions 
	                    that enhance our customers' quality of life.
	                </p>
	            </div>
	            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
	                <div class="text-center">
	                    <div class="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
	                        <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
	                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
	                        </svg>
	                    </div>
	                    <h3 class="text-xl font-semibold mb-2">Quality First</h3>
	                    <p class="text-gray-600">We never compromise on quality, ensuring every product meets our rigorous standards.</p>
	                </div>
	                <div class="text-center">
	                    <div class="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
	                        <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
	                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
	                        </svg>
	                    </div>
	                    <h3 class="text-xl font-semibold mb-2">Customer Focus</h3>
	                    <p class="text-gray-600">Our customers are at the heart of everything we do, driving our innovation and service.</p>
	                </div>
	                <div class="text-center">
	                    <div class="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
	                        <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
	                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
	                        </svg>
	                    </div>
	                    <h3 class="text-xl font-semibold mb-2">Innovation</h3>
	                    <p class="text-gray-600">We embrace new technologies and trends to provide cutting-edge optical solutions.</p>
	                </div>
	            </div>
	        </div>
	    </section>

	    
	    

	    
	    <Footer/>
		</>
	)
	
}