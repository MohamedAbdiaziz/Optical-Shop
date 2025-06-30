import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './navbar/navbar';
import Footer from './footer/footer';

export default function Profile() {
  const [customer, setCustomer] = useState(null);
  const [orders, setOrders] = useState([]);
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('customer'));
    setCustomer(stored);

    if (stored) {
      fetchOrders(stored.email);
    }
  }, []);

  const fetchOrders = async (email) => {
    const res = await axios.get(`http://localhost:5000/create/orders`);
    const myOrders = res.data.qaade.filter(o => o.Customer === email);
    setOrders(myOrders);
  };

  const handlePasswordChange = async () => {
    if (!newPassword) return alert("Enter new password");

    try {
      await axios.put(`http://localhost:5000/create/update-password`, {
        Email: customer.email,
        Password: newPassword
      });
      alert("Password updated");
      setNewPassword('');
    } catch (err) {
      alert("Error updating password");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">My Profile</h1>

        {customer && (
          <div className="mb-6 space-y-2">
            <p><strong>Name:</strong> {customer.name}</p>
            <p><strong>Email:</strong> {customer.email}</p>
          </div>
        )}

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Change Password</h2>
          <div className="flex gap-2">
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              className="border px-4 py-2 rounded w-full"
            />
            <button
              onClick={handlePasswordChange}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Update
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">My Orders</h2>
          {orders.length === 0 ? (
            <p className="text-gray-500">No orders found.</p>
          ) : (
            <ul className="space-y-4">
              {orders.map((order) => (
                <li key={order._id} className="border p-4 rounded shadow">
                  <p><strong>Transaction:</strong> {order.Transaction}</p>
                  <p><strong>Status:</strong> {order.Status}</p>
                  <p><strong>Total:</strong> ${parseFloat(order.Total_Amount?.$numberDecimal || 0).toFixed(2)}</p>
                  <ul className="ml-4 mt-2 list-disc text-sm">
                    {order.Items.map((item, idx) => (
                      <li key={idx}>
                        {item.Product} × {item.Quantity}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
