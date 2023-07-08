import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import LoginForm from './pages/login/LoginForm';
import RegisterForm from './pages/registro/RegisterForm';
import NotFound from './pages/notFound';
import Checkout from './pages/checkout/Checkout';
import CustomerProducts from './pages/products/CustomerProducts';
import CustomerOrders from './pages/products/CustomerOrders';
import CustomOrdersDetails from './pages/products/CustomerOrdersDetails';
import SellerOrders from './pages/sellerOrders/SellerOrders';
import SellerOrdersDetails from './pages/sellerOrdersDetails/SellerOrdersDetails';

function App() {
  return (
    <BrowserRouter basename={ process.env.PUBLIC_URL }>
      <main className="main">
        <Routes>
          <Route exact path="/login" element={ <LoginForm /> } />
          <Route exact path="/register" element={ <RegisterForm /> } />
          <Route exact path="/customer/products" element={ <CustomerProducts /> } />
          <Route exact path="/customer/checkout" element={ <Checkout /> } />
          <Route exact path="/customer/orders" element={ <CustomerOrders /> } />
          <Route exact path="/customer/orders/:id" element={ <CustomOrdersDetails /> } />
          <Route exact path="/seller/orders" element={ <SellerOrders /> } />
          <Route exact path="/seller/orders/:id" element={ <SellerOrdersDetails /> } />
          <Route exact path="/admin/manage" element={ <NotFound /> } />
          <Route exact path="/" element={ <Navigate to="/login" /> } />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
