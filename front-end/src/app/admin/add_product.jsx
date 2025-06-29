import { useState } from 'react';
import axios from 'axios';

export default function AddProduct() {
    const [form, setForm] = useState({
        name: '',
        price: '',
        image: '',
        category: 'sunglasses',
        status: 'active',
        description: ''
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/create/addproduct',form);
            alert('Product added successfully!');
            setForm({ name: '', price: '', image: '', category: 'sunglasses', status: 'active', description: '' });
        } catch (error) {
            console.error('Error adding product:', error);
            alert('Failed to add product.');
        }
    };

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-primary">Add New Product</h2>
            <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
                <input name="name" placeholder="Product Name" value={form.name} onChange={handleChange} className="border p-2" required />
                <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} className="border p-2" required />
                <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} className="border p-2" required />
                <select name="category" value={form.category} onChange={handleChange} className="border p-2">
                    <option value="sunglasses">Sunglasses</option>
                    <option value="prescription">Prescription</option>
                </select>
                <select name="status" value={form.status} onChange={handleChange} className="border p-2">
                    <option value="active">Active</option>
                    <option value="deactive">Deactive</option>
                </select>
                <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="border p-2 col-span-2" />
                <button type="submit" className="col-span-2 bg-primary text-white p-2 rounded">Add Product</button>
            </form>
        </div>
    );
}
