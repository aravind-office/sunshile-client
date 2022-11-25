import React from "react";
import { BrowserRouter, Link, Route, Routes, Navigate } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Login from "./pages/admin/Login";
import Enquiry from "./pages/Enquiry";
import EnquiryForm from "./pages/EnquiryForm";

import Home from "./pages/Home";
import SubCategories from "./pages/SubCategories";

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<SubCategories />} />
        <Route path="/enquiry-form/:categoryId" element={<EnquiryForm />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/enquiry" element={<Enquiry />} />
        {/* admin login
        add product
        delete 
        update product 
        add sub product 
        Enquiry  */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default Router;
