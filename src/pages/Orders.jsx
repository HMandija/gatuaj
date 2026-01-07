import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import { useAuth } from "../hooks/useAuth.js";
import { getOrdersByUser } from "../services/orderService.js";

function formatDate(ts) {
  if (!ts) return "-";
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleDateString("sq-AL", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatItems(items) {
  if (!items || items.length === 0) return "(pa artikuj)";
  const names = items.map((x) => x.name).slice(0, 3).join(", ");
  const more = items.length > 3 ? ` +${items.length - 3}` : "";
  return names + more;
}

export default function Orders() {
  const { user, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setLoading(false);
      return;
    }

    const load = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getOrdersByUser(user.uid);
        setOrders(data);
      } catch (err) {
        console.error(err);
        setError("Nuk mund te marrim porosite.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [authLoading, user]);

  const content = useMemo(() => {
    if (loading) {
      return <div className="card" style={{ padding: "1rem" }}>Duke u ngarkuar.</div>;
    }
    if (!user) {
      return (
        <div className="card" style={{ padding: "1rem" }}>
          <h3>Duhet te jesh i loguar</h3>
          <p className="muted">Hyr ose krijo llogari per te pare porosite e tua.</p>
          <div style={{ display: "flex", gap: ".6rem", flexWrap: "wrap" }}>
            <Link className="btn btn--primary" to="/login">
              Hyr
            </Link>
            <Link className="btn btn--ghost" to="/register">
              Krijo llogari
            </Link>
          </div>
        </div>
      );
    }

    if (error) {
      return <div className="card" style={{ padding: "1rem" }}>{error}</div>;
    }

    if (orders.length === 0) {
      return (
        <div className="card" style={{ padding: "1rem" }}>
          <h3>Ende pa porosi</h3>
          <p className="muted">Shto nje mealbox dhe krijo porosine e pare.</p>
          <Link className="btn btn--primary" to="/menu">
            Shiko menune
          </Link>
        </div>
      );
    }

    return (
      <div className="orders-grid">
        {orders.map((o) => (
          <article key={o.id} className="card order-card">
            <div className="order-card__head">
              <div>
                <p className="eyebrow">Porosia</p>
                <h3>#{o.id.slice(0, 6).toUpperCase()}</h3>
                <p className="muted">{formatDate(o.createdAt)}</p>
              </div>
              <div className={`status status--${o.status || "pending"}`}>
                {o.status || "pending"}
              </div>
            </div>

            <div className="order-card__body">
              <div>
                <p className="muted">Artikuj</p>
                <strong>{formatItems(o.items)}</strong>
              </div>
              <div>
                <p className="muted">Totali</p>
                <strong>{o.total} LEK</strong>
              </div>
              <div>
                <p className="muted">Klienti</p>
                <strong>{o.customer?.name || user.email}</strong>
              </div>
              <div>
                <p className="muted">Pagesa</p>
                <strong>{o.paymentMethod === "card" ? "Karte" : "Ne dorezim"}</strong>
              </div>
            </div>
          </article>
        ))}
      </div>
    );
  }, [loading, user, error, orders]);

  return (
    <>
      <Navbar />
      <section className="section">
        <div className="container">
          <div className="section__head">
            <div>
              <p className="eyebrow">Porosite e mia</p>
              <h2>Historia e porosive</h2>
              <p className="muted">Shiko statusin e porosive dhe detajet kryesore.</p>
            </div>
            <div style={{ display: "flex", gap: ".6rem", alignItems: "center" }}>
              <Link className="btn btn--ghost" to="/menu">
                Shto nje tjeter
              </Link>
            </div>
          </div>

          {content}
        </div>
      </section>
    </>
  );
}
