import React from "react";
import ReactDOM from "react-dom/client";
import LoginPage from "./views/Login/LoginPage";
import Home from "./views/Home/Home";
import Checkout from "./views/Checkout/Checkout";
import Profile from "./views/Profile/Profile"
import Admin from "./views/Admin/Admin";

import { BrowserRouter, Routes, Route } from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="profile" element={<Profile />} />
        <Route path="admin" element={<Admin />} />



      </Routes>
    </BrowserRouter>
);
