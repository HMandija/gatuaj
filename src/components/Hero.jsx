import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container hero__grid">
        <div className="hero__panel">
          <p className="eyebrow"></p>
          <h1>Miresevini ne Gatuaj</h1>
          <p>
            Receta te perditshme, perberes te fresket dhe zgjidhje te thjeshta
            per gatim pa stres. Gjithcka qe ju duhet, gati per porosi direkte.
          </p>

          <div className="hero__actions">
            <Link className="btn btn--light" to="/menu">
              Shiko menune
            </Link>
            <a className="text-link" href="#receta">
              Lexo me shume
            </a>
          </div>

          <div className="hero__meta">
            <span className="pill">Receta te reja</span>
            <span className="pill">Mealbox i gatshëm</span>
            <span className="pill">Fillo sot</span>
          </div>
        </div>

        <div className="hero__aside">
          <div className="card hero__note">
            <p className="eyebrow"></p>
            <h3>Fryma e gatimit ne shtepi.</h3>
            <p className="muted">
              Shije te reja, planifikim i zgjuar dhe perberes te fresket, te
              sjelle direkt ne deren tuaj.
            </p>
            <a className="text-link" href="#rreth">
              Zbulo recetat
            </a>
          </div>

          <div className="hero__tag">
            <div>
              <p className="eyebrow">Gati per sot</p>
              <strong>Mealbox Gatuaj</strong>
              <div className="muted">Porosit perberesit, gatuaj receten.</div>
            </div>
            <Link className="btn btn--primary" to="/menu">
              Porosit
            </Link>
          </div>
        </div>
      </div>

      <div className="container hero__visual">
        <img
          src="https://images.unsplash.com/photo-1505253758473-96b7015fcd40?auto=format&fit=crop&w=1800&q=80"
          alt="Perime te fresketa te pergatitura per gatim"
        />
      </div>
    </section>
  );
}
