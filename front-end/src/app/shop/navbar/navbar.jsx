import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Navbar() {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('customer');
    if (stored) {
      const user = JSON.parse(stored);
      setCustomer(user);

      axios.get(`http://localhost:5000/create/cartitems/${user.email}`)
        .then(res => {
          const items = Array.isArray(res.data.qaade) ? res.data.qaade : [res.data.qaade];
          setCartCount(items.length);
        })
        .catch(() => setCartCount(0));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('customer');
    setCustomer(null);
    navigate('/');
	}
  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary">VisionCraft</Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className="text-gray-900 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">Shop</Link>
              {/*<Link to="/products" className="text-gray-900 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">Products</Link>*/}
              <Link to="/about" className="text-gray-900 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">About</Link>
              <Link to="/contact" className="text-gray-900 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">Contact</Link>
              
            </div>
          </div>
          	<div class="flex items-center space-x-4">
	            
	            {customer ? (
	              <>
	            	
	                <span className="text-sm text-gray-700">Hi, {customer.name.split(' ')[0]}</span>
	                <Link to="/cart" class="relative p-2 text-gray-600 hover:text-primary">
		                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
		                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9m-9 0h9"></path>
		                </svg>
	                	<span id="cartCount" class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
	            	</Link>
	                <Link to="/profile" className="p-2 text-gray-600 hover:text-primary flex items-center" title="Profile">
    					<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      						<path
        						strokeLinecap="round"
        						strokeLinejoin="round"
        						strokeWidth="2"
    							d="M5.121 17.804A10 10 0 0012 22a10 10 0 006.879-4.196M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      						/>
    					</svg>
  					</Link>
	                <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-1 rounded text-sm hover:bg-red-600">Logout</button>
	              </>
	            ) : (
	              <>
	                <Link to="/login" className="text-gray-700 hover:text-primary text-sm">Login</Link>
	                <Link to="/register" className="text-gray-700 hover:text-primary text-sm">Register</Link>
	              </>
	            )}
	            {/*<Link to="/admin/login" className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
	              Admin
	            </Link>*/}
	        </div>
          
        </div>
      </div>
    </nav>
  );
}
