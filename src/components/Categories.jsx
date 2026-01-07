import { Link } from "react-router-dom";
import { categories } from "../data/categories.js";
import { useUi } from "../context/UiContext.jsx";

export default function Categories() {
  const { tr } = useUi();

  return (
    <section className="section">
      <div className="container">
        <div className="section__head">
          <div>
            <p className="eyebrow">{tr("Perzgjedhje", "Selection")}</p>
            <h2>{tr("Kategorite kryesore", "Top categories")}</h2>
            <p className="muted">{tr("Zgjidh nje kategori dhe gjej ide per sot.", "Pick a category and get ideas for today.")}</p>
          </div>
          <Link className="text-link" to="/menu">
            {tr("Shiko menune", "See menu")}
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
                  {tr("Shiko me shume", "See more")}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
