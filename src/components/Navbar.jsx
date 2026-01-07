import { Link, NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../hooks/useAuth.js";

export default function Navbar() {
  const { count } = useCart();
  const { user } = useAuth();

  return (
    <header className="nav">
      <div className="container nav__inner">
        <Link className="brand" to="/">
          <span className="brand__text">Gatuaj</span>
        </Link>

        <nav className="nav__links">
          <NavLink to="/" end>
            Home
          </NavLink>
          <a href="#rreth">Rreth</a>
          <a href="#receta">Receta</a>
          <Link to="/menu">Menu</Link>
          {user && <Link to="/orders">Porosite</Link>}
          {user && <Link to="/account">Llogaria</Link>}
          <Link to="/cart">Shporta ({count})</Link>
        </nav>

        <div className="nav__cta">
          {!user ? (
            <>
              <span className="muted nav__hint">Mos e humbisni</span>
              <Link className="btn btn--ghost" to="/login">
                Login
              </Link>
              <Link className="btn btn--primary" to="/register">
                Regjistrohu
              </Link>
            </>
          ) : (
            <>
              <Link className="btn btn--ghost" to="/orders">
                Porosite
              </Link>
              <button
                className="btn btn--primary"
                onClick={() => signOut(auth)}
                type="button"
              >
                Dil
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
