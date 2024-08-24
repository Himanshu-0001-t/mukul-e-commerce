import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './components/Product';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Header from './components/header';
import NotFound from './pages/NotFound';
import Footer from './components/footer';
import UserAccountPage from './pages/Account';
import Signup from './pages/SignUp';
import Signin from './pages/SignIn';
import ContactUs from './pages/ContactUs';
import OrderSuccess from './pages/orderSuccess';
import { AuthProvider } from "./context/AuthContext.jsx";
import PrivateRoute from './components/protectdRoute';


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/cart"
            element={
              <PrivateRoute>
                <Cart />
              </PrivateRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <PrivateRoute>
                <Checkout />
              </PrivateRoute>
            }
          />
          <Route
            path="/account"
            element={
              <PrivateRoute>
                <UserAccountPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/order-placed"
            element={
              <PrivateRoute>
                <OrderSuccess />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;
