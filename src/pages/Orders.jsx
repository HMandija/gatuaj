import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import { useAuth } from "../hooks/useAuth.js";
import { getOrdersByUser } from "../services/orderService.js";
import { useUi } from "../context/UiContext.jsx";

function formatDate(ts, lang) {
  if (!ts) return "-";
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleDateString(lang === "EN" ? "en-US" : "sq-AL", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatItems(items, lang, tr) {
  if (!items || items.length === 0) return tr("(pa artikuj)", "(no items)");
  const names = items.map((x) => x.name).slice(0, 3).join(", ");
  const more = items.length > 3 ? ` +${items.length - 3}` : "";
  return names + more;
}

export default function Orders() {
  const { user, loading: authLoading } = useAuth();
  const { tr, lang } = useUi();
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
        setError(tr("Nuk mund te marrim porosite.", "Cannot fetch orders."));
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [authLoading, user, tr]);

  const content = useMemo(() => {
    if (loading) {
      return <div className="card" style={{ padding: "1rem" }}>{tr("Duke u ngarkuar.", "Loading...")}</div>;
    }
    if (!user) {
      return (
        <div className="card" style={{ padding: "1rem" }}>
          <h3>{tr("Duhet te jesh i loguar", "You must be logged in")}</h3>
          <p className="muted">{tr("Hyr ose krijo llogari per te pare porosite e tua.", "Login or create an account to see your orders.")}</p>
          <div style={{ display: "flex", gap: ".6rem", flexWrap: "wrap" }}>
            <Link className="btn btn--primary" to="/login">
              {tr("Hyr", "Login")}
            </Link>
            <Link className="btn btn--ghost" to="/register">
              {tr("Krijo llogari", "Create account")}
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
          <h3>{tr("Ende pa porosi", "No orders yet")}</h3>
          <p className="muted">{tr("Shto nje mealbox dhe krijo porosine e pare.", "Add a mealbox and create your first order.")}</p>
          <Link className="btn btn--primary" to="/menu">
            {tr("Shiko menune", "See menu")}
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
                <p className="eyebrow">{tr("Porosia", "Order")}</p>
                <h3>#{o.id.slice(0, 6).toUpperCase()}</h3>
                <p className="muted">{formatDate(o.createdAt, lang)}</p>
              </div>
              <div className={`status status--${o.status || "pending"}`}>
                {tr(o.status || "pending", (o.status || "pending").toUpperCase())}
              </div>
            </div>

            <div className="order-card__body">
              <div>
                <p className="muted">{tr("Artikuj", "Items")}</p>
                <strong>{formatItems(o.items, lang, tr)}</strong>
              </div>
              <div>
                <p className="muted">{tr("Totali", "Total")}</p>
                <strong>{o.total} LEK</strong>
              </div>
              <div>
                <p className="muted">{tr("Klienti", "Customer")}</p>
                <strong>{o.customer?.name || user.email}</strong>
              </div>
              <div>
                <p className="muted">{tr("Pagesa", "Payment")}</p>
                <strong>{o.paymentMethod === "card" ? tr("Karte", "Card") : tr("Ne dorezim", "Cash on delivery")}</strong>
              </div>
              {o.adminNote && (
                <div>
                  <p className="muted">{tr("Komenti i adminit", "Admin note")}</p>
                  <div>{o.adminNote}</div>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    );
  }, [loading, user, error, orders, tr, lang]);

  return (
    <>
      <Navbar />
      <section className="section">
        <div className="container">
          <div className="section__head">
            <div>
              <p className="eyebrow">{tr("Porosite e mia", "My orders")}</p>
              <h2>{tr("Historia e porosive", "Order history")}</h2>
              <p className="muted">{tr("Shiko statusin e porosive dhe detajet kryesore.", "See order statuses and key details.")}</p>
            </div>
            <div style={{ display: "flex", gap: ".6rem", alignItems: "center" }}>
              <Link className="btn btn--ghost" to="/menu">
                {tr("Shto nje tjeter", "Add another")}
              </Link>
            </div>
          </div>

          {content}
        </div>
      </section>
    </>
  );
}
