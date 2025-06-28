import Navbar from './navbar/navbar.jsx'
import Footer from './footer/footer.jsx'

export default function Shop() {
	
	return(
		<>
		<Navbar/>

	    <section class="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
	        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
	            <div class="text-center">
	                <h1 class="text-4xl md:text-6xl font-bold mb-6">See the World Clearly</h1>
	                <p class="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">Discover our premium collection of eyewear designed for style, comfort, and perfect vision.</p>
	                <a href="products.html" class="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition duration-300">Shop Now</a>
	            </div>
	        </div>
	    </section>

	    
	    <section class="py-16">
	        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
	            <div class="text-center mb-12">
	                <h2 class="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
	                <p class="text-gray-600 max-w-2xl mx-auto">Explore our handpicked selection of premium eyewear</p>
	            </div>
	            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="featuredProducts">
	            	 <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
	                    <img src="" alt="imag" class="w-full h-64 object-cover"/>
	                    <div class="p-6">
	                        <h3 class="text-xl font-semibold mb-2">Tesintf</h3>
	                        <p class="text-gray-600 mb-4">Hight Quility eyewear</p>
	                        <div class="flex justify-between items-center">
	                            <span class="text-2xl font-bold text-primary">$23</span>
	                            <button onclick="addToCart(${product.id})" class="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-700">Add to Cart</button>
	                        </div>
	                    </div>
	                </div>
	                
	            </div>
	        </div>
	    </section>

	    
	    <section class="bg-white py-16">
	        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
	            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
	                <div class="text-center">
	                    <div class="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
	                        <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
	                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
	                        </svg>
	                    </div>
	                    <h3 class="text-xl font-semibold mb-2">Quality Guarantee</h3>
	                    <p class="text-gray-600">All our products come with a comprehensive quality guarantee</p>
	                </div>
	                <div class="text-center">
	                    <div class="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
	                        <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
	                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
	                        </svg>
	                    </div>
	                    <h3 class="text-xl font-semibold mb-2">Fast Delivery</h3>
	                    <p class="text-gray-600">Quick and secure delivery to your doorstep</p>
	                </div>
	                <div class="text-center">
	                    <div class="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
	                        <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
	                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 109.75 9.75A9.75 9.75 0 0012 2.25z"></path>
	                        </svg>
	                    </div>
	                    <h3 class="text-xl font-semibold mb-2">Expert Support</h3>
	                    <p class="text-gray-600">Professional guidance from our optical experts</p>
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
                        <button onclick="removeFromCart(${item.id})" class="text-red-500 hover:text-red-700">Remove</button>
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