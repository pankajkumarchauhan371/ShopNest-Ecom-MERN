import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ReturnPolicy from './pages/ReturnPolicy';
import Disclaimer from './pages/Disclaimer';
import About from './pages/About';
import Register from './pages/Register';
import Login from './pages/Login';
import ProductDetail from './pages/ProductDetail'
import Shop from './pages/Shop';
import Cart from './pages/Cart'
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Profile from './pages/Profile';
import AdminDashboard from './admin/AdminDashboard';
import AddProduct from './admin/AddProduct';
import AdminProducts from './admin/AdminProducts';
import EditProduct from './admin/EditProduct';
import AdminOrders from './admin/AdminOrders';
import AdminUsers from './admin/AdminUsers';


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/return" element={<ReturnPolicy />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/ordersuccess" element={<OrderSuccess />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/add-product" element={<AddProduct />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/edit-product/:id" element={<EditProduct />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/users" element={<AdminUsers />} />

      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App