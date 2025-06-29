import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({ Username: '', Password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/create/login', credentials);
      if (res.data.success) {
        localStorage.setItem('adminToken', res.data.token);
        navigate('/admin/');
      } else {
        alert('Invalid login');
      }
    } catch (err) {
      console.error(err);
      alert('Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6 text-primary">Admin Login</h2>
        <input
          name="Username"
          placeholder="Username"
          value={credentials.Username}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          name="Password"
          type="password"
          placeholder="Password"
          value={credentials.Password}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-primary text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </div>
    </div>
  );
}