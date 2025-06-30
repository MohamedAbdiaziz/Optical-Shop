// /front-end/src/app/shop/checkout.jsx
import { useEffect, useState } from 'react';
import Navbar from './navbar/navbar';
import Footer from './footer/footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [customer, setCustomer] = useState(() => {
    const stored = localStorage.getItem('customer');
    return stored ? JSON.parse(stored).email : '';
  });
  const [transactionId, setTransactionId] = useState(Date.now());
  const navigate = useNavigate();

  const fetchCartItems = async () => {
    const res = await axios.get(`http://localhost:5000/create/cartitems/${customer}`);
    setCartItems(Array.isArray(res.data.qaade) ? res.data.qaade : [res.data.qaade]);
  };

  const fetchProducts = async () => {
    const res = await axios.get(`http://localhost:5000/create/products`);
    setProducts(res.data.qaade);
  };

  useEffect(() => {
    fetchCartItems();
    fetchProducts();
  }, []);

  const getProduct = (productId) => {
    return products.find(p => p._id === productId);
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + parseFloat(item.Subtotal?.$numberDecimal || 0), 0);
  };

  const handlePlaceOrder = async () => {
    const items = cartItems.map((item, index) => ({
      ID: index + 1, // ✅ Add this line to ensure a unique ID within the order
      Product: item.Product,
      Quantity: item.Quantity,
      Price: item.Price?.$numberDecimal 
        ? parseFloat(item.Price.$numberDecimal) 
        : item.Price
    }));

    const order = {
      Customer: customer,
      Transaction: transactionId.toString(),
      Total_Amount: calculateTotal(),
      Items: items
    };

    await axios.post('http://localhost:5000/create/orders', order);
    alert('Order placed successfully!');
    navigate('/');
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-primary mb-6">Checkout</h1>
        {cartItems.map(item => {
          const product = getProduct(item.Product);
          return (
            <div key={item._id} className="flex justify-between items-center py-3 border-b">
              <div>
                <h2 className="text-lg font-semibold">{product?.name || 'Unknown Product'}</h2>
                <p>${parseFloat(item.Price?.$numberDecimal || 0).toFixed(2)} × {item.Quantity}</p>
              </div>
              <p className="font-semibold text-green-700">
                ${parseFloat(item.Subtotal?.$numberDecimal || 0).toFixed(2)}
              </p>
            </div>
          );
        })}
        <div className="text-right mt-6">
          <h3 className="text-xl font-bold text-green-700">
            Total: ${calculateTotal().toFixed(2)}
          </h3>
          <button
            onClick={handlePlaceOrder}
            className="bg-primary text-white px-6 py-2 rounded mt-4 hover:bg-blue-700"
          >
            Place Order
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
