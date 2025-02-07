import NavBar from "./components/Shared/NavBar";
import Footer from "./components/Shared/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Routes, Route } from "react-router-dom";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import UserProfile from "./pages/UserProfile";
import AddProduct from "./pages/AddProduct";
import UpdateProduct from "./pages/UpdateProduct";
import SearchResultsPage from "./pages/SearchResultsPage";
import AdminOrders from "./pages/AdminOrders";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/user" element={<UserProfile />} />
        <Route path="/products/add" element={<AddProduct />} />
        <Route path="/products/:id/update" element={<UpdateProduct />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/admin" element={<AdminOrders />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
