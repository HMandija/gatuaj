import { products } from "../data/products.js";
import { useCart } from "../context/CartContext.jsx";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import { useUi } from "../context/UiContext.jsx";
import Navbar from "../components/Navbar.jsx";

export default function Menu() {
  const { add, count } = useCart();
  const { user } = useAuth();
  const { tr } = useUi();

  return (
    <>
      <Navbar />
      <section className="section">
      <div className="container">
        <div
          style={{
            display: "flex",
            gap: ".8rem",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <h2 style={{ margin: 0 }}>{tr("Menu / Mealbox", "Menu / Mealbox")}</h2>
          <div style={{ flex: 1 }} />
          {!user ? (
            <>
              <Link className="btn btn--ghost" to="/login">
                {tr("Login", "Login")}
              </Link>
              <Link className="btn btn--primary" to="/register">
                {tr("Regjistrohu", "Register")}
              </Link>
            </>
          ) : (
            <Link className="btn btn--ghost" to="/orders">
              {tr("Porosite e mia", "My orders")}
            </Link>
          )}
          <Link className="btn btn--ghost" to="/cart">
            {tr("Shporta", "Cart")} ({count})
          </Link>
        </div>

        <p className="muted">
          {tr("Zgjidh nje mealbox dhe shtoje ne shporte.", "Pick a mealbox and add it to your cart.")}
        </p>

        <div className="grid">
          {products.map((p) => (
            <article key={p.id} className="card">
              <div className="card__img">
                <img src={p.image} alt={p.name} />
              </div>
              <div className="card__body">
                <h3>{p.name}</h3>
                <p className="muted">{p.desc}</p>
                <div
                  style={{
                    display: "flex",
                    gap: ".6rem",
                    alignItems: "center",
                  }}
                >
                  <strong>{p.price} LEK</strong>
                  <div style={{ flex: 1 }} />
                  <Link className="btn btn--ghost" to={`/menu/${p.id}`}>
                    {tr("Detaje", "Details")}
                  </Link>
                  <button className="btn btn--primary" onClick={() => add(p, 1)}>
                    {tr("Shto", "Add")}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      </section>
    </>
  );
}
