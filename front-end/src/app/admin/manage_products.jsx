
import { Edit3, Trash2 } from 'lucide-react';

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ManageProducts() {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [editForm, setEditForm] = useState({ name: '', price: '', category: '', status: '' });

    const fetchProducts = async () => {
        const res = await fetch('http://localhost:5000/create/products');
        const data = await res.json();
        setProducts(data.qaade);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const deleteProduct = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await axios.delete(`http://localhost:5000/create/deleteproduct/${id}`);
                fetchProducts(); // Refresh the product list
            } catch (error) {
                console.error('Error deleting product:', error);
                alert('Failed to delete product');
            }
        }
    };

    const openEditModal = (product) => {
        setEditingProduct(product._id);
        setEditForm({
            name: product.name,
            price: product.price,
            category: product.category,
            status: product.status
        });
    };

    const handleEditChange = (e) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value });
    };

    const submitEdit = async () => {
        await fetch(`http://localhost:5000/create/editproduct/${editingProduct}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editForm)
        });
        setEditingProduct(null);
        fetchProducts();
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-primary">Manage Products</h2>
                <a href="/admin/add-product" className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-700">+ Add Product</a>
            </div>

            <table className="min-w-full bg-white border border-gray-200 shadow">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="py-2 px-4 border">Name</th>
                        <th className="py-2 px-4 border">Price</th>
                        <th className="py-2 px-4 border">Category</th>
                        <th className="py-2 px-4 border">Status</th>
                        <th className="py-2 px-4 border">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product._id} className="hover:bg-gray-50">
                            <td className="py-2 px-4 border">{product.name}</td>
                            <td className="py-2 px-4 border">${product.price}</td>
                            <td className="py-2 px-4 border">{product.category}</td>
                            <td className="py-2 px-4 border">{product.status}</td>
                            <td className="py-2 px-4 border">
                                
                                <button  onClick={() => openEditModal(product)}  className="text-blue-500 hover:text-blue-700 mr-2">
                                  <Edit3 size={16} />
                                </button>
                                <button onClick={() => deleteProduct(product._id)} className="text-red-500 hover:text-red-700">
                                  <Trash2 size={16} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {editingProduct && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4">Edit Product</h3>
                        <input name="name" value={editForm.name} onChange={handleEditChange} className="w-full mb-2 p-2 border rounded" placeholder="Name" />
                        <input name="price" value={editForm.price} onChange={handleEditChange} type="number" className="w-full mb-2 p-2 border rounded" placeholder="Price" />
                        <select name="category" value={editForm.category} onChange={handleEditChange} className="w-full mb-2 p-2 border rounded">
                            <option value="sunglasses">Sunglasses</option>
                            <option value="prescription">Prescription</option>
                        </select>
                        <select name="status" value={editForm.status} onChange={handleEditChange} className="w-full mb-4 p-2 border rounded">
                            <option value="active">Active</option>
                            <option value="deactive">Deactive</option>
                        </select>
                        <div className="flex justify-end space-x-2">
                            <button onClick={() => setEditingProduct(null)} className="px-4 py-2 rounded bg-gray-300">Cancel</button>
                            <button onClick={submitEdit} className="px-4 py-2 rounded bg-primary text-white">Save</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
