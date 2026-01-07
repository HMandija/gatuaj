import { Link } from "react-router-dom";
import { useUi } from "../context/UiContext.jsx";

export default function Hero() {
  const { tr } = useUi();

  return (
    <section id="home" className="hero">
      <div className="container hero__grid">
        <div className="hero__panel">
          <p className="eyebrow">{tr("Kuzhina e perditshme", "Everyday cooking")}</p>
          <h1>{tr("Miresevini ne Gatuaj", "Welcome to Gatuaj")}</h1>
          <p>
            {tr(
              "Na bejne gati per t'u perfshire ne idete e kuzhines se perditshme, me receta te thjeshta dhe perberes te fresket qe mund t'i porosisni direkt.",
              "Your daily cooking companion with simple recipes and fresh ingredients you can order directly."
            )}
          </p>

          <div className="hero__actions">
            <Link className="btn btn--light" to="/menu">
              {tr("Shiko menune", "See menu")}
            </Link>
            <a className="text-link" href="#receta">
              {tr("Lexo me shume", "Learn more")}
            </a>
          </div>

          <div className="hero__meta">
            <span className="pill">{tr("Receta te reja", "New recipes")}</span>
            <span className="pill">{tr("Mealbox i gatshëm", "Ready mealbox")}</span>
            <span className="pill">{tr("Fillo sot", "Start today")}</span>
          </div>
        </div>

        <div className="hero__aside">
          <div className="card hero__note">
            <p className="eyebrow">{tr("Fryma e gatimit ne shtepi.", "Kitchen spirit at home.")}</p>
            <h3>
              {tr(
                "Shije te reja, planifikim i zgjuar dhe perberes te fresket, te sjelle direkt ne deren tuaj.",
                "Fresh flavors, smart planning, and fresh ingredients delivered to your door."
              )}
            </h3>
            <p className="muted">
              {tr(
                "Nje menyre praktike per te kombinuar shije te reja, planifikim ditor dhe perberes te fresket, direkt te dera juaj.",
                "A practical way to mix new flavors, daily planning, and fresh ingredients delivered to your door."
              )}
            </p>
            <a className="text-link" href="#rreth">
              {tr("Zbulo recetat", "Discover recipes")}
            </a>
          </div>

          <div className="hero__tag">
            <div>
              <p className="eyebrow">{tr("Gati per sot", "Ready for today")}</p>
              <strong>{tr("Mealbox Gatuaj", "Gatuaj Mealbox")}</strong>
              <div className="muted">
                {tr("Porosit perberesit, gatuaj receten.", "Order the ingredients, cook the recipe.")}
              </div>
            </div>
            <Link className="btn btn--primary" to="/menu">
              {tr("Porosit", "Order")}
            </Link>
          </div>
        </div>

        <div className="hero__visual">
          <img
            src="https://images.unsplash.com/photo-1505253758473-96b7015fcd40?auto=format&fit=crop&w=1800&q=80"
            alt={tr("Perime te fresketa te pergatitura per gatim", "Fresh vegetables prepared for cooking")}
          />
        </div>
      </div>
    </section>
  );
}
