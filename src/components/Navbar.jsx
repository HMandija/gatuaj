import { Link, NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../hooks/useAuth.js";
import { useUi } from "../context/UiContext.jsx";

export default function Navbar() {
  const { count } = useCart();
  const { user } = useAuth();
  const { tr, lang, setLang, toggleTheme, theme } = useUi();

  return (
    <header className="nav">
      <div className="container nav__inner">
        <Link className="brand" to="/">
          <span className="brand__text">Gatuaj</span>
        </Link>

        <nav className="nav__links">
          <NavLink to="/" end>
            {tr("Home", "Home")}
          </NavLink>
          <a href="/#rreth">{tr("Rreth nesh", "About")}</a>
          <a href="/#receta">{tr("Receta", "Recipes")}</a>
          <Link to="/menu">{tr("Menu", "Menu")}</Link>
          {user && <Link to="/orders">{tr("Porosite", "Orders")}</Link>}
          {user && <Link to="/account">{tr("Llogaria", "Account")}</Link>}
          <Link to="/cart">
            {tr("Shporta", "Cart")} ({count})
          </Link>
        </nav>

        <div className="nav__cta">
          {!user ? (
            <>
              <span className="muted nav__hint">
                {tr("Mos e humbisni", "Don't miss out")}
              </span>
              <Link className="btn btn--light" to="/login">
                {tr("Login", "Login")}
              </Link>
              <Link className="btn btn--primary" to="/register">
                {tr("Regjistrohu", "Register")}
              </Link>
            </>
          ) : (
            <>
              <Link className="btn btn--ghost" to="/orders">
                {tr("Porosite", "Orders")}
              </Link>
              <button
                className="btn btn--primary"
                onClick={() => signOut(auth)}
                type="button"
              >
                {tr("Dil", "Logout")}
              </button>
            </>
          )}
          <div className="nav__toggles">
            <button
              className={`btn btn--ghost ${lang === "AL" ? "is-active" : ""}`}
              type="button"
              onClick={() => setLang("AL")}
            >
              AL
            </button>
            <button
              className={`btn btn--ghost ${lang === "EN" ? "is-active" : ""}`}
              type="button"
              onClick={() => setLang("EN")}
            >
              EN
            </button>
            <button className="btn btn--ghost" type="button" onClick={toggleTheme}>
              {theme === "dark" ? tr("Light", "Light") : tr("Dark", "Dark")}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
