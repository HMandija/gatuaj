import { useState } from "react";
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
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const handleLogout = () => {
    signOut(auth);
    closeMenu();
  };

  const navLinks = (
    <>
      <NavLink to="/" end onClick={closeMenu}>
        {tr("Home", "Home")}
      </NavLink>
      <a href="/#rreth" onClick={closeMenu}>
        {tr("Rreth nesh", "About")}
      </a>
      <a href="/#receta" onClick={closeMenu}>
        {tr("Receta", "Recipes")}
      </a>
      <Link to="/menu" onClick={closeMenu}>
        {tr("Menu", "Menu")}
      </Link>
      {user && (
        <Link to="/orders" onClick={closeMenu}>
          {tr("Porosite", "Orders")}
        </Link>
      )}
      {user && (
        <Link to="/account" onClick={closeMenu}>
          {tr("Llogaria", "Account")}
        </Link>
      )}
      <Link to="/cart" onClick={closeMenu}>
        {tr("Shporta", "Cart")} ({count})
      </Link>
    </>
  );

  const toggleButtons = (
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
  );

  const authActions = !user ? (
    <>
      <span className="muted nav__hint">
        {tr("Mos e humbisni", "Don't miss out")}
      </span>
      <div className="nav__cta-actions">
        <Link className="btn btn--light" to="/login" onClick={closeMenu}>
          {tr("Login", "Login")}
        </Link>
        <Link className="btn btn--primary" to="/register" onClick={closeMenu}>
          {tr("Regjistrohu", "Register")}
        </Link>
      </div>
    </>
  ) : (
    <div className="nav__cta-actions">
      <Link className="btn btn--ghost" to="/orders" onClick={closeMenu}>
        {tr("Porosite", "Orders")}
      </Link>
      <button className="btn btn--primary" onClick={handleLogout} type="button">
        {tr("Dil", "Logout")}
      </button>
    </div>
  );

  return (
    <header className={`nav ${menuOpen ? "is-open" : ""}`}>
      <div className="container nav__inner">
        <Link className="brand" to="/" onClick={closeMenu}>
          <span className="brand__text">Gatuaj</span>
        </Link>

        <nav className="nav__links nav__links--desktop">{navLinks}</nav>

        <div className="nav__cta nav__cta--desktop">
          {authActions}
          {toggleButtons}
        </div>

        <button
          className="nav__menu-btn"
          type="button"
          aria-expanded={menuOpen}
          aria-label={
            menuOpen ? tr("Mbyll menune", "Close menu") : tr("Hap menune", "Open menu")
          }
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <button
        className={`nav__backdrop ${menuOpen ? "is-open" : ""}`}
        type="button"
        aria-label={tr("Mbyll menune", "Close menu")}
        onClick={closeMenu}
      />

      <div className={`nav__drawer ${menuOpen ? "is-open" : ""}`}>
        <div className="nav__drawer-top">
          <Link className="brand brand--compact" to="/" onClick={closeMenu}>
            <span className="brand__text">Gatuaj</span>
          </Link>
          <button className="nav__close" type="button" onClick={closeMenu}>
            {tr("Mbyll", "Close")}
          </button>
        </div>

        <nav className="nav__drawer-links">{navLinks}</nav>

        <div className="nav__drawer-cta">
          {authActions}
          <div className="nav__drawer-toggles">
            <span className="muted nav__hint">
              {tr("Preferencat", "Preferences")}
            </span>
            {toggleButtons}
          </div>
        </div>
      </div>
    </header>
  );
}
