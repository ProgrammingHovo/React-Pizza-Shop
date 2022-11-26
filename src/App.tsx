import React from "react";
import "./scss/app.scss";
import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import FullPizza from "./pages/FullPizza";
import Home from "./pages/Home";
import CartEmpty from "./pages/Cart";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="pizza/:id" element={<FullPizza />} />
        <Route path="cart" element={<CartEmpty />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
