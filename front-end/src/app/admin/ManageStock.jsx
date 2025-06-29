import { useEffect, useState } from 'react';
import axios from 'axios';
import { Edit3, Trash2, PlusCircle } from 'lucide-react';

export default function ManageStock() {
  const [stock, setStock] = useState([]);
  const [products, setProducts] = useState([]);
  
  const [editingItem, setEditingItem] = useState(null);
  const [editForm, setEditForm] = useState({ Quantity: '', Status: '' });
  
  const [adding, setAdding] = useState(false);
  const [addForm, setAddForm] = useState({ Product: '', Quantity: '', Status: 'Available' });

  const fetchStock = async () => {
    try {
      const res = await axios.get('http://localhost:5000/create/stock');
      setStock(res.data.qaade);
    } catch (err) {
      console.error('Failed to load stock:', err);
      alert('connection failed');
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/create/products');
      setProducts(res.data.qaade);
    } catch (err) {
      console.error('Failed to load products:', err);
      alert('connection failed');
    }
  };

  useEffect(() => {
    fetchStock();
    fetchProducts();
  }, []);

  const getProductName = (id) => {
    const product = products.find(p => p._id === id);
    return product ? product.name : 'Unknown Product';
  };

  // Edit handlers
  const openEditModal = (item) => {
    setEditingItem(item._id);
    setEditForm({ Quantity: item.Quantity, Status: item.Status });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const submitEdit = async () => {
    try {
      await axios.put(`http://localhost:5000/create/editstock/${editingItem}`, editForm);
      setEditingItem(null);
      fetchStock();
    } catch (error) {
      console.error('Failed to update stock:', error);
      alert('Failed to update stock');
    }
  };

  const deleteStock = async (id) => {
    if (window.confirm('Are you sure you want to delete this stock item?')) {
      try {
        await axios.delete(`http://localhost:5000/create/deletestock/${id}`);
        fetchStock();
      } catch (error) {
        console.error('Failed to delete stock:', error);
        alert('Failed to delete stock');
      }
    }
  };

  // Add handlers
  const openAddModal = () => {
    setAddForm({ Product: '', Quantity: '', Status: 'Available' });
    setAdding(true);
  };

  const handleAddChange = (e) => {
    setAddForm({ ...addForm, [e.target.name]: e.target.value });
  };

    const submitAdd = async () => {
      if (!addForm.Product || !addForm.Quantity) {
        alert('Please fill in all required fields');
        return;
      }

      // Check if product already exists in stock
      const exists = stock.some(item => item.Product === addForm.Product);
      if (exists) {
        alert('This product is already added in stock!');
        return;
      }

      try {
        await axios.post('http://localhost:5000/create/addstock', {
          Product: addForm.Product,
          Quantity: Number(addForm.Quantity),
          Status: addForm.Status
        });
        setAdding(false);
        fetchStock();
      } catch (error) {
        console.error('Failed to add stock:', error);
        alert('Failed to add stock');
      }
    };
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-primary">Manage Stock</h2>
        <button
          onClick={openAddModal}
          className="flex items-center bg-primary text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          <PlusCircle size={20} className="mr-2" />
          Add Stock
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border">Product Name</th>
              <th className="py-2 px-4 border">Quantity</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {stock.map(item => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border">{getProductName(item.Product)}</td>
                <td className="py-2 px-4 border">{item.Quantity}</td>
                <td className="py-2 px-4 border">{item.Status}</td>
                <td className="py-2 px-4 border flex space-x-2">
                  <button onClick={() => openEditModal(item)} className="text-blue-500 hover:text-blue-700">
                    <Edit3 size={18} />
                  </button>
                  <button onClick={() => deleteStock(item._id)} className="text-red-500 hover:text-red-700">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Edit Stock</h3>
            <label className="block mb-2 font-semibold">Quantity</label>
            <input
              type="number"
              name="Quantity"
              value={editForm.Quantity}
              onChange={handleEditChange}
              className="w-full mb-4 p-2 border rounded"
            />
            <label className="block mb-2 font-semibold">Status</label>
            <select
              name="Status"
              value={editForm.Status}
              onChange={handleEditChange}
              className="w-full mb-4 p-2 border rounded"
            >
              <option value="Available">Available</option>
              <option value="Out of Stock">Out of Stock</option>
              <option value="Discontinued">Discontinued</option>
            </select>
            <div className="flex justify-end space-x-2">
              <button onClick={() => setEditingItem(null)} className="px-4 py-2 rounded bg-gray-300">
                Cancel
              </button>
              <button onClick={submitEdit} className="px-4 py-2 rounded bg-primary text-white">
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {adding && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Add Stock</h3>
            
            <label className="block mb-2 font-semibold">Product</label>
            <select
              name="Product"
              value={addForm.Product}
              onChange={handleAddChange}
              className="w-full mb-4 p-2 border rounded"
            >
              <option value="">Select a product</option>
              {products.map(p => (
                <option key={p._id} value={p._id}>{p.name}</option>
              ))}
            </select>

            <label className="block mb-2 font-semibold">Quantity</label>
            <input
              type="number"
              name="Quantity"
              value={addForm.Quantity}
              onChange={handleAddChange}
              className="w-full mb-4 p-2 border rounded"
              min={0}
            />

            <label className="block mb-2 font-semibold">Status</label>
            <select
              name="Status"
              value={addForm.Status}
              onChange={handleAddChange}
              className="w-full mb-4 p-2 border rounded"
            >
              <option value="Available">Available</option>
              <option value="Out of Stock">Out of Stock</option>
              <option value="Discontinued">Discontinued</option>
            </select>

            <div className="flex justify-end space-x-2">
              <button onClick={() => setAdding(false)} className="px-4 py-2 rounded bg-gray-300">
                Cancel
              </button>
              <button onClick={submitAdd} className="px-4 py-2 rounded bg-primary text-white">
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
