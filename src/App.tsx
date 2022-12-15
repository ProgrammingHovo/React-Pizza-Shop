import React, { Suspense } from "react";
import "./scss/app.scss";
import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";

const Cart = React.lazy(
  () => import(/* webpackChunkName: "Cart"*/ "../src/pages/Cart")
);
const FullPizza = React.lazy(
  () => import(/* webpackChunkName: "FullPizza"*/ "../src/pages/FullPizza")
);
const NotFound = React.lazy(
  () => import(/* webpackChunkName: "NotFound"*/ "../src/pages/NotFound")
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />

        <Route
          path="pizza/:id"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <FullPizza />
            </Suspense>
          }
        />
        <Route
          path="cart"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
