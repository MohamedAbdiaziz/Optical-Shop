import { useEffect, useState } from 'react';
import axios from 'axios';
import { Eye, Pencil } from 'lucide-react';

export default function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editOrder, setEditOrder] = useState(null);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:5000/create/orders');
      setOrders(res.data.qaade);
    } catch (err) {
      console.error('Failed to load orders:', err);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/create/products');
      setProducts(res.data.qaade);
    } catch (err) {
      console.error('Failed to load products:', err);
    }
  };

  const getProductName = (id) => {
    const product = products.find(p => p._id === id);
    return product ? product.name : id;
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/create/editorder/${editOrder._id}`, editOrder);
      setEditOrder(null);
      fetchOrders();
    } catch (err) {
      console.error('Update failed:', err);
      alert('Failed to update order');
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-primary">Manage Orders</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border">Customer</th>
              <th className="py-2 px-4 border">Transaction</th>
              <th className="py-2 px-4 border">Order Date</th>
              <th className="py-2 px-4 border">Total</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border">{order.Customer}</td>
                <td className="py-2 px-4 border">{order.Transaction}</td>
                <td className="py-2 px-4 border">{new Date(order.Order_Date).toLocaleDateString()}</td>
                <td className="py-2 px-4 border">${order.Total_Amount ? parseFloat(order.Total_Amount?.$numberDecimal || 0).toFixed(2) : '0.00'}</td>
                <td className="py-2 px-4 border">{order.Status}</td>
                <td className="py-2 px-4 border space-x-2">
                  <button onClick={() => setSelectedOrder(order)} className="text-blue-600 hover:text-blue-800">
                    <Eye className="inline-block w-5 h-5" />
                  </button>
                  <button onClick={() => setEditOrder(order)} className="text-green-600 hover:text-green-800">
                    <Pencil className="inline-block w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal to show items */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md relative">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              ✖
            </button>
            <h3 className="text-xl font-bold mb-4 text-primary">Order Items</h3>
            <ul className="list-disc pl-6">
              {selectedOrder.Items.map((item, index) => (
                <li key={index} className="mb-2">
                  {getProductName(item.Product)} (#{item.ID}) - Quantity: {item.Quantity}, Price: ${parseFloat(item.Price?.$numberDecimal || 0).toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Modal to edit order */}
      {editOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md relative">
            <button
              onClick={() => setEditOrder(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              ✖
            </button>
            <h3 className="text-xl font-bold mb-4 text-primary">Edit Order Status</h3>
            <label className="block mb-2">Status:</label>
            <select
              value={editOrder.Status}
              onChange={e => setEditOrder({ ...editOrder, Status: e.target.value })}
              className="w-full p-2 border rounded mb-4"
            >
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <button
              onClick={handleUpdate}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Update Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
