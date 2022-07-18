import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Cart from "./components/Cart/Cart";
import Header from "./components/Header/Header";
import MainSection from "./components/MainSection/MainSection";
import Filter from "./components/Filter/Filter";
import Product from "./components/Product/Product";
import "./App.module.css";

function App(props) {
  const [Products, setProducts] = useState(null);

  const cachedProducts = JSON.parse(localStorage.getItem("products"));
  const cachedLoggedUser = JSON.parse(localStorage.getItem("loggedUser"));
  const cachedUsers = JSON.parse(localStorage.getItem("users"));
  const cachedCategories = JSON.parse(localStorage.getItem("categories"));

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        setProducts(json);
        localStorage.setItem("products", JSON.stringify(json));
      });
  }, []);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((json) => {
        localStorage.setItem("categories", JSON.stringify(json));
      });
  }, []);

  useEffect(() => {
    fetch("https://fakestoreapi.com/users")
      .then((res) => res.json())
      .then((json) => localStorage.setItem("users", JSON.stringify(json)));
  }, []);

  function Home() {
    return (
      <>
        <Header
          cachedProducts={cachedProducts}
          Products={Products}
          setProducts={setProducts}
        />
        <Filter
          Products={Products}
          setProducts={setProducts}
          cachedProducts={cachedProducts}
          cachedCategories={cachedCategories}
        />
        <MainSection Products={Products} cachedLoggedUser={cachedLoggedUser} />
      </>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/:productId"
          element={<Product cachedProducts={cachedProducts} />}
        />
        <Route
          path="login"
          element={
            <Login
              cachedUsers={cachedUsers}
              cachedLoggedUser={cachedLoggedUser}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart
              cachedLoggedUser={cachedLoggedUser}
              cachedProducts={cachedProducts}
              cachedUsers={cachedUsers}
            />
          }
        />
        <Route path="*" element={<p>Error 404</p>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
