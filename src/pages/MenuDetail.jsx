import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { products } from "../data/products.js";
import { menuDetails } from "../data/menuDetails.js";
import { useCart } from "../context/CartContext.jsx";
import { useUi } from "../context/UiContext.jsx";

export default function MenuDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const detail = menuDetails[id];
  const { add } = useCart();
  const { tr } = useUi();

  return (
    <>
      <Navbar />
      <section className="section">
        <div className="container">
          <div style={{ display: "flex", gap: ".8rem", alignItems: "center" }}>
            <div>
              <p className="eyebrow">{tr("Menu", "Menu")}</p>
              <h2 style={{ margin: 0 }}>{product ? product.name : tr("Menu", "Menu")}</h2>
            </div>
            <div style={{ flex: 1 }} />
            <Link className="btn btn--ghost" to="/menu">
              {tr("Kthehu te menu", "Back to menu")}
            </Link>
          </div>

          {!product ? (
            <div className="card" style={{ padding: "1rem", marginTop: "1rem" }}>
              {tr("Nuk u gjet kjo menu.", "This menu was not found.")}
            </div>
          ) : (
            <div className="two-col" style={{ marginTop: "1rem" }}>
              <div className="card" style={{ padding: "1rem" }}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ borderRadius: 14, width: "100%", objectFit: "cover" }}
                />
                <h3 style={{ marginTop: "0.8rem" }}>{product.name}</h3>
                <p className="muted">{product.desc}</p>
                <strong>{product.price} LEK</strong>
                <div style={{ marginTop: ".8rem" }}>
                  <button className="btn btn--primary" onClick={() => add(product, 1)}>
                    {tr("Shto ne shporte", "Add to cart")}
                  </button>
                </div>
              </div>

              <div className="card" style={{ padding: "1rem" }}>
                <h3>{tr("Plani i vakteve", "Meal plan")}</h3>
                {detail ? (
                  detail.days.map((day) => (
                    <div
                      key={day.title}
                      style={{
                        borderBottom: "1px solid var(--border)",
                        padding: "0.6rem 0",
                      }}
                    >
                      <h4 style={{ margin: "0 0 .4rem" }}>{day.title}</h4>
                      {day.meals.map((meal) => (
                        <div key={meal.name} style={{ marginBottom: ".6rem" }}>
                          <strong>{meal.name}</strong>
                          <p className="muted" style={{ margin: ".2rem 0" }}>
                            {meal.recipe}
                          </p>
                          <ul style={{ margin: 0, paddingLeft: "1.1rem" }}>
                            {meal.ingredients.map((ing) => (
                              <li key={ing}>{ing}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ))
                ) : (
                  <p className="muted">
                    {tr("Detajet e kesaj menuje jane ne perditesim.", "Details of this menu are being updated.")}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}
