import React from "react";
import { Link, Route, Routes, Navigate, HashRouter } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Login from "./pages/admin/Login";
import Enquiry from "./pages/Enquiry";
import EnquiryForm from "./pages/EnquiryForm";

import Home from "./pages/Home";
import SubCategories from "./pages/SubCategories";

function Router() {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<SubCategories />} />
        <Route path="/enquiry-form/:categoryId" element={<EnquiryForm />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/enquiry" element={<Enquiry />} />
      </Routes>
      <Footer />
    </HashRouter>
  );
}

export default Router;
