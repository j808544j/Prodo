import { useState } from "react";
import styles from "./Filter.module.css";

export default function Filter({
  setProducts,
  cachedProducts,
  cachedCategories,
}) {
  const prices = [10, 50, 100, 500];
  const ratings = [1, 2, 3, 4, 5];

  const [filterState, setFilterState] = useState({
    category: "",
    price: 0,
    rate: 0,
  });

  function handleFilter(event) {
    if (event.target.name === "select a category") {
      setFilterState({ ...filterState, category: event.target.value });
    }
    if (event.target.name === "select a price") {
      setFilterState({ ...filterState, price: event.target.value });
    }
    if (event.target.name === "select a rating") {
      setFilterState({ ...filterState, rate: event.target.value });
    }
  }

  function applyFilter() {
    if (cachedProducts !== null) {
      if (filterState.category === "") {
        setProducts(
          cachedProducts.filter(
            (product) =>
              product.price >= filterState.price &&
              product.rating.rate >= filterState.rate
          )
        );
      } else {
        setProducts(
          cachedProducts.filter(
            (product) =>
              product.category === filterState.category &&
              product.price >= filterState.price &&
              product.rating.rate >= filterState.rate
          )
        );
      }
    }
  }

  if (cachedCategories !== null) {
    return (
      <aside className={styles.sideBarVisible}>
        <ul className={styles.ulFilter}>
          <li key="category">
            <select name="select a category" onChange={handleFilter}>
              <option key="all categories" value="">
                all categories
              </option>
              {cachedCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </li>
          <li key="select a price">
            <select name="select a price" onChange={handleFilter}>
              <option key="select a price" value={0}>
                all prices
              </option>
              {prices.map((price) => (
                <option key={price} value={price}>
                  {price}
                </option>
              ))}
            </select>
          </li>
          <li key="select a rating">
            <select name="select a rating" onChange={handleFilter}>
              <option key={"select a rating"} value={0}>
                all ratings
              </option>
              {ratings.map((rating) => (
                <option key={rating} value={rating}>
                  {rating}
                </option>
              ))}
            </select>
          </li>
          <li key="apply Filter Button">
            <button className={styles.button} onClick={applyFilter}>
              apply
            </button>
          </li>
        </ul>
      </aside>
    );
  }
  return null;
}
