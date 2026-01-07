import { Link } from "react-router-dom";
import { categories } from "../data/categories.js";

export default function Categories() {
  return (
    <section className="section">
      <div className="container">
        <div className="section__head">
          <div>
            <p className="eyebrow">Perzgjedhje</p>
            <h2>Kategorite kryesore</h2>
            <p className="muted">Zgjidh nje kategori dhe gjej ide per sot.</p>
          </div>
          <Link className="text-link" to="/menu">
            Shiko menune
          </Link>
        </div>

        <div className="grid grid--3">
          {categories.map((c) => (
            <article key={c.id} className="card card--lift">
              <div className="card__img">
                <img src={c.image} alt={c.title} />
                <span className="pill pill--accent">{c.title}</span>
              </div>
              <div className="card__body">
                <p className="muted">{c.desc}</p>
                <Link className="text-link" to="/menu">
                  Shiko me shume
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
