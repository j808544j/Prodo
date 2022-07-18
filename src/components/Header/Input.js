import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

function Input({ cachedProducts, setProducts }) {
  const [searchResults, setSearchResults] = useState(null);
  const searchBar = useRef(null);

  function handleInputChange(event) {
    if (cachedProducts !== null) {
      if (event.target.value.length > 0) {
        setSearchResults(
          cachedProducts.filter(
            (product) =>
              product.description
                .toLowerCase()
                .includes(event.target.value.toLowerCase()) ||
              product.title
                .toLowerCase()
                .includes(event.target.value.toLowerCase()) ||
              product.category
                .toLowerCase()
                .includes(event.target.value.toLowerCase())
          )
        );
      }
    }
  }

  function handleSearch(event) {
    if (event.target.id === "searchIcon") {
      setProducts(searchResults);
    }
    if (event.key === "Enter") {
      setProducts(searchResults);
      event.preventDefault();
    }
  }

  function clearSearchItems(event) {
    setSearchResults(null);
    if (searchBar.current !== null) {
      searchBar.current.value = null;
    }
  }

  if (searchResults !== null) {
    return (
      <>
        <input
          className={styles.searchInput}
          placeholder="Search a Product"
          onChange={handleInputChange}
          onKeyDown={handleSearch}
          ref={searchBar}
        />
        <svg
          id="close"
          onClick={clearSearchItems}
          width="32"
          height="32"
          viewBox="0 0 16 16"
          fill="gray"
        >
          <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
        </svg>
        <svg
          onClick={handleSearch}
          id="searchIcon"
          width="32"
          height="32"
          viewBox="0 0 20 16"
          fill="gray"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
        </svg>
        <ul className={styles.ulSearchResults}>
          {searchResults.map((resultItem, index) => {
            if (index < 10) {
              return (
                <Link to={resultItem.id.toString()} key={resultItem.title}>
                  <li
                    className={styles.liSearchResultsItem}
                    key={resultItem.title}
                  >
                    {resultItem.title}
                  </li>
                </Link>
              );
            }
            return null;
          })}
        </ul>
      </>
    );
  }

  return (
    <>
      <input
        className={styles.searchInput}
        placeholder="Search a Product"
        onChange={handleInputChange}
        onKeyDown={handleSearch}
      />
    </>
  );
}

export default Input;
