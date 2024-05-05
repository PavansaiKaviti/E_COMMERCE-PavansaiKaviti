import React from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Homepage from "./pages/Home/Homepage";
import { Routes, Route } from "react-router-dom";
import Productpage from "./pages/Productpage/Productpage";
import CartPage from "./pages/cart/CartPage";
import Login from "./pages/login/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegisterForm from "./pages/Register/RegisterForm";
import ShippingPage from "./pages/shipping/ShippingPage";
import Private from "./Components/PrivateRoute/Private";
import PaymentScreen from "./pages/payment/PaymentScreen";
import Order from "./pages/Oder/Order";
import FinalOrder from "./pages/finalOrder/FinalOrder";
import Profile from "./pages/profile/Profile";
import AdminRoute from "./Components/private/AdminRoute.jsx";
import OdersList from "./pages/oderslist/OrdersList.jsx";
import ProductList from "./pages/productlist/ProductList.jsx";
import Postcreate from "./pages/CreatePost/Postcreate.jsx";
import Postupdate from "./pages/UpdatePost/Postupdate.jsx";
import Userlist from "./pages/userlist/Userlist.jsx";
import AdminUserupdate from "./pages/adminUpdateusers/AdminUserupdate.jsx";
import CommentEdit from "./pages/commentedit/CommentEdit.jsx";
const App = () => {
  return (
    <div>
      <Header />
      <main className="px-5 py-3">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/search/:keyword" element={<Homepage />} />
          <Route path="/page/:pageNumber" element={<Homepage />} />
          <Route
            path="/search/:keyword/page/:pageNumber"
            element={<Homepage />}
          />
          <Route path="/product/:id" element={<Productpage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="" element={<Private />}>
            <Route path="/shipping" element={<ShippingPage />} />
            <Route path="/payment" element={<PaymentScreen />} />
            <Route path="/placeorder" element={<Order />} />
            <Route path="/order/:id" element={<FinalOrder />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/reviewEdit/:id" element={<CommentEdit />} />
          </Route>
          <Route path="" element={<AdminRoute />}>
            <Route path="/admin/orderlist" element={<OdersList />} />
            <Route path="/admin/productlist" element={<ProductList />} />
            <Route
              path="/admin/productlist/:pageNumber"
              element={<ProductList />}
            />
            <Route path="/admin/CreatePost" element={<Postcreate />} />
            <Route path="/admin/products/:id/edit" element={<Postupdate />} />
            <Route path="/admin/userlist" element={<Userlist />} />
            <Route path="/admin/userEdit/:id" element={<AdminUserupdate />} />
          </Route>
        </Routes>
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default App;
