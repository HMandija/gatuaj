import { products } from "../data/products.js";
import { useCart } from "../context/CartContext.jsx";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import Navbar from "../components/Navbar.jsx";

export default function Menu() {
  const { add, count } = useCart();
  const { user } = useAuth();

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
          <h2 style={{ margin: 0 }}>Menu / Mealbox</h2>
          <div style={{ flex: 1 }} />
          {!user ? (
            <>
              <Link className="btn btn--ghost" to="/login">
                Login
              </Link>
              <Link className="btn btn--primary" to="/register">
                Regjistrohu
              </Link>
            </>
          ) : (
            <Link className="btn btn--ghost" to="/orders">
              Porosite e mia
            </Link>
          )}
          <Link className="btn btn--ghost" to="/cart">
            Shporta ({count})
          </Link>
        </div>

        <p className="muted">Zgjidh nje mealbox dhe shtoje ne shporte.</p>

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
                  <button
                    className="btn btn--primary"
                    onClick={() => add(p, 1)}
                  >
                    Shto
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
