import { Link } from "react-router-dom";
import { List } from "immutable";
import styles from "./MainSection.module.css";

function MainSection({ Products, cachedLoggedUser }) {
  function handleClick(event) {
    if (cachedLoggedUser !== null) {
      if (localStorage.getItem("carts") === null) {
        localStorage.setItem(
          "carts",
          JSON.stringify(
            List().push({
              userId: cachedLoggedUser.id,
              productId: parseInt(event.currentTarget.id),
              quantity: 1,
            })
          )
        );
        alert("added to cart");
      } else {
        const cartList = JSON.parse(localStorage.getItem("carts"));
        const isPresent = cartList.find(
          (cart) =>
            cart.productId === parseInt(event.currentTarget.id) &&
            cart.userId === cachedLoggedUser.id
        );
        if (isPresent === undefined) {
          cartList.push({
            userId: cachedLoggedUser.id,
            productId: parseInt(event.currentTarget.id),
            quantity: 1,
          });
          localStorage.setItem("carts", JSON.stringify(cartList));
          alert("added to cart");
        }
        if (isPresent) {
          alert("already present in cart");
        }
      }
    } else {
      alert("login first");
    }
  }

  if (Products === null || Products.length === 0) {
    return Products === null
      ? "click Enter or search icon after typing keyword in search box"
      : "Could not find any Product with that keyword";
  }

  return (
    <ul className={styles.productList}>
      {Products.map((Product) => (
        <li className={styles.productCard} key={Product.id}>
          <Link to={Product.id.toString()}>
            <img
              className={styles.productImage}
              src={Product.image}
              alt={Product.title}
              width="150px"
              height="150px"
            />
          </Link>
          <div className={styles.container}>
            <span className={styles.productPrice}>
              {"$" + Product.price + " "}
            </span>
            <span>
              <svg
                id={Product.id}
                width="32"
                height="32"
                viewBox="0 0 20 16"
                fill="gray"
                onClick={handleClick}
              >
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
              </svg>
            </span>
            <span className={styles.productRating}>
              {" " + Product.rating.rate}
              {"(" + Product.rating.count + ")"}
            </span>
          </div>
          <Link to={Product.id.toString()}>
            <p className={styles.productTitle}>{Product.title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default MainSection;
