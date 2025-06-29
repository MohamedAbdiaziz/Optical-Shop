import { BrowserRouter, Routes, Route, Link} from "react-router-dom";
import Shop from './app/shop/shop';
import Products from './app/shop/products';
import About from './app/about';
import Contact from './app/contact';
import ManageProducts from './app/admin/manage_products.jsx';
import ManageStock from './app/admin/ManageStock.jsx';
import ManageOrders from './app/admin/ManageOrders.jsx';
import ManageUser from './app/admin/manageUsers.jsx';
import AddProduct from './app/admin/add_product.jsx';
import Login from './app/admin/AdminLogin.jsx';
import Dashboard from './app/admin/AdminDashboard.jsx';
import RequireAdminAuth from './app/admin/RequireAdminAuth.jsx';
function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public routes */}
        <Route path="/" element={<Shop />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Admin login (not inside dashboard) */}
        <Route path="/admin/login" element={<Login />} />

        {/* Admin dashboard layout */}
        <Route path="/admin" element={
          <RequireAdminAuth>
            <Dashboard />
          </RequireAdminAuth>}>
          <Route index element={<Dashboard />} /> {/* optional welcome page */}
          <Route path="products" element={<ManageProducts />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="stock" element={<ManageStock />} />
          <Route path="orders" element={<ManageOrders />} />
          <Route path="users" element={<ManageUser />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
