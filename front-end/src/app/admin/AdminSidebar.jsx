import { Link } from 'react-router-dom';
import { LayoutDashboard, Users, Box, PackageCheck, ShoppingCart } from 'lucide-react';

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-white border-r shadow h-full p-4">
      <h2 className="text-2xl font-bold text-primary mb-6">VisionCraft Admin</h2>
      <nav className="flex flex-col space-y-3">
        <Link to="/admin" className="flex items-center text-gray-700 hover:text-primary">
          <LayoutDashboard className="mr-2 w-5 h-5" /> Dashboard
        </Link>
        <Link to="/admin/users" className="flex items-center text-gray-700 hover:text-primary">
          <Users className="mr-2 w-5 h-5" /> Manage Users
        </Link>
        <Link to="/admin/products" className="flex items-center text-gray-700 hover:text-primary">
          <Box className="mr-2 w-5 h-5" /> Manage Products
        </Link>
        <Link to="/admin/stock" className="flex items-center text-gray-700 hover:text-primary">
          <PackageCheck className="mr-2 w-5 h-5" /> Manage Stock
        </Link>
        <Link to="/admin/orders" className="flex items-center text-gray-700 hover:text-primary">
          <ShoppingCart className="mr-2 w-5 h-5" /> Manage Orders
        </Link>
      </nav>
    </aside>
  );
}
