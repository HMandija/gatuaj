import { Link } from "react-router-dom";
import { useUi } from "../context/UiContext.jsx";

export default function CTA() {
  const { tr } = useUi();
  return (
    <section className="cta">
      <div className="container cta__inner">
        <div>
          <p className="eyebrow">{tr("Bashkohu", "Join")}</p>
          <h2>{tr("Bashkohuni me Gatuaj sot", "Join Gatuaj today")}</h2>
          <p className="muted">
            {tr(
              "Krijo nje llogari, provo recetat dhe mealbox-et tona, dhe mbaj gjithcka te organizuar.",
              "Create an account, try our recipes and mealboxes, and keep everything organized."
            )}
          </p>
        </div>
        <div className="cta__actions">
          <Link className="btn btn--light" to="/register">
            {tr("Krijo llogari", "Create account")}
          </Link>
          <Link className="btn btn--light" to="/login">
            {tr("Hyr", "Login")}
          </Link>
        </div>
      </div>
    </section>
  );
}
