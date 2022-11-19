import React from "react";
import { BrowserRouter, Link, Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Enquiry from "./pages/Enquiry";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        {/* {/* <Route path="/products" element={<Products />} /> */}
        <Route path="/enquiry" element={<Enquiry />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
