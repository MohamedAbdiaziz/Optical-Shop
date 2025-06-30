// /front-end/src/app/shop/cart.jsx
import { useEffect, useState } from 'react';
import Navbar from './navbar/navbar';
import Footer from './footer/footer';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate()
  const storedUser = JSON.parse(localStorage.getItem('customer'));
  const customerEmail = storedUser?.email || null;

  

  const fetchCartItems = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/create/cartitems/${customerEmail}`);
      setCartItems(Array.isArray(res.data.qaade) ? res.data.qaade : [res.data.qaade]);
    } catch (error) {
      console.error('Failed to fetch cart items:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/create/products`);
      setProducts(res.data.qaade);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    }
  };

  useEffect(() => {
    if (!customerEmail) {
      alert("Please log in first.");
      navigate('/login'); // or redirect
      return;
    }
    fetchCartItems();
    fetchProducts();
  }, []);

  const getProduct = (productId) => {
    return products.find(p => p._id === productId);
  };

  const updateQuantity = async (id, newQty) => {
    try {
      if (newQty < 1) return;
      const item = cartItems.find(item => item._id === id);
      const updatedItem = {
        ...item,
        Quantity: newQty,
        Subtotal: parseFloat(item.Price?.$numberDecimal || 0) * newQty
      };
      await axios.put(`http://localhost:5000/create/cartitems/${id}`, updatedItem);
      fetchCartItems();
    } catch (err) {
      console.error('Error updating quantity:', err);
    }
  };

  const removeItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/create/cartitems/${id}`);
      fetchCartItems();
    } catch (err) {
      console.error('Error deleting cart item:', err);
    }
  };

  const getTotal = () => {
    return cartItems.reduce((total, item) => total + parseFloat(item.Subtotal?.$numberDecimal || 0), 0);
  };

  return (
    <div>
      <Navbar onCartClick={() => setIsCartOpen(true)} />

      {/* Modal for Cart Items */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-full max-w-2xl p-6 rounded-lg shadow-xl relative">
            <button onClick={() => setIsCartOpen(false)} className="absolute top-2 right-2 text-gray-600 hover:text-black">✕</button>
            <h2 className="text-2xl font-bold mb-4 text-primary">Your Cart</h2>
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {cartItems.map(item => {
                  const product = getProduct(item.Product);
                  return (
                    <div key={item._id} className="flex items-center justify-between bg-gray-100 p-4 rounded">
                      <div className="flex gap-4 items-center">
                        {product && (
                          <img src={product.image} alt={product.name} className="w-16 h-16 rounded object-cover" />
                        )}
                        <div>
                          <h3 className="text-lg font-semibold">{product ? product.name : 'Unknown Product'}</h3>
                          <p className="text-gray-600">${parseFloat(item.Price).toFixed(2)} × {item.Quantity}</p>
                          <p className="text-green-700 font-semibold">Subtotal: ${parseFloat(item.Subtotal).toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateQuantity(item._id, item.Quantity - 1)} className="bg-gray-200 px-2 py-1 rounded">−</button>
                        <span>{item.Quantity}</span>
                        <button onClick={() => updateQuantity(item._id, item.Quantity + 1)} className="bg-gray-200 px-2 py-1 rounded">+</button>
                        <button onClick={() => removeItem(item._id)} className="bg-red-500 text-white px-3 py-1 rounded ml-4">Remove</button>
                      </div>
                    </div>
                  );
                })}
                <div className="text-right mt-4">
                  <h3 className="text-xl font-bold text-green-700">Total: ${getTotal().toFixed(2)}</h3>
                  <Link to="/checkout">
                    <button className="bg-primary text-white px-6 py-2 rounded mt-4 hover:bg-blue-700">Proceed to Checkout</button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-primary">Your Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map(item => {
              const product = getProduct(item.Product);
              return (
                <div key={item._id} className="flex items-center justify-between bg-white p-4 rounded shadow">
                  <div className="flex gap-4 items-center">
                    {product && (
                      <img src={product.image} alt={product.name} className="w-20 h-20 rounded object-cover" />
                    )}
                    <div>
                      <h2 className="text-lg font-semibold">{product ? product.name : 'Unknown Product'}</h2>
                      <p className="text-gray-600">${parseFloat(item.Price?.$numberDecimal || 0)} × {item.Quantity}</p>
                      <p className="text-green-700 font-semibold">Subtotal: ${parseFloat(item.Subtotal?.$numberDecimal || 0)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="bg-gray-200 px-2 py-1 rounded" onClick={() => updateQuantity(item._id, item.Quantity - 1)}>−</button>
                    <span>{item.Quantity}</span>
                    <button className="bg-gray-200 px-2 py-1 rounded" onClick={() => updateQuantity(item._id, item.Quantity + 1)}>+</button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded ml-4" onClick={() => removeItem(item._id)}>Remove</button>
                  </div>
                </div>
              );
            })}
            <div className="text-right mt-6">
              <h3 className="text-xl font-bold text-green-700">Total: ${getTotal().toFixed(2)}</h3>
              <Link to="/cart/checkout">
                <button className="bg-primary text-white px-6 py-2 rounded mt-4 hover:bg-blue-700">Proceed to Checkout</button>
              </Link>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
