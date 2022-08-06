import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Keyword from "./pages/Keyword";
import MarketPlace from "./pages/MarketPlace";
import Occasion from "./pages/Occasion";
import Price from "./pages/Price";
import Product from "./pages/Product";
import Recommendations from "./pages/Recommendations";
import SavedProfile from "./pages/SavedProfile";
import Who from "./pages/Who";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Who />}></Route>
        <Route path="/who" element={<Who />}></Route>
        <Route path="/occasion" element={<Occasion />}></Route>
        <Route path="/keyword" element={<Keyword />}></Route>
        <Route path="/price" element={<Price rtl={false} />}></Route>
        <Route path="/profile" element={<SavedProfile />}></Route>
        <Route path="/rec" element={<Recommendations />}></Route>
        <Route path="/market" element={<MarketPlace />}></Route>
        <Route path="/product" element={<Product />}></Route>
        <Route path="/product/:id" element={<Product />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
