import { useCart } from "../context/CartContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";

export default function Cart() {
  const { items, total, remove, setQty, clear } = useCart();
  const nav = useNavigate();

  return (
    <>
      <Navbar />
      <section className="section">
      <div className="container">
        <div style={{ display: "flex", gap: ".8rem", alignItems: "center" }}>
          <h2 style={{ margin: 0 }}>Shporta</h2>
          <div style={{ flex: 1 }} />
          <Link className="btn btn--ghost" to="/menu">
            Kthehu
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="card" style={{ padding: "1rem", marginTop: "1rem" }}>
            Shporta eshte bosh. <Link to="/menu">Shko te menu</Link>
          </div>
        ) : (
          <div className="card" style={{ padding: "1rem", marginTop: "1rem" }}>
            {items.map((x) => (
              <div
                key={x.id}
                style={{
                  display: "flex",
                  gap: "1rem",
                  alignItems: "center",
                  padding: ".8rem 0",
                  borderBottom: "1px solid var(--line)",
                }}
              >
                <img
                  src={x.image}
                  alt={x.name}
                  style={{
                    width: 72,
                    height: 54,
                    objectFit: "cover",
                    borderRadius: 12,
                  }}
                />
                <div style={{ flex: 1 }}>
                  <strong>{x.name}</strong>
                  <div className="muted">{x.price} LEK</div>
                </div>

                <input
                  className="qty"
                  type="number"
                  min="1"
                  value={x.qty}
                  onChange={(e) => setQty(x.id, Number(e.target.value))}
                />

                <strong>{x.price * x.qty} LEK</strong>
                <button className="btn btn--ghost" onClick={() => remove(x.id)}>
                  Hiq
                </button>
              </div>
            ))}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: "1rem",
              }}
            >
              <button className="btn btn--ghost" onClick={clear}>
                Pastro
              </button>
              <div
                style={{ display: "flex", gap: ".8rem", alignItems: "center" }}
              >
                <strong>Total: {total} LEK</strong>
                <button
                  className="btn btn--primary"
                  onClick={() => nav("/checkout")}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      </section>
    </>
  );
}
