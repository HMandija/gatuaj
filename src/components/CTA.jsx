import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <section className="cta">
      <div className="container cta__inner">
        <div>
          <p className="eyebrow">Bashkohu</p>
          <h2>Bashkohuni me Gatuaj sot</h2>
          <p className="muted">
            Krijo nje llogari, provo recetat dhe mealbox-et tona, dhe mbaj gjithcka te organizuar.
          </p>
        </div>
        <div className="cta__actions">
          <Link className="btn btn--light" to="/register">
            Krijo llogari
          </Link>
          <Link className="btn btn--ghost" to="/login">
            Hyr
          </Link>
        </div>
      </div>
    </section>
  );
}
