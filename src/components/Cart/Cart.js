import React from "react";
import { Link } from "react-router-dom";
import styles from "./Cart.module.css";

function Cart({ cachedLoggedUser, cachedProducts, cachedUsers }) {
  if (
    cachedLoggedUser !== null &&
    cachedProducts !== null &&
    cachedUsers !== null &&
    localStorage.getItem("carts") !== null
  ) {
    const carts = JSON.parse(localStorage.getItem("carts"));
    const filteredCarts = carts.filter((p) => p.userId === cachedLoggedUser.id);
    const products = filteredCarts.map((cart) =>
      cachedProducts.find((p) => p.id === cart.productId)
    );
    const priceArray = products.map((p) => p.price);
    const cartTotal = priceArray.reduce((prev, next) => prev + next, 0);
    return (
      <main>
        <Link to="/">
          {" "}
          <h1>Prodo</h1>{" "}
        </Link>
        <section>
          <h1>{"Cost of all items : $" + cartTotal}</h1>
          <ul className={styles.ul}>
            {products.map((product) => (
              <li className={styles.li} key={product.id}>
                <Link to={"/" + product.id.toString()}>
                  <img
                    src={product.image}
                    alt={product.title}
                    width="100px"
                    height="100px"
                  />
                </Link>
                <div className={styles.info}>
                  <h1>{"$" + product.price}</h1>
                  <Link to={"/" + product.id.toString()}>{product.title}</Link>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    );
  }

  if (
    cachedLoggedUser !== null &&
    cachedProducts !== null &&
    cachedUsers !== null &&
    localStorage.getItem("carts") === null
  ) {
    return (
      <>
        <Link to="/">
          <h1>Prodo</h1>
        </Link>
        <h1>Cart is empty add some items to it</h1>
      </>
    );
  }

  if (
    cachedLoggedUser === null ||
    cachedProducts === null ||
    cachedUsers === null
  ) {
    return (
      <Link to="/login">
        <h1>Login First</h1>
      </Link>
    );
  }
}

export default Cart;
