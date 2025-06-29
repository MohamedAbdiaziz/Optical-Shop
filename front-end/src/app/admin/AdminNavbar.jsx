export default function AdminNavbar() {
  return (
    <header className="bg-white shadow px-4 py-3 flex items-center justify-between">
      <h1 className="text-xl font-bold text-primary">Admin Dashboard</h1>
      <button
        className="text-sm bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
        onClick={() => {
          localStorage.removeItem('adminToken');
          window.location.href = '/admin/login';
        }}
      >
        Logout
      </button>
    </header>
  );
}
