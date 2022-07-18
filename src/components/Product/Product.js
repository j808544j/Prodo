import { useParams, Link } from "react-router-dom";
import styles from "./Product.module.css";

function Product({ cachedProducts }) {
  const param = useParams();

  if (cachedProducts !== null) {
    return (
      <main>
        <Link to="/">
          <h1>Prodo</h1>{" "}
        </Link>
        <section className={styles.main}>
          <img
            className={styles.image}
            src={
              cachedProducts.find(
                (prod) => prod.id === parseInt(param.productId)
              ).image
            }
            alt={
              cachedProducts.find(
                (prod) => prod.id === parseInt(param.productId)
              ).title
            }
            width="400px"
            height="400px"
          />

          <article className={styles.article}>
            <h1 className={styles.text}>
              {" $" +
                cachedProducts.find(
                  (prod) => prod.id === parseInt(param.productId)
                ).price}
            </h1>
            <h1 className={styles.text}>
              {
                cachedProducts.find(
                  (prod) => prod.id === parseInt(param.productId)
                ).rating.rate
              }
              {"(" +
                cachedProducts.find(
                  (prod) => prod.id === parseInt(param.productId)
                ).rating.count +
                ")"}
            </h1>
            <h3 className={styles.text}>
              {
                cachedProducts.find(
                  (prod) => prod.id === parseInt(param.productId)
                ).title
              }
            </h3>
            <p style={{ margin: "30px" }}>
              {
                cachedProducts.find(
                  (prod) => prod.id === parseInt(param.productId)
                ).description
              }
            </p>
          </article>
        </section>
      </main>
    );
  }
}

export default Product;
