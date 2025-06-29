import { useEffect, useState } from 'react';
import axios from 'axios';
import { Pencil, Trash2, Plus } from 'lucide-react';

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [newUser, setNewUser] = useState({
    Username: '',
    Password: '',
    Email: '',
    Role: 'admin',
    Status: 'active',
    Mobile: '',
    Address: ''
  });
  const [showAddModal, setShowAddModal] = useState(false);

  const fetchUsers = async () => {
    const res = await axios.get('http://localhost:5000/create/users');
    setUsers(res.data.qaade);
  };

  const handleEdit = async () => {
    await axios.put(`http://localhost:5000/create/edituser/${editUser._id}`, editUser);
    setEditUser(null);
    fetchUsers();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure to delete this user?')) {
      await axios.delete(`http://localhost:5000/create/deleteuser/${id}`);
      fetchUsers();
    }
  };

  const handleAdd = async () => {
    await axios.post(`http://localhost:5000/create/adduser`, newUser);
    setShowAddModal(false);
    setNewUser({ Username: '', Password: '', Email: '', Role: 'user', Status: 'active', Mobile: '', Address: '' });
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-primary">Manage Users</h2>
        <button onClick={() => setShowAddModal(true)} className="flex items-center bg-primary text-white px-4 py-2 rounded hover:bg-blue-700">
          <Plus className="mr-2 w-4 h-4" /> Add User
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border">Username</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Role</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Mobile</th>
              <th className="py-2 px-4 border">Address</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border">{user.Username}</td>
                <td className="py-2 px-4 border">{user.Email}</td>
                <td className="py-2 px-4 border">{user.Role}</td>
                <td className="py-2 px-4 border">{user.Status}</td>
                <td className="py-2 px-4 border">{user.Mobile}</td>
                <td className="py-2 px-4 border">{user.Address}</td>
                <td className="py-2 px-4 border space-x-2">
                  <button onClick={() => setEditUser(user)} className="text-green-600 hover:text-green-800">
                    <Pencil className="inline-block w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(user._id)} className="text-red-600 hover:text-red-800">
                    <Trash2 className="inline-block w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md relative">
            <button onClick={() => setEditUser(null)} className="absolute top-2 right-2 text-gray-500 hover:text-black">✖</button>
            <h3 className="text-xl font-bold mb-4 text-primary">Edit User</h3>
            <input className="w-full mb-2 p-2 border rounded" value={editUser.Username} onChange={e => setEditUser({ ...editUser, Username: e.target.value })} />
            <input className="w-full mb-2 p-2 border rounded" value={editUser.Email} onChange={e => setEditUser({ ...editUser, Email: e.target.value })} />
            <input className="w-full mb-2 p-2 border rounded" value={editUser.Role} onChange={e => setEditUser({ ...editUser, Role: e.target.value })} />
            <select className="w-full mb-2 p-2 border rounded" value={editUser.Status} onChange={e => setEditUser({ ...editUser, Status: e.target.value })}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <input className="w-full mb-2 p-2 border rounded" value={editUser.Mobile} onChange={e => setEditUser({ ...editUser, Mobile: e.target.value })} />
            <input className="w-full mb-2 p-2 border rounded" value={editUser.Address} onChange={e => setEditUser({ ...editUser, Address: e.target.value })} />
            <button onClick={handleEdit} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Update</button>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md relative">
            <button onClick={() => setShowAddModal(false)} className="absolute top-2 right-2 text-gray-500 hover:text-black">✖</button>
            <h3 className="text-xl font-bold mb-4 text-primary">Add User</h3>
            <input className="w-full mb-2 p-2 border rounded" placeholder="Username" value={newUser.Username} onChange={e => setNewUser({ ...newUser, Username: e.target.value })} />
            <input className="w-full mb-2 p-2 border rounded" placeholder="Password" value={newUser.Password} onChange={e => setNewUser({ ...newUser, Password: e.target.value })} type="password" />
            <input className="w-full mb-2 p-2 border rounded" placeholder="Email" value={newUser.Email} onChange={e => setNewUser({ ...newUser, Email: e.target.value })} />
            <input className="w-full mb-2 p-2 border rounded" placeholder="Mobile" value={newUser.Mobile} onChange={e => setNewUser({ ...newUser, Mobile: e.target.value })} />
            <input className="w-full mb-2 p-2 border rounded" placeholder="Address" value={newUser.Address} onChange={e => setNewUser({ ...newUser, Address: e.target.value })} />
            <button onClick={handleAdd} className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-700">Add User</button>
          </div>
        </div>
      )}
    </div>
  );
}