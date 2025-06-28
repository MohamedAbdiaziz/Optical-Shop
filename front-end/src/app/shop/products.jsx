import Navbar from './navbar/navbar.jsx'
import Footer from './footer/footer.jsx'


export default function Products() {

	
	 
	return(
		<>
		<Navbar/>
		
	    <section class="bg-primary text-white py-16">
	        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
	            <h1 class="text-4xl font-bold mb-4">Our Products</h1>
	            <p class="text-xl">Discover our complete collection of premium eyewear</p>
	        </div>
	    </section>

	    
	    <section class="py-8 bg-white">
	        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
	            <div class="flex flex-wrap gap-4 items-center">
	                <span class="font-medium">Filter by:</span>
	                <button onclick="filterProducts('all')" class="filter-btn bg-primary text-white px-4 py-2 rounded-md">All</button>
	                <button onclick="filterProducts('prescription')" class="filter-btn bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300">Prescription</button>
	                <button onclick="filterProducts('sunglasses')" class="filter-btn bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300">Sunglasses</button>
	                <button onclick="filterProducts('contact')" class="filter-btn bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300">Contact Lenses</button>
	            </div>
	        </div>
	    </section>

	    
	    <section class="py-16">
	        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
	            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" id="productsGrid">
	                <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                        <img src="" alt="image" class="w-full h-64 object-cover"/>
                        <div class="p-6">
                            <h3 class="text-xl font-semibold mb-2">Testing</h3>
                            <p class="text-gray-600 mb-4 text-sm">Hight quility eyewear</p>
                            <div class="flex justify-between items-center">
                                <span class="text-2xl font-bold text-primary">$23</span>
                                <button onclick="" class="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">Add to Cart</button>
                            </div>
                        </div>
                    </div>
	            </div>
	        </div>
	    </section>

	    <Footer/>
	    
	    <div id="cartModal" class="fixed inset-0 bg-black bg-opacity-50 hidden z-50">
	        <div class="flex items-center justify-center min-h-screen p-4">
	            <div class="bg-white rounded-lg max-w-md w-full p-6">
	                <div class="flex justify-between items-center mb-4">
	                    <h3 class="text-lg font-semibold">Shopping Cart</h3>
	                    <button id="closeCart" class="text-gray-500 hover:text-gray-700">
	                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
	                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
	                        </svg>
	                    </button>
	                </div>
	                <div id="cartItems" class="space-y-4 mb-4">
	                    <div class="flex justify-between items-center">
                            <div>
                                <h4 class="font-medium">Testing</h4>
                                <p class="text-sm text-gray-500">$23 x 2</p>
                            </div>
                            <button onclick="" class="text-red-500 hover:text-red-700">Remove</button>
                        </div>
	                </div>
	                <div class="border-t pt-4">
	                    <div class="flex justify-between items-center mb-4">
	                        <span class="font-semibold">Total: $<span id="cartTotal">0.00</span></span>
	                    </div>
	                    <button class="w-full bg-primary text-white py-2 rounded-md hover:bg-blue-700">Checkout</button>
	                </div>
	            </div>
	        </div>
	    </div>

	    
	    
		</>

	)
}