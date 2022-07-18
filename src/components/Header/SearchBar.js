import Input from "./Input";

function SearchBar({ cachedProducts, Products, setProducts }) {
  return (
    <form>
      <Input
        cachedProducts={cachedProducts}
        Products={Products}
        setProducts={setProducts}
      />
    </form>
  );
}

export default SearchBar;
