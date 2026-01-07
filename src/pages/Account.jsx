import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { useAuth } from "../hooks/useAuth.js";
import { getOrdersByUser } from "../services/orderService.js";
import { Link } from "react-router-dom";

function formatDate(ts) {
  if (!ts) return "-";
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleDateString("sq-AL", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function Account() {
  const { user, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      if (authLoading) return;
      if (!user) {
        setLoading(false);
        return;
      }
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

  const ordersList = useMemo(() => {
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
          <p className="muted">Porosit mealbox-in e pare per ta pare ketu.</p>
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
                <ul style={{ margin: 0, paddingLeft: "1rem" }}>
                  {o.items?.map((x) => (
                    <li key={x.id}>
                      {x.name} x{x.qty} ({x.price} LEK)
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="muted">Totali</p>
                <strong>{o.total} LEK</strong>
              </div>
              <div>
                <p className="muted">Status</p>
                <strong>{o.status || "pending"}</strong>
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
              <p className="eyebrow">Llogaria ime</p>
              <h2>Te dhenat dhe porosite</h2>
              <p className="muted">
                Shiko te dhenat e profilit, porosite e kaluara dhe statuset e tyre.
              </p>
            </div>
            {user && (
              <div className="card" style={{ padding: ".8rem 1rem" }}>
                <p className="muted" style={{ margin: 0 }}>Email</p>
                <strong>{user.email}</strong>
                {user.metadata?.creationTime && (
                  <p className="muted" style={{ margin: 0 }}>
                    Qe prej: {new Date(user.metadata.creationTime).toLocaleDateString("sq-AL")}
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="grid grid--2" style={{ alignItems: "start" }}>
            <div className="card" style={{ padding: "1rem" }}>
              <h3>Profil</h3>
              <p className="muted">Email-i juaj eshte i lidhur me porosite dhe pagesat.</p>
              <Link className="text-link" to="/orders">
                Shko te porosite
              </Link>
            </div>
            <div className="card" style={{ padding: "1rem" }}>
              <h3>Pagesat</h3>
              <p className="muted">
                Pagesat reale nuk jane ende aktive ne kete demo. Ne fazen tjeter do te shtojme Stripe.
              </p>
            </div>
          </div>

          <div className="section__head" style={{ marginTop: "2rem" }}>
            <div>
              <p className="eyebrow">Porosite</p>
              <h3>Porosite e fundit</h3>
            </div>
          </div>

          {ordersList}
        </div>
      </section>
      <Footer />
    </>
  );
}
