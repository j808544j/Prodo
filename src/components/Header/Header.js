import UserIcon from "./UserIcon";
import CartIcon from "./CartIcon";
import SearchBar from "./SearchBar";

function Header({ cachedProducts, setProducts }) {
  return (
    <header>
      <SearchBar cachedProducts={cachedProducts} setProducts={setProducts} />
      <UserIcon />
      <CartIcon />
    </header>
  );
}

export default Header;
