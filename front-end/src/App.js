import { BrowserRouter, Routes, Route, Link} from "react-router-dom";
import Shop from './app/shop/shop'
import Products from './app/shop/products'
import About from './app/about'
import Contact from './app/contact'
function App() {
  return (
     <BrowserRouter>
      
        {/* Page Content */}
        
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          

        </Routes>
        
        
    </BrowserRouter> 
  );
}

export default App;
