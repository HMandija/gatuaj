import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import {
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
  updateOrderAdminNote,
} from "../services/orderService.js";

function formatDate(ts) {
  if (!ts) return "-";
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleDateString("sq-AL", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function getDate(ts) {
  if (!ts) return null;
  if (ts.toDate) return ts.toDate();
  const d = new Date(ts);
  return Number.isNaN(d.getTime()) ? null : d;
}

export default function Admin() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [savingId, setSavingId] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [notesDraft, setNotesDraft] = useState({});

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getAllOrders();
      setOrders(data);
    } catch (err) {
      console.error(err);
      setError("Nuk mund te marrim porosite.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatus = async (id, status) => {
    try {
      setSavingId(id);
      await updateOrderStatus(id, status);
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status } : o))
      );
    } catch (err) {
      console.error(err);
      alert("Nuk u ndryshua statusi.");
    } finally {
      setSavingId("");
    }
  };

  const handleNoteSave = async (id) => {
    const note = notesDraft[id] ?? "";
    try {
      setSavingId(id);
      await updateOrderAdminNote(id, note);
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, adminNote: note } : o))
      );
    } catch (err) {
      console.error(err);
      alert("Nuk u ruajt komenti i adminit.");
    } finally {
      setSavingId("");
    }
  };

  const handleDelete = async (id) => {
    const ok = window.confirm("A je i sigurt qe do ta fshish kete porosi?");
    if (!ok) return;
    try {
      setSavingId(id);
      await deleteOrder(id);
      setOrders((prev) => prev.filter((o) => o.id !== id));
    } catch (err) {
      console.error(err);
      alert("Nuk u fshi porosia.");
    } finally {
      setSavingId("");
    }
  };

  const stats = useMemo(() => {
    if (!orders.length) return null;
    const now = new Date();
    const dayMs = 1000 * 60 * 60 * 24;
    let today = 0;
    let week = 0;
    let month = 0;
    let year = 0;
    let totalRevenue = 0;

    const last7 = Array.from({ length: 7 }, (_, i) => ({
      label: new Intl.DateTimeFormat("sq-AL", { weekday: "short" }).format(
        new Date(now.getTime() - (6 - i) * dayMs)
      ),
      value: 0,
    }));

    orders.forEach((o) => {
      const d = getDate(o.createdAt);
      const amt = Number(o.total) || 0;
      if (d) {
        const diffDays = (now - d) / dayMs;
        if (diffDays < 1) today += amt;
        if (diffDays < 7) week += amt;
        if (diffDays < 30) month += amt;
        if (diffDays < 365) year += amt;

        const slot = 6 - Math.floor(diffDays);
        if (slot >= 0 && slot < 7) {
          last7[slot].value += amt;
        }
      }
      totalRevenue += amt;
    });

    const maxBar = Math.max(...last7.map((b) => b.value), 1);

    return {
      today,
      week,
      month,
      year,
      totalOrders: orders.length,
      avgOrder: orders.length ? totalRevenue / orders.length : 0,
      bars: last7.map((b) => ({
        ...b,
        pct: Math.round((b.value / maxBar) * 100),
      })),
    };
  }, [orders]);

  const content = useMemo(() => {
    if (loading) {
      return <div className="card" style={{ padding: "1rem" }}>Duke u ngarkuar.</div>;
    }
    if (error) {
      return (
        <div className="card" style={{ padding: "1rem" }}>
          {error} <button className="btn btn--ghost" onClick={loadOrders}>Provo perseri</button>
        </div>
      );
    }
    if (orders.length === 0) {
      return (
        <div className="card" style={{ padding: "1rem" }}>
          <h3>Asnje porosi</h3>
          <p className="muted">Kur te krijohen porosi do shfaqen ketu.</p>
        </div>
      );
    }

    const filtered = selectedDate
      ? orders.filter((o) => {
          const d = getDate(o.createdAt);
          if (!d) return false;
          const iso = d.toISOString().slice(0, 10);
          return iso === selectedDate;
        })
      : orders;

    const dailyTotal = filtered.reduce(
      (sum, o) => sum + (Number(o.total) || 0),
      0
    );

    return (
      <>
        <div
          className="card"
          style={{
            padding: "0.9rem 1rem",
            marginBottom: "1rem",
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div>
            <p className="muted" style={{ margin: 0 }}>
              Zgjidh nje date
            </p>
            <input
              className="inp"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              style={{ width: "200px" }}
            />
          </div>
          <div>
            <p className="muted" style={{ margin: 0 }}>
              Te ardhurat e asaj dite
            </p>
            <strong>{dailyTotal} LEK</strong>
          </div>
          <button
            className="btn btn--ghost"
            type="button"
            onClick={() => setSelectedDate("")}
          >
            Pastro filtrin
          </button>
        </div>

        <div className="orders-grid">
          {filtered.map((o) => (
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
                  <p className="muted">Klienti</p>
                  <strong>{o.customer?.name || o.userId}</strong>
                  {o.customer?.phone && (
                    <div className="muted">{o.customer.phone}</div>
                  )}
                  {o.customer?.address && (
                    <div className="muted">{o.customer.address}</div>
                  )}
                </div>
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
                    <p className="muted">Notes</p>
                    <div>{o.customer?.notes || "-"}</div>
                  </div>
                  <div>
                    <p className="muted">Pagesa</p>
                    <strong>
                      {o.paymentMethod === "card" ? "Karte" : "Ne dorezim"}
                    </strong>
                  </div>
                  <div className="order-note">
                    <p className="muted">Komenti i adminit</p>
                    <textarea
                      className="inp"
                      rows="3"
                      placeholder="Shkruaj komentin per kete porosi..."
                      value={notesDraft[o.id] ?? o.adminNote ?? ""}
                      onChange={(e) =>
                        setNotesDraft((prev) => ({
                          ...prev,
                          [o.id]: e.target.value,
                        }))
                      }
                    />
                    <div style={{ display: "flex", gap: ".6rem", marginTop: ".4rem" }}>
                      <button
                        className="btn btn--primary"
                        disabled={savingId === o.id}
                        onClick={() => handleNoteSave(o.id)}
                        type="button"
                      >
                        Ruaj komentin
                      </button>
                      {o.adminNote && (
                        <span className="muted">
                          Aktual: <em>{o.adminNote}</em>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                  display: "flex",
                  gap: ".6rem",
                  flexWrap: "wrap",
                  marginTop: ".8rem",
                }}
              >
                <button
                  className="btn btn--primary"
                  disabled={savingId === o.id}
                  onClick={() => handleStatus(o.id, "delivered")}
                >
                  Marko si delivered
                </button>
              <button
                className="btn btn--ghost"
                disabled={savingId === o.id}
                onClick={() => handleStatus(o.id, "pending")}
              >
                Ktheje pending
              </button>
              <button
                className="btn btn--ghost"
                disabled={savingId === o.id}
                onClick={() => handleStatus(o.id, "denied")}
              >
                Refuzo (denied)
              </button>
              <button
                className="btn btn--ghost"
                disabled={savingId === o.id}
                onClick={() => handleDelete(o.id)}
              >
                  Fshi
                </button>
              </div>
            </article>
          ))}
        </div>
      </>
    );
  }, [loading, error, orders, savingId, selectedDate]);

  return (
    <>
      <Navbar />
      <section className="section">
        <div className="container">
          <div className="section__head">
            <div>
              <p className="eyebrow">Admin</p>
              <h2>Menaxhimi i porosive</h2>
              <p className="muted">
                Shiko te gjitha porosite, ndrysho statusin ose fshiji.
              </p>
            </div>
            <button className="btn btn--ghost" onClick={loadOrders}>
              Rifresko
            </button>
          </div>

          {stats && (
            <>
              <div className="stats-grid">
                <div className="stat-card">
                  <p className="muted">Sot</p>
                  <div className="stat-value">{stats.today} LEK</div>
                  <p className="muted">Te ardhura ditore</p>
                </div>
                <div className="stat-card">
                  <p className="muted">7 ditet</p>
                  <div className="stat-value">{stats.week} LEK</div>
                  <p className="muted">Te ardhura javore</p>
                </div>
                <div className="stat-card">
                  <p className="muted">30 ditet</p>
                  <div className="stat-value">{stats.month} LEK</div>
                  <p className="muted">Te ardhura mujore</p>
                </div>
                <div className="stat-card">
                  <p className="muted">12 muaj</p>
                  <div className="stat-value">{stats.year} LEK</div>
                  <p className="muted">Te ardhura vjetore</p>
                </div>
              </div>

              <div className="card chart-card">
                <div className="chart-card__head">
                  <div>
                    <p className="eyebrow">7 ditet e fundit</p>
                    <h3>Te ardhurat</h3>
                  </div>
                  <div className="muted">
                    {stats.totalOrders} porosi • Mesatarja {stats.avgOrder.toFixed(0)} LEK
                  </div>
                </div>
                <div className="chart-bars">
                  {stats.bars.map((b) => (
                    <div key={b.label} className="chart-bar">
                      <div
                        className="chart-bar__fill"
                        style={{ height: `${b.pct}%` }}
                        title={`${b.label}: ${b.value} LEK`}
                      />
                      <span className="chart-bar__label">{b.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {content}
        </div>
      </section>
      <Footer />
    </>
  );
}
