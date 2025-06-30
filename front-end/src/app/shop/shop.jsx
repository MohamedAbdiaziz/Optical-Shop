// /front-end/src/app/shop/Shop.jsx
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './navbar/navbar';
import Footer from './footer/footer';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const navigate = useNavigate()

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/create/products');
      setProducts(res.data.qaade);
      setFilteredProducts(res.data.qaade);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleFilterChange = (category) => {
    setCategoryFilter(category);
    if (category === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.category === category));
    }
  };

  	const handleAddToCart = async (product) => {
  	  const customer = JSON.parse(localStorage.getItem('customer'));

	  if (!customer) {
	    alert("Please log in to add items to cart.");
	    navigate('/login'); // import useNavigate from react-router-dom
	    return;
	  }
	  const item = {
	    Customer: customer?.email || null,
	    Product: product._id,
	    Quantity: 1,
	    Price: product.price,
	    Subtotal: product.price * 1
	  };

	  try {
	    await axios.post('http://localhost:5000/create/cartitems', item);
	    alert('Added to cart!');
	  } catch (error) {
	    console.error('Error adding to cart:', error);
	    alert('Failed to add item to cart.');
	  }
	};

  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-primary">Shop Eyewear</h1>

        {/* Filter Buttons */}
        <div className="mb-6 flex gap-4">
          <button onClick={() => handleFilterChange('all')} className={`px-4 py-2 rounded ${categoryFilter === 'all' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'}`}>All</button>
          <button onClick={() => handleFilterChange('sunglasses')} className={`px-4 py-2 rounded ${categoryFilter === 'sunglasses' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'}`}>Sunglasses</button>
          <button onClick={() => handleFilterChange('prescription')} className={`px-4 py-2 rounded ${categoryFilter === 'prescription' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'}`}>Prescription</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div key={product._id} className="bg-white shadow rounded-lg p-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded"
              />
              <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
              <p className="text-gray-600 mb-1">{product.category}</p>
              <p className="text-primary font-bold mb-2">${parseFloat(product.price).toFixed(2)}</p>
              <div className="flex gap-2">
                <button
                  className="bg-primary text-white px-3 py-1 rounded hover:bg-blue-700"
                  onClick={() => setSelectedProduct(product)}
                >
                  View
                </button>
                {/*<button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                  Add to Cart
                </button>*/}
                <button onClick={() => handleAddToCart(product)} className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
				  Add to Cart
				</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />

      {/* View Product Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
            >✖</button>
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-60 object-cover rounded mb-4"
            />
            <h2 className="text-2xl font-bold text-primary mb-2">{selectedProduct.name}</h2>
            <p className="text-gray-700 mb-2">Category: {selectedProduct.category}</p>
            <p className="text-gray-600 mb-2">{selectedProduct.description}</p>
            <p className="text-xl font-semibold text-green-700 mb-4">
              ${parseFloat(selectedProduct.price).toFixed(2)}
            </p>
            <button
              className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
              onClick={() => {
                alert('Added to cart');
                setSelectedProduct(null);
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
