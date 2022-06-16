import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Keyword from "./pages/Keyword";
import Occasion from "./pages/Occasion";
import Price from "./pages/Price";
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
      </Routes>
    </BrowserRouter>
  );
}
