import { useState } from 'react';
import axios from 'axios';
import { useNavigate , Link} from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({
    Username: '', Password: '', Email: '', Mobile: '', Address: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/create/register-customer', form);
      localStorage.setItem('customer', JSON.stringify(res.data.user));
      alert('Registration successful');
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 border p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Customer Registration</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="Username" placeholder="Full Name" onChange={handleChange} required className="w-full border px-4 py-2 rounded" />
        <input name="Email" type="email" placeholder="Email" onChange={handleChange} required className="w-full border px-4 py-2 rounded" />
        <input name="Password" type="password" placeholder="Password" onChange={handleChange} required className="w-full border px-4 py-2 rounded" />
        <input name="Mobile" placeholder="Mobile" onChange={handleChange} required className="w-full border px-4 py-2 rounded" />
        <input name="Address" placeholder="Address" onChange={handleChange} required className="w-full border px-4 py-2 rounded" />
        <button className="w-full bg-primary text-white py-2 rounded hover:bg-blue-700">Register</button>
        <p className="text-sm text-center mt-2">
          I have an account{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}
