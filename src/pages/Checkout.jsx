import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";

import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../hooks/useAuth.js";
import { createOrder } from "../services/orderService.js";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function Checkout() {
  const { items, total, clear } = useCart();
  const { user, loading } = useAuth();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isPlacing, setIsPlacing] = useState(false);

  const validateBasic = () => {
    if (loading) return "Duke u ngarkuar llogaria...";
    if (!user) return "Duhet te jesh i loguar per te bere porosi.";
    if (!items || items.length === 0) return "Shporta eshte bosh.";
    if (!name || !phone || !address)
      return "Ploteso emrin, telefonin dhe adresen.";
    return null;
  };

  const placeCodOrder = async () => {
    const err = validateBasic();
    if (err) return alert(err);

    try {
      setIsPlacing(true);

      const orderId = await createOrder({
        userId: user.uid,
        items,
        total,
        paymentMethod: "cod",
        customer: { name, phone, address, notes },
      });

      alert("Porosia u ruajt (pending). ID: " + orderId);
      clear();
    } catch (e) {
      console.error(e);
      alert("Gabim gjate vendosjes se porosise.");
    } finally {
      setIsPlacing(false);
    }
  };

  return (
    <>
      <Navbar />

      <section className="section">
        <div className="container">
          <div style={{ display: "flex", gap: ".8rem", alignItems: "center" }}>
            <h2 style={{ margin: 0 }}>Checkout</h2>
            <div style={{ flex: 1 }} />
            <Link className="btn btn--ghost" to="/cart">
              Kthehu
            </Link>
          </div>

          <div className="two-col" style={{ marginTop: "1rem" }}>
            {/* Left: Customer data */}
            <div className="card" style={{ padding: "1rem" }}>
              <h3>Te dhenat</h3>

              <input
                className="inp"
                placeholder="Emri"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="inp"
                placeholder="Telefoni"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <input
                className="inp"
                placeholder="Adresa"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <textarea
                className="inp"
                rows="4"
                placeholder="Shenime"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            {/* Right: Summary + payment */}
            <div className="card" style={{ padding: "1rem" }}>
              <h3>Permbledhje</h3>
              <div className="muted">{items.length} produkte</div>

              <div style={{ margin: ".8rem 0" }}>
                <strong>Total: {total} LEK</strong>
              </div>

              <div style={{ margin: "0.8rem 0 1rem" }}>
                <p className="muted" style={{ margin: "0 0 .4rem" }}>
                  Menyra e pageses
                </p>

                <div
                  style={{ display: "flex", gap: ".6rem", flexWrap: "wrap" }}
                >
                  <button
                    type="button"
                    className={`btn ${
                      paymentMethod === "cod" ? "btn--primary" : "btn--ghost"
                    }`}
                    onClick={() => setPaymentMethod("cod")}
                    disabled={isPlacing}
                  >
                    Paguj ne dorezim
                  </button>

                  <button
                    type="button"
                    className={`btn ${
                      paymentMethod === "card" ? "btn--primary" : "btn--ghost"
                    }`}
                    onClick={() => setPaymentMethod("card")}
                    disabled={isPlacing}
                  >
                    Paguj me karte (PayPal)
                  </button>
                </div>

                {/* PAYPAL */}
                {paymentMethod === "card" && (
                  <div
                    className="card"
                    style={{
                      padding: "0.8rem",
                      marginTop: "0.8rem",
                      background: "#f7fbf9",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <p className="muted" style={{ margin: "0 0 .5rem" }}>
                      Pagesa me PayPal (mund te paguash edhe me karte brenda
                      PayPal checkout)
                    </p>

                    {/* optional debug */}
                    {/* <div className="muted" style={{ fontSize: ".85rem" }}>
                      CLIENT: {String(import.meta.env.VITE_PAYPAL_CLIENT_ID).slice(0, 12)}...
                    </div> */}

                    <PayPalScriptProvider
                      options={{
                        clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
                        currency: "EUR",
                      }}
                    >
                      <PayPalButtons
                        style={{ layout: "vertical" }}
                        disabled={isPlacing}
                        forceReRender={[total, name, phone, address, notes]}
                        createOrder={async () => {
                          const err = validateBasic();
                          if (err) throw new Error(err);

                          // demo conversion: LEK -> EUR (placeholder)
                          const totalEur = Number((total / 100).toFixed(2));

                          setIsPlacing(true);

                          // 1) create order in Firestore as pending-payment
                          const orderId = await createOrder({
                            userId: user.uid,
                            items,
                            total,
                            paymentMethod: "card",
                            paymentProvider: "paypal",
                            totalEur,
                            customer: { name, phone, address, notes },
                          });

                          // 2) create PayPal order via Netlify function
                          const res = await fetch(
                            "/.netlify/functions/paypal-create-order",
                            {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ orderId, totalEur }),
                            }
                          );

                          const data = await res.json();
                          if (!res.ok) {
                            setIsPlacing(false);
                            throw new Error(
                              data?.error || "PayPal create error"
                            );
                          }

                          return data.paypalOrderId;
                        }}
                        onApprove={async (data) => {
                          try {
                            const res = await fetch(
                              "/.netlify/functions/paypal-capture-order",
                              {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                  paypalOrderId: data.orderID,
                                }),
                              }
                            );

                            const capture = await res.json();
                            if (!res.ok)
                              throw new Error(
                                capture?.error || "PayPal capture error"
                              );

                            clear();
                            alert("Pagesa u krye me sukses!");
                          } catch (e) {
                            console.error(e);
                            alert("Gabim gjate konfirmimit te pageses.");
                          } finally {
                            setIsPlacing(false);
                          }
                        }}
                        onCancel={() => {
                          setIsPlacing(false);
                          alert("Pagesa u anulua.");
                        }}
                        onError={(err) => {
                          console.error(err);
                          setIsPlacing(false);
                          alert("Gabim ne PayPal checkout. Shiko console.");
                        }}
                      />
                    </PayPalScriptProvider>

                    <p
                      className="muted"
                      style={{ marginTop: ".6rem", fontSize: ".9rem" }}
                    >
                      * Porosia krijohet si pending-payment, dhe pas pageses
                      konfirmohet.
                    </p>
                  </div>
                )}
              </div>

              {/* COD button */}
              <button
                className="btn btn--primary"
                onClick={placeCodOrder}
                disabled={isPlacing || paymentMethod !== "cod"}
                title={
                  paymentMethod !== "cod"
                    ? "Per pagesen me karte perdor PayPal button."
                    : ""
                }
              >
                Vendos Porosine (pending)
              </button>

              {paymentMethod !== "cod" && (
                <div className="muted" style={{ marginTop: ".6rem" }}>
                  * Per pagesen me karte perdor butonin PayPal siper.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
